// npm init --yes for creating some folder like node_module,package.js

//npm uninstall nodemon
//sudo npm uninstall -g nodemon
//use when nodemon is getting error
//express: the micro web application framework for node.js
//socket.io: the famous package that manages WebSockets
// io.emit sends the data to our app which is recieved from socket.on
//https://letscodethat.com/react-native-realtime-chat-using-socket-io/?fbclid=IwAR3LX43BEb77VTBvlvAVlckJEI4FUJCkW3t3xqT5eX15I1-K2B8FbYQ534M




// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// list socketid
for (var socketid in io.sockets.sockets) {}
 OR
Object.keys(io.sockets.sockets).forEach((socketid) => {});