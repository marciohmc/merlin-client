# Merlin Agent - Deploy Automático no Render

Este projeto foi configurado para compilar e rodar o Merlin Agent automaticamente no Render.com, eliminando erros de extração de arquivos 7z e senhas.

## 1. Como Funciona
O `Dockerfile` utiliza uma estratégia **multi-stage build**:
1.  **Estágio de Build:** Baixa o código fonte oficial do `merlin-agent` (Go) e compila o binário nativamente para Linux.
2.  **Estágio de Runtime:** Cria uma imagem Debian mínima, copia apenas o binário compilado e inicia um servidor Python para o Health Check do Render.

## 2. Passo a Passo do Deploy
1.  Conecte este repositório ao seu **Render.com**.
2.  Crie um novo **Web Service**.
3.  Configurações:
    *   **Runtime:** Docker
    *   **Instance Type:** Free (512MB RAM)
4.  **Variáveis de Ambiente (Opcional mas Recomendado):**
    *   `MERLIN_URL`: A URL do seu servidor Merlin C2 (ex: `https://meu-c2.onrender.com`). Se não definida, o agente tentará o valor padrão configurado no Dockerfile.
5.  Aguarde o status **"Live"**.

## 3. Interação Manual
Embora o agente rode automaticamente, você pode interagir com o container via aba **"Shell"** no Render:
*   Para ver se o agente está rodando: `ps aux | grep merlin`
*   Para ver os logs do agente (se estiver em foreground): Verifique a aba **"Logs"** do Render.

## 4. Vantagens
*   **Segurança:** Sem downloads de binários pré-compilados de fontes desconhecidas (compila direto do GitHub oficial).
*   **Estabilidade:** O script `healthcheck.py` garante que o Render não reinicie o container por falta de resposta na porta `$PORT`.
*   **Eficiência:** Consumo de RAM otimizado para os limites do plano gratuito.
