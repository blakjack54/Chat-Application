import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Message({ text, user }) {
  return (
    <div className="message">
      <strong>{user}:</strong> {text}
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Connect to WebSocket for real-time messaging
    const socket = new WebSocket('ws://localhost:3000');
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    // Clean up WebSocket connection on unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageInput.trim();
    if (message === '') return;

    // Simulate sending message to server (replace with actual server integration)
    const newMessage = {
      user: 'You',
      text: message
    };
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div>
      <div id="messages">
        {messages.map((message, index) => (
          <Message key={index} user={message.user} text={message.text} />
        ))}
      </div>
      <form id="messageForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('messages'));
