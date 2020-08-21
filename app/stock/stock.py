from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import json
import os

class Server(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        if parsed_path.path != '/stock':
            self.send_error(404, "not found")
            return

        headers = self.headers.get('Pids')

        pids = []
        if headers != "":
            for pid in headers.split(','):
                pids.append(int(pid))

        stock = {
            "Quantity": get_stock(pids),
            "Info": get_meshinfo(),
        }

        self._set_headers()
        self.wfile.write(json.dumps(stock).encode())

def get_meshinfo():
    meshinfo = [
        {
            "Service": "stock-v1",
            "Pod": os.environ.get("POD_NAME"),
            "Region": os.environ.get("REGION"),
        },
    ]

    return meshinfo

def get_stock(pids):
    stocks = {
        1: 200,
        2: 200,
        3: 0,
        4: 100,
        5: 0,
        6: 200,
        7: 300,
        8: 0,
    }

    stock = {}
    for pid in pids:
        if 1<=pid and pid<=8:
            stock[pid] = stocks[pid]

    return stock

def run(server_class=HTTPServer, handler_class=Server, port=7000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    print('Starting stock service on port %d...' % port)
    httpd.serve_forever()

if __name__ == "__main__":
    run()
