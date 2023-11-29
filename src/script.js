var socket = io();
// socket.on('from_server',()=>{
//     console.log('from server msg seen on client');
//     const div=document.createElement('div');
//     div.innerHTML='a new message reciverd on server';
//     document.body.appendChild(div);
// })

// var btn=document.getElementById('btn');
// console.log(btn);
// btn.onclick=function(){
//     console.log("button clicked");
//     socket.emit('from_client');
// }

var btn=document.getElementById('btn');
var inputField=document.getElementById('input');
var msgs=document.getElementById('msglist');

btn.onclick=function(){
    console.log("button clicked");
    socket.emit('msg_send',{msg:inputField.value}
    );
}


socket.on('msg_recieved',(data)=>{  // server recieves a message
    console.log("message from server",data.msg);
    var li=document.createElement('li');
    li.innerHTML=data.msg;
    msgs.appendChild(li);
    inputField.value='';
})