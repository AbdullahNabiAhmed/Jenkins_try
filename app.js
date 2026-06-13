const http = require('http');
http.createServer((req, res) => {
     res.writeHead(200);
     res.end('Hello from jenkins Pipeline! v1 this is Abdullah Nabi/n');
}).listen(3000, () => console.log('Running on port 3000'));
