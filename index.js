const express=require('express');

const app=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect = require('./config/db');
const Chat =require('./model/chat');


app.use('/',express.static(__dirname + '/src'));
app.set('view engine', 'ejs');

app.get('/chat/:roomId', async (req, res) => {
    const chats=await Chat.find({
        roomId:req.params.roomId
    })
    res.render('index',{
        name:'Irfan',
        id:req.params.roomId,
        chats:chats
    });
})

io.on('connection', (socket) => {
    //console.log('a user connected',socket.id);

    socket.on('join_room', (data) => {
        socket.join(data.room_id);
        console.log('user joined room',data.room_id);
    })
    
    socket.on('msg_send',async (data)=>{  // server recieves a message
        //console.log("message from client",data);
        const chat = await Chat.create({
            content:data.msg,
            user:data.username,
            roomId:data.room_id
        })
        io.to(data.room_id).emit('msg_recieved',data); // server sends a message to all other clients
    });

    socket.on('Typing', (data)=>{
        console.log(data);
        socket.broadcast.to(data.room_id).emit('Typing',data);
    })

  });





server.listen(3000, async()=>{
    console.log('Server started on port 3000');
    await connect();
    console.log('Connected to MongoDB');
});