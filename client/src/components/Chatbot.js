import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default function Chatbot() {
    const [messages1, setMessages1] = useState([]);
    const [userInput, setUserInput] = useState({text: '', role: 'user' });
    const [loading, setLoading] = useState(false);
    console.log(userInput);
    const [msg, setMsg] = useState([])
    console.log(msg);
   
   

    const sendMessage = async () => {
        if (userInput.text.trim() === '') {
            toast.success('Input is empty', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        setLoading(true);
        axios.post('https://chatbot-7j2j.onrender.com/chat', userInput).then((res) => {

            axios.get('https://chatbot-7j2j.onrender.com/view-chat').then((res) => {
                setMsg(res.data);
                setLoading(false);
            });
        });

        setUserInput({ text: '', role: 'user' });
    };



    useEffect(() => {
        setLoading(true);
        axios.get('https://chatbot-7j2j.onrender.com/view-chat').then((res) => {
            setMsg(res.data)
            setLoading(false);
        })
    }, [])
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <h1 style={{display:'flex',justifyContent:'center'}}>CHATBOT</h1>
            <div style={{ maxHeight: '650px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc' }}>
                {msg.map((message, index) => (
                    <div key={index} style={{
                        marginBottom: '10px',
                        textAlign: message.role === 'user' ? 'right' : 'left',
                        backgroundColor: message.role === 'user' ? 'lightblue' : 'lightgreen',
                        padding: '8px',
                        borderRadius: '8px',
                        clear: 'both',
                        maxWidth: 'fit-content', // Adjust width based on content
                    }}>
                        {message.text}
                    </div>
                ))}
                {loading && (
                    <div style={{ textAlign: 'right', marginRight: '10px' }}>
                        <ClipLoader color="#36D7B7" loading={loading} css={override} size={20} />
                    </div>
                )}
            </div>

            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    value={userInput.text || ' '}
                    onChange={(e) => setUserInput({ text: e.target.value, role: 'user' })}
                    placeholder="Type your message..."
                    style={{ width: '70%', padding: '10px', boxSizing: 'border-box' }}
                />
                <button onClick={sendMessage} style={{ width: '30%', padding: '10px', boxSizing: 'border-box' }}>
                    Send
                </button>
            </div>
        </div>
    )
}
