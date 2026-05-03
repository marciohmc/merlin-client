# Instruções de Configuração do Merlin C2 no Render.com

Para que o Merlin funcione corretamente atrás do Proxy Reverso do Render (que faz o SSL Termination), siga estas instruções:

## 1. Configuração do Listener (HTTP/1.1)

Como o Render termina o SSL e encaminha o tráfego HTTP para o seu container, você deve configurar o Merlin para ouvir em HTTP "limpo" em uma porta interna que **NÃO** seja a porta `$PORT` (que o script Python já está usando para o health check).

**Dentro do Merlin CLI:**

```bash
# Crie um listener HTTP
listeners
use http
set Interface 0.0.0.0
set Port 8080 (ou qualquer porta interna diferente da variável $PORT do Render)
# IMPORTANTE: Desabilite SSL se o Merlin estiver tentando fazer por conta própria, 
# pois o Render já entrega o tráfego descriptografado.
set Proto http
start
```

## 2. Configuração do Agent (C2)

O Agent que vai se conectar ao servidor deve ser configurado para apontar para a sua URL do Render usando HTTPS (Porta 443), mesmo que o servidor internamente esteja ouvindo em HTTP (Porta 8080).

*   **URL do C2:** `https://seu-app.onrender.com`
*   **Porta:** `443`

## 3. Por que isso funciona?

1.  **Health Check:** O Render envia um "ping" HTTP na porta `$PORT`. O script `healthcheck.py` responde instantaneamente com `200 OK`, mantendo o serviço online.
2.  **Tráfego C2:** O tráfego dos seus agentes chega no Render via HTTPS (443). O Render encaminha esse tráfego para a porta que você expuser (geralmente ele tenta a mesma porta do health check, mas para C2 você pode precisar configurar o Merlin para usar uma porta específica ou rodar ambos na mesma porta se o Merlin suportar multiplexação, o que é complexo).

**Dica avançada:** Se você quiser que o Merlin receba o tráfego C2 pela mesma porta do health check, você precisaria de um proxy (como Nginx) dentro do container para rotear `/health` para o Python e o restante para o Merlin. No setup atual, o Merlin deve ser iniciado e configurado manualmente via CLI após o deploy.

## 4. Otimização de RAM (512MB)

*   A imagem `debian:12-slim` e o script Python minimalista garantem um overhead baixíssimo (menos de 20MB).
*   O Merlin Server em Go consome cerca de 50MB-150MB em repouso, deixando margem confortável para operações dentro dos 512MB.
