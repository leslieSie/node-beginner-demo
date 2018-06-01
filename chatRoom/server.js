let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let cache = {
    // 因为服务器应用在使用中是不重启的【不断的轮询】，所以可以用一个变量来表示内存，真实情况是变量也是写在内存中的
};

let server = http.createServer((req, res) => {
    let filePath = false;
    if (req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = `public${req.url}`;
    }
    let absPath = './' + filePath;
    serveStatic(res, cache, absPath);
}).listen(3000);


// 404 封装
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404:response not Found!');
    response.end();
}

// 相应封装
function sendFile(response, filePath, fileContent) {
    // console.log(mime);
    response.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) });
    response.end(fileContent);
}

// 确定服务器资源的读取形式和做出相应的处理
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, (exists) => {
            fs.readFile(absPath, (err, data) => {
                if (err) {
                    send404(response);
                } else {
                    cache[absPath] = data;
                    sendFile(response, absPath, data);
                }
            });
        });
    }
}

let chatServer = require('./lib/chat_server.js');
// console.log('this is split');
// console.log(chatServer);
// chatServer.listen(server);