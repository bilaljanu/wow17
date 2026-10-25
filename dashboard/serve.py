#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
import glob

PORT = 9191
PROJECT = "/home/bilal/wow17"

class Handler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path.startswith("/api/log"):
            self.handle_log_request()
        elif self.path.startswith("/api/builds"):
            self.handle_builds_request()
        elif self.path.startswith("/api/errors"):
            self.handle_errors_request()
        else:
            self.handle_static()

    def handle_log_request(self):
        try:
            qs = self.path.split("?")[0]
            parts = qs.split("/")
            build_num = parts[-1] if len(parts) > 3 else "006"
            log_path = os.path.join(PROJECT, f"build/logs/build-{build_num}.log")
            if not os.path.exists(log_path):
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "log not found"}).encode())
                return
            with open(log_path, "r") as f:
                lines = f.readlines()
            total = len(lines)
            qs_parts = self.path.split("?")
            params = {}
            if len(qs_parts) > 1:
                for p in qs_parts[1].split("&"):
                    k, v = p.split("=", 1) if "=" in p else (p, "")
                    params[k] = v
            tail = int(params.get("tail", "200"))
            start = max(0, total - tail)
            content = "".join(lines[start:])
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(content.encode("utf-8"))
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def handle_builds_request(self):
        try:
            logs = sorted(glob.glob(os.path.join(PROJECT, "build/logs/build-*.log")))
            builds = []
            for lp in logs:
                bn = os.path.basename(lp)
                build_id = bn.replace("build-", "").replace(".log", "")
                sz = os.path.getsize(lp)
                mt = os.path.getmtime(lp)
                result = "unknown"
                with open(lp, "r") as f:
                    tail = f.readlines()[-20:]
                    for line in tail:
                        if "BUILD SUCCESS" in line:
                            result = "success"
                        elif "BUILD FAILURE" in line:
                            result = "failure"
                builds.append({
                    "id": build_id,
                    "file": bn,
                    "size": sz,
                    "modified": mt,
                    "result": result,
                })
            builds.reverse()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"builds": builds}).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def handle_errors_request(self):
        try:
            err_path = os.path.join(PROJECT, "dashboard/errors.json")
            if not os.path.exists(err_path):
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"error":"errors.json not found"}')
                return
            with open(err_path, "r") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(data.encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def handle_static(self):
        path = self.path.split("?")[0]
        if path == "/":
            path = "/index.html"
        filepath = os.path.join(PROJECT, "dashboard", path.lstrip("/"))
        if not os.path.exists(filepath) or os.path.isdir(filepath):
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"not found")
            return
        ct = "text/html"
        if filepath.endswith(".json"):
            ct = "application/json"
        elif filepath.endswith(".py"):
            ct = "text/plain"
        elif filepath.endswith(".log"):
            ct = "text/plain"
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", ct)
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())

    def log_message(self, *args):
        pass

if __name__ == "__main__":
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving dashboard on http://0.0.0.0:{PORT}")
        httpd.serve_forever()
