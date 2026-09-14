# 디자인모드(https://*.imweb.me) 콘솔에서 로컬 파일을 fetch 하기 위한 CORS 서버
#   python build/serve.py   → http://localhost:8766/imweb/...
import http.server, functools, os
ROOT = os.path.join(os.path.dirname(__file__), '..')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Private-Network', 'true')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def do_OPTIONS(self):
        self.send_response(204); self.end_headers()
http.server.ThreadingHTTPServer(('127.0.0.1', 8766), functools.partial(H, directory=ROOT)).serve_forever()
