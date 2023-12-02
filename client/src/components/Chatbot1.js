import React, { useState } from 'react'
import './Chatbot1.css'
import axios from 'axios';
export default function Chatbot1() {
    const [messages1, setMessages1] = useState([]);
    const [userInput1, setUserInput1] = useState('');
    console.log('messages1',messages1);
    console.log('input',userInput1);

    const sendmessage = ()=>{
        setMessages1([...messages1,{text:userInput1,role:'user'}])
        setUserInput1('');

        try {
            // axios.post()
        } catch (error) {
            console.log('api error',error);
        }
    }
    return (
        <div className='chatbot_container'>
            <div class="chatbox">
                <div class="chatlogs" id="chatlogs">
                    <div class="chat bot">Hello! How can I help you today?</div>
                    {messages1.map((message,index)=>{
                        <div key={index} style={{ marginBottom: '10px', textAlign: message.role === 'user' ? 'right' : 'left' }}>
                            {message.text}
                        </div>
                    })}
                </div>
                <div class="inputbox">
                    <input type="text" id="userInput" placeholder="Type your message..." 
                    onChange={(e) => setUserInput1(e.target.value)}
                    value={userInput1}
                    />
                    <button onClick={sendmessage}>Send</button>
                </div>
            </div>
        </div>
    )
}
