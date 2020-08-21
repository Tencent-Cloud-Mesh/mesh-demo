from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import json
import os

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        origin = self.headers.get('Origin')
        self.send_header('Access-Control-Allow-Origin', origin)
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path != '/product':
            self.send_error(404, "not found")
            return

        infos = {
            "product": [
                {"name": "Tencent Cloud Mesh", "pid": 1, "price": 100, "url": "https://landscape.cncf.io/logos/containerd.svg"},
                {"name": "core-dns", "pid": 2, "price": 200, "url": "https://landscape.cncf.io/logos/core-dns.svg"},
                {"name": "envoy", "pid": 3, "price": 300, "url": "https://landscape.cncf.io/logos/envoy.svg"},
                {"name": "fluentd", "pid": 4, "price": 400, "url": "https://landscape.cncf.io/logos/fluentd.svg"},
                {"name": "helm", "pid": 5, "price": 500, "url": "https://landscape.cncf.io/logos/helm.svg"},
                {"name": "jaeger", "pid": 6, "price": 600, "url": "https://landscape.cncf.io/logos/jaeger.svg"},
                {"name": "vitess", "pid": 7, "price": 700, "url": "https://landscape.cncf.io/logos/vitess.svg"},
                {"name": "prometheus", "pid": 8, "price": 800, "url": "https://landscape.cncf.io/logos/prometheus.svg"},
            ],
            "url": "https://landscape.cncf.io/logos/kubernetes.svg",
            "info": [
                {
                    "Service": "product-v2",
                    "Pod": os.environ.get("POD_NAME"),
                    "Region": os.environ.get("REGION"),
                },
            ]
        }

        self._set_headers()
        self.wfile.write(json.dumps(infos).encode())

def run(server_class=HTTPServer, handler_class=Server, port=7000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting product-v2 service on port %d...' % port)
    httpd.serve_forever()

if __name__ == "__main__":
    run()
