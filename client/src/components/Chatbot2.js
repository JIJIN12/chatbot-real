import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

const socket = io();
export default function Chatbot2() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    console.log('messages',messages);
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { user: 'You', text: inputMessage }]);
            socket.emit('message', inputMessage);
            setInputMessage('');
        }
    };

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages([...messages, { user: 'Bot', text: msg.text }]);
        });
    }, [messages]);
    return (
        <div>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{`${msg.user}: ${msg.text}`}</li>
                    ))}
                </ul>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}
