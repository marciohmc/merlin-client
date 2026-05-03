# Imagem base leve
FROM debian:12-slim

# Instalação Robusta de Dependências
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    p7zip-full \
    ca-certificates \
    python3 \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Download e Extração Automática
# Usamos flags -fSL para garantir silêncio, seguir redirecionamentos e falhar se o arquivo não existir.
RUN curl -fSL -L https://github.com/Ne0nd0g/merlin/releases/download/v2.1.4/merlin-client-linux-amd64.7z -o merlin.7z && \
    7z x merlin.7z -pmerlin -y && \
    rm merlin.7z

# Localização e limpeza: movemos o binário para a raiz e removemos o que sobrou
RUN find . -type f -name "merlin-client*" -exec mv {} merlin-client \; && \
    chmod +x merlin-client

# Copia o script de saúde
COPY healthcheck.py .

# Porta padrão do Render
ENV PORT=10000

# Execução Automática:
# 1. Inicia o servidor Python para passar no Health Check do Render
# 2. Mantém o container ativo com tail para uso via Render Shell
CMD python3 healthcheck.py & tail -f /dev/null
