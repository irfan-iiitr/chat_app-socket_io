const express=require('express');

const app=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/',express.static(__dirname + '/src'));

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);


    // setInterval(()=>{
    //     socket.emit('from_server');
    // },2000);
    socket.on('from_client',()=>{
        console.log("message from client");
    })

  });


server.listen(3000, ()=>{
    console.log('Server started on port 3000');
});