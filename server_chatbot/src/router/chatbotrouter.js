const express = require('express')
const chatbotmodel = require('../model/chatbotmodel');
const { OpenAI } = require('openai');
const chatbotRouter = express.Router()

chatbotRouter.post('/chat', async function (req, res) {
    console.log(req.body);
    try {
        const openai = new OpenAI({
            apiKey: "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"
        });
        const data = {
            role: 'user',
            text: req.body.text
        }
        const messages = await chatbotmodel(data).save()

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: req.body.text }],
            max_tokens: 100
        });
        const responsechat = response.choices[0].message
        console.log(responsechat);
        const data1 = {
            role: response.choices[0].message.role,
            text: response.choices[0].message.content
        }
        const message = await chatbotmodel(data1).save()

        res.status(200).json(response.choices[0].message); // Send the response to the client
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: true, message: "Something went wrong" });
    }



})
chatbotRouter.get('/view-chat', async function (req, res) {
 
    try {
        
        const messages = await chatbotmodel.find()

    

        res.status(200).json(messages); // Send the response to the client
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: true, message: "Something went wrong" });
    }



})

module.exports = chatbotRouter