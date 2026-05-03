import http.server
import socketserver
import os

# Pega a porta definida pelo Render.com ou usa 8080 como fallback
PORT = int(os.environ.get("PORT", 8080))

class HealthCheckHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # Responde 200 OK para qualquer requisição
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"OK")
    
    # Silencia os logs de acesso para economizar recursos e não poluir o stdout
    def log_message(self, format, *args):
        return

if __name__ == "__main__":
    # Configurado para consumir o mínimo de memória possível
    with socketserver.TCPServer(("", PORT), HealthCheckHandler) as httpd:
        print(f"Health check server listening on port {PORT}")
        httpd.serve_forever()
