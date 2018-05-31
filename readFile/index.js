// 服务器简单DEMO
let http = require('http');
let server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    console.log('insert');
    res.end('test');
});
server.listen(3000);
console.log('localhost:3000 run');