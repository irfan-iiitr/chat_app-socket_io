const mongoose = require('mongoose');

const mongoURI='mongodb+srv://imirfansari:kJGplUJA7wVter4W@cluster0.pcov0c6.mongodb.net/twitter-backend?retryWrites=true&w=majority'

const connect = async()=>{
    await mongoose.connect(mongoURI);
}
module.exports=connect;