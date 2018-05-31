let fs = require('fs');
let http = require('http');

// let stream = fs.createReadStream('./test.json');
// stream.on('data', (chunk) => {
//     console.log(chunk);
// });
// stream.on('end', () => {
//     console.log('finish');
// });

let server = http.createServer();
server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fs.createReadStream('./test.json').pipe(res);
});

server.listen(3001);
console.log('localhost:3000 run');