# Stage 1: Build (Binários e Ferramentas)
FROM golang:1.23-bookworm AS builder
WORKDIR /app

# 1. Compilação do Merlin Server
RUN git clone https://github.com/Ne0nd0g/merlin.git . && \
    go build -ldflags="-s -w" -o merlin-server main.go

# 2. Download do ttyd (Terminal Web)
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
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia os binários do estágio de build
COPY --from=builder /app/merlin-server .
COPY --from=builder /app/ttyd /usr/local/bin/ttyd

# Configurações de Terminal para melhorar a interatividade
ENV TERM=xterm-256color
ENV PORT=10000

# Execução: O ttyd abre o console. 
# -i 0.0.0.0: Escuta em todas as interfaces (necessário no Render)
# -p $PORT: Usa a porta dinâmica
CMD ["sh", "-c", "ttyd -p $PORT -i 0.0.0.0 bash -c './merlin-server'"]
