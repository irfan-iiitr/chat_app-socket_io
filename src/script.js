var socket = io();
socket.on('from_server',()=>{
    console.log('from server msg seen on client');
    const div=document.createElement('div');
    div.innerHTML='a new message reciverd on server';
    document.body.appendChild(div);
})

var btn=document.getElementById('btn');
console.log(btn);
btn.onclick=function(){
    console.log("button clicked");
    socket.emit('from_client');
}
