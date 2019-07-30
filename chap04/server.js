const http = require("http"),
  util = require("util"),
  url = require("url"),
  os = require("os");

const server = http.createServer();
server.on("request", (req, res) => {
  var requrl = url.parse(req.url, true);
  if (requrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `
                <html>
                    <head><title>Hello, World</title></head>
                    <body>
                        <h1>Hello, World!</h1>
                        <p><a href='/osinfo'>OS info</a></p>
                    </body>
                </html>
            `
    );
  } else if (requrl.pathname === "/osinfo") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `
            <html>
                <head><title>Operating System Info</title></head> 
                <body>
                    <h1>Operating System Info</h1> 
                    <table> 
                        <tr><th>TMP Dir</th><td>${os.tmpdir()}</td></tr> 
                        <tr><th>Host Name</th><td>${os.hostname()}</td></tr> 
                        <tr><th>OS Type</th><td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td></tr> 
                        <tr><th>Uptime</th><td>${os.uptime()} ${util.inspect(
        os.loadavg()
      )}</td></tr> 
                        <tr><th>Memory</th><td>total: ${os.totalmem()} free: ${os.freemem()}</td></tr> 
                        <tr><th>CPU's</th><td><pre>${util.inspect(
                          os.cpus()
                        )}</pre></td></tr> 
                        <tr><th>Network</th><td><pre>${util.inspect(
                          os.networkInterfaces()
                        )}</pre></td></tr> 
                    </table> 
                </body>
            </html>
            `
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("bad URL " + req.url);
  }
});

require("./httpsniffer").sniffOn(server);
server.listen(8124);
console.log("listening to http://localhost:8124");
