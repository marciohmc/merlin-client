# Stage 1: Build
FROM golang:1.23-bookworm AS builder
WORKDIR /app
RUN git clone https://github.com/Ne0nd0g/merlin-agent.git .
RUN go build -ldflags="-s -w" -o merlin-agent .

# Stage 2: Runtime
FROM debian:12-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/merlin-agent .
COPY healthcheck.py .

ENV PORT=10000
ENV MERLIN_URL="https://seu-servidor-c2.onrender.com"

# Execução Robusta: 
# O Agente roda em um loop infinito. Se ele falhar/fechar, o container continua vivo 
# e tenta novamente em 10 segundos, garantindo persistência sem intervenção manual.
CMD python3 healthcheck.py & while true; do ./merlin-agent -url $MERLIN_URL; echo 'Agente desconectado. Reiniciando em 10s...'; sleep 10; done
