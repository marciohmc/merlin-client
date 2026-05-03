import http.server
import socketserver
import os
import sys

# Porta automática injetada pelo Render.com (Padrão 10000)
PORT = int(os.environ.get("PORT", 10000))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Resposta 200 OK essencial para o Render manter o Host vivo
        self.send_response(200)
        self.send_header('Content-type', 'text/plain; charset=utf-8')
        self.end_headers()
        self.wfile.write("VERIFICAÇÃO DE SAÚDE OK".encode('utf-8'))
    
    def log_message(self, format, *args):
        return # Silencioso para evitar overhead

if __name__ == "__main__":
    print(f"[AUTO] Health Check Server started on port {PORT}")
    sys.stdout.flush()
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except Exception as e:
        print(f"Error starting health check: {e}")
        sys.exit(1)
