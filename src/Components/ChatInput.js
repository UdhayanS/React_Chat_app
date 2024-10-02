import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons'; // File Photo Icon
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // Solid icon

const ChatInput = ({ onSendMessage, onUploadImage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue(''); // Clear the input field after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        className="input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <input type="file" onChange={(e) => onUploadImage(e.target.files[0])} className="file-input" id="file-input" />
      <label htmlFor="file-input" className="file-input-label">
                <FontAwesomeIcon icon={faFileImage} style={{ marginRight: '0px' }} />
                
            </label>
            <input
                type="file"
                onChange={(e) => onUploadImage(e.target.files[0])}
                className="file-input"
                id="file-input"
                style={{ display: 'none' }} // Hide the input
            />
            {/* Send Button with Icon */}
            <button className="send-button" onClick={handleSend}> 
                <FontAwesomeIcon icon={faPaperPlane} style={{  fontSize: '28px' ,color: 'Green'}} />
                
            </button>

    </div>
  );
};

export default ChatInput;
