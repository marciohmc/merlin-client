# Stage 1: Build (Binários e Ferramentas)
FROM golang:1.23-bookworm AS builder
WORKDIR /app

# 1. Compilação do Merlin Server
RUN git clone https://github.com/Ne0nd0g/merlin.git server && \
    cd server && go build -ldflags="-s -w" -o ../merlin-server main.go

# 2. Compilação do Merlin CLI (O console interativo real do v2)
RUN git clone https://github.com/Ne0nd0g/merlin-cli.git cli && \
    cd cli && go build -ldflags="-s -w" -o ../merlin-cli main.go

# 3. Download do ttyd (Terminal Web)
RUN curl -fSL https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -o ttyd && \
    chmod +x ttyd

# Stage 2: Runtime (Imagem Final)
FROM debian:12-slim

# Instalação de dependências básicas
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    procps \
    curl \
    libuv1 \
    net-tools \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os binários do estágio de build
COPY --from=builder /app/merlin-server .
COPY --from=builder /app/merlin-cli .
COPY --from=builder /app/ttyd /usr/local/bin/ttyd

# Criar script de inicialização
RUN echo '#!/bin/sh\n\
# Inicia o servidor em background e salva logs para depuração\n\
./merlin-server > server.log 2>&1 &\n\
\n\
echo "Aguardando Merlin Server iniciar (gRPC porta 50051)..."\n\
# Loop para esperar o servidor gRPC estar pronto\n\
for i in $(seq 1 30); do\n\
    if netstat -an | grep 50051 > /dev/null; then\n\
        echo "Servidor gRPC detectado! Iniciando console..."\n\
        break\n\
    fi\n\
    sleep 1\n\
done\n\
\n\
# Inicia o ttyd rodando o Merlin CLI\n\
# -W permite input (escrita)\n\
# -i 0.0.0.0 garante escuta em todas as interfaces\n\
ttyd -p $PORT -i 0.0.0.0 -W ./merlin-cli' > start.sh && \
    chmod +x start.sh

# Configurações de Terminal
ENV TERM=xterm-256color
ENV PORT=10000

# Execução através do script
CMD ["./start.sh"]
