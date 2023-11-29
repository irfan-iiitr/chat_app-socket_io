const mongoose = require('mongoose');

const mongoURI='mongo uri here...'

const connect = async()=>{
    await mongoose.connect(mongoURI);
}
module.exports=connect;