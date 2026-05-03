# Merlin Server - Web Console no Render

Este projeto foi configurado para rodar o **Merlin Server** juntamente com o **ttyd**, permitindo que você acesse o console de comando diretamente pelo seu navegador, sem necessidade de SSH ou terminal local.

## 1. Como Funciona
O `Dockerfile` utiliza uma estratégia **multi-stage build**:
1.  **Build:** Baixa o código fonte oficial do `merlin` (Go) e compila o binário nativamente.
2.  **Runtime:** Instala o `ttyd` (um terminal simples via web) e o configura para rodar o `./merlin-server` na porta padrão do Render (`$PORT`).

## 2. Passo a Passo do Deploy
1.  Conecte este repositório ao seu **Render.com**.
2.  Crie um novo **Web Service**.
3.  Configurações:
    *   **Runtime:** Docker
    *   **Instance Type:** Free (512MB RAM)
4.  Aguarde o status **"Live"**.

## 3. Como Acessar
Após o deploy, basta clicar no link fornecido pelo Render (ex: `https://meu-projeto.onrender.com`). 
O terminal do Merlin Server aparecerá diretamente na página.

## 4. Importante (Persistência)
O plano **Free** do Render possui sistema de arquivos efêmero. Se o servidor for reiniciado ou entrar em repouso por inatividade, os bancos de dados do Merlin e as chaves geradas serão reiniciados. Para uso profissional ou persistente, considere um plano pago com "Persistent Disk".
