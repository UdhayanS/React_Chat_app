// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatWindow from './Components/ChatWindow';
import ChatInput from './Components/ChatInput';
import Login from './Components/Login';
import Register from './Components/Register';
import { database, ref, push, onValue, remove, set } from './firebase'; // Import necessary functions
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storage = getStorage(); // Initialize Firebase Storage

  useEffect(() => {
    const messagesRef = ref(database, 'messages');

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];

      for (let id in data) {
        loadedMessages.push({ id, ...data[id] }); // Include message ID for deletion
      }

      setMessages(loadedMessages);
    });
  }, []);

  const handleSendMessage = (messageText) => {
    if (messageText.trim() !== '') {
      const newMessage = { text: messageText, sender: 'user', type: 'text' };

      const messagesRef = ref(database, 'messages');
      push(messagesRef, newMessage);
    }
  };

  const handleUploadImage = async (file) => {
    const storageReference = storageRef(storage, `chat_images/${file.name}`);
    
    // Upload the file to Firebase Storage
    await uploadBytes(storageReference, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageReference);

    // Store the image URL in Firebase Realtime Database
    const newMessage = { imageUrl: downloadURL, sender: 'user', type: 'image' };

    const messagesRef = ref(database, 'messages');
    push(messagesRef, newMessage);
  };

  const handleDeleteMessage = async (messageIndex) => {
    const messageId = messages[messageIndex].id; // Get the message ID to delete
    const messageRef = ref(database, `messages/${messageId}`);
    
    // Remove the message from the database
    await remove(messageRef);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isLoggedIn ? (
            
            <div className="chat-box">
              <div className="chat-header">
                <h1>Udhayan Chat App</h1>
              </div>
              <ChatWindow messages={messages} onDeleteMessage={handleDeleteMessage} />
              <ChatInput onSendMessage={handleSendMessage} onUploadImage={handleUploadImage} />
            </div>
          ) : (
            <Login onLogin={setIsLoggedIn} />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
