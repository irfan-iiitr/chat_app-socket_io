const express=require('express');

const app=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require('./config/db');



app.use('/',express.static(__dirname + '/src'));
app.set('view engine', 'ejs');

app.get('/chat/:roomId', (req, res) => {
    res.render('index',{
        name:'Irfan',
        id:req.params.roomId,
    });
})

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    socket.on('join_room', (data) => {
        socket.join(data.roomId);
        console.log('user joined room',data.roomId);
    })
    
    socket.on('msg_send',(data)=>{  // server recieves a message
        console.log("message from client",data);
        io.to(data.roomId).emit('msg_recieved',data); // server sends a message to all other clients
    });

  });





server.listen(3000, async()=>{
    console.log('Server started on port 3000');
    await connect();
    console.log('Connected to MongoDB');
});