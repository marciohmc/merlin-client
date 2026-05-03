# Imagem base Debian 12 Slim para minimizar o consumo de recursos
FROM debian:12-slim

# Evita perguntas durante a instalação
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências e limpa o cache
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    p7zip \
    p7zip-full \
    ca-certificates \
    python3 \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Define o diretório de trabalho
WORKDIR /opt/merlin

# Download do Merlin Client v2.1.4 com User-Agent e seguindo redirecionamentos
RUN curl -fSL -A "Mozilla/5.0" https://github.com/Ne0nd0g/merlin/releases/download/v2.1.4/merlin-client-linux-amd64.7z -o merlin.7z

# Extração usando a senha "merlin". Usamos 7z x com -y (yes to all) e -p (password).
# A flag -aoa força a sobrescrita de arquivos se existirem.
RUN 7z x merlin.7z -pmerlin -y -aoa && rm merlin.7z

# Localiza o binário extraído (que pode estar em uma subpasta ou ter nome levemente diferente) e renomeia
RUN find . -name "merlin-client*" -type f -exec mv {} merlin-client \; && chmod +x merlin-client

# Copia o script de health check
COPY healthcheck.py .

# Comando para rodar o Python em background e manter o container vivo com sleep infinity
CMD python3 healthcheck.py & sleep infinity
