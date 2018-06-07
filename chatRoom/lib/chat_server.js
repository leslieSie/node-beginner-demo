// 聊天服务器核心文件

let socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickName = {};
let nickUsed = {};
let currentRooms = {};
// 需要重写

exports.listen = function (server) {
    let io = socketio.listen(server);
    
}
// exports.listen = function(server) {
//     io = socketio.listen(server); // 启动 socketIO 服务器
//     io.set('log level', 1);
//     // 定义每个用户产生的处理逻辑
//     io.sockets.on('connection', (socket) => {
//         guestNumber = assignGuestName(socket, guestNumber, nickName, nickUsed); // 用户链接上随机赋予用户名
//         joinRoom(socket, 'Lobby'); // 加入到特定的聊天室（Lobby）
//         handleMessageBroadcasting(socket, nickName); // 处理信息
//         handleNameChangeAttempts(socket, nickName, nickUsed); // 处理用户更名
//         handleRoomJoining(socket); // 聊天室创建
//         socket.on('room', () => {
//             socket.emit('rooms', io.sockets.manager.rooms);
//         });
//         handleClientDisconnection(socket, nickName, nickUsed);
//     });
// }

// let assignGuestName = (socket, guestNumber, nickName, nickUsed) => {
//     let name = 'Guest' + guestNumber;
//     nickName[socket.id] = name;
//     socket.emit('nameResult', {
//         success: true,
//         name: name
//     });
// }