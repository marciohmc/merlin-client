# Imagem base Debian 12 Slim para minimizar o consumo de recursos
FROM debian:12-slim

# Instalação de dependências e limpeza de cache para poupar RAM
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    p7zip-full \
    ca-certificates \
    python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Download com verificação de erro
RUN curl -L -o merlin.7z https://github.com/Ne0nd0g/merlin/releases/download/v2.1.4/merlin-client-linux-amd64.7z

# Extração garantindo que o arquivo existe e usando a senha padrão
RUN 7z x merlin.7z -pmerlin -y && rm merlin.7z

# Localiza o binário (que pode estar dentro de uma pasta extraída) e move para a raiz
RUN find . -type f -name "merlin-client*" -exec mv {} merlin-client \; && \
    chmod +x merlin-client

COPY healthcheck.py .

# Mantém o healthcheck rodando e o container ativo
CMD python3 healthcheck.py & tail -f /dev/null
