let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let cache = {
    // 因为服务器应用在使用中是不重启的【不断的轮询】，所以可以用一个变量来表示内存，真实情况是变量也是写在内存中的
};

// 入口方法
// createServer函数用来创建一个服务器，req,res分别代表请求和响应
let server = http.createServer((req, res) => {
    let filePath = false;
    if (req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = `public${req.url}`;
    }
    let absPath = './' + filePath;
    serveStatic(res, cache, absPath);

});
// console.log('host localhost:3000');


// 404 响应头封装
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404:response not Found!');
    response.end();
}

// 200 响应头封装
function sendFile(response, filePath, fileContent) {
    response.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) });
    response.end(fileContent);
}

// 确定服务器资源的读取形式和做出相应的处理 response响应内容，cache缓存，absPath绝对路径
function serveStatic(response, cache, absPath) {
    // 判断是否在缓存中存在这个绝对路径
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        // 不存在缓存,直接读取
        fs.readFile(absPath, (err, data) => {
            if (err) {
                // 错误
                send404(response);
            } else {
                // 正确 即存在
                cache[absPath] = data;
                sendFile(response, absPath, data);
            }
        });
    }
}

// 聊天服务器核心文件
let chatServer = require('./lib/chat_server.js');
chatServer.listen(server);