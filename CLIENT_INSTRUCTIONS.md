# Instruções: Usando o Merlin Client no Render.com

Este container foi configurado para ficar "adormecido" (`sleep infinity`), permitindo que você o utilize como um terminal persistente via navegador.

## Como acessar o Console do Cliente:

1.  Acesse o painel do **Render.com**.
2.  Selecione o seu Web Service.
3.  No menu lateral, clique em **"Shell"**.
4.  Quando o terminal abrir, você estará dentro do diretório `/opt/merlin`.

## Como conectar ao seu Servidor C2:

No terminal do Render, digite o seguinte comando (substituindo pela URL do seu servidor):

```bash
./merlin-client -url https://seu-servidor-c2.onrender.com
```

### Notas Importantes:

*   **Persistência de Dados**: Lembre-se que o sistema de arquivos do Render é efêmero (não persistente). Se o container reiniciar, quaisquer arquivos baixados ou configurações feitas dentro do shell serão perdidos, a menos que você configure um "Disk" no Render.
*   **Conexão segura**: O Render Shell utiliza conexões seguras via navegador para garantir que seus comandos ao Merlin Client não sejam interceptados localmente.
*   **RAM**: O `sleep infinity` e o `healthcheck.py` consomem virtualmente zero de CPU e menos de 15MB de RAM, deixando quase todos os 512MB disponíveis para o Merlin Client.

---

**Dica:** Se você precisar baixar arquivos via Merlin Client, eles ficarão em `/opt/merlin` até o próximo deploy ou restart do container.
