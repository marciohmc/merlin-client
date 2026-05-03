# Stage 1: Build (Compilação Nativa)
FROM golang:1.23-bookworm AS builder
WORKDIR /app
# Clonando o repositório principal do Merlin (que contém o Servidor/Console)
RUN git clone https://github.com/Ne0nd0g/merlin.git .
# Compilando o servidor console
RUN go build -ldflags="-s -w" -o merlin-server main.go

# Stage 2: Runtime
FROM debian:12-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    python3 \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
# Copiando o binário compilado
COPY --from=builder /app/merlin-server .
COPY healthcheck.py .

# Porta padrão do Render
ENV PORT=10000

# Execução: Healthcheck + Loop que mantém o contêiner vivo para acesso via Shell
CMD python3 healthcheck.py & tail -f /dev/null
