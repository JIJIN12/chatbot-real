const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const http = require('http')
const socketio = require('socket.io')
const chatbotRouter = require('./src/router/chatbotrouter')
const app = express()


app.use(bodyparser())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*"); //  * every url can access
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
const server = http.createServer(app);
const io = socketio(server)


app.use('/chatbot',chatbotRouter)


const url = 'mongodb+srv://jijinsuresh6:jijinsuresh6@cluster0.dh7smys.mongodb.net/CHATBOT_SERVER?retryWrites=true&w=majority'

mongoose.connect(url).then(()=>{
    app.listen(1000,function(){
        console.log('started http://localhost:1000');
    })
}).catch((error)=>{
    console.log(error);
})
