const mongoose = require('mongoose')
const schema = mongoose.Schema

const chatbotschema = new schema({
    role:{type:String},
    text:{type:String}
})

const chatbotmodel = mongoose.model('chatbot_tb',chatbotschema)

module.exports =chatbotmodel