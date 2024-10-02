import React from 'react';
import fileIcon from '../img/files-icon.png'; // Replace with your file icon path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Eye icon
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Trash icon


const ChatWindow = ({ messages, onDeleteMessage }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={message.id} className={`message ${message.sender === 'user' ? 'user' : 'other'}`}>
          {message.type === 'text' && (
            <>
              <span>{message.text}</span>
              <button className="delete-button" onClick={() => onDeleteMessage(index)}>
        <FontAwesomeIcon icon={faTrash} /> 
      </button>            </>
          )}
          {(message.type === 'pdf' || message.type === 'file' ) && (
            <>
              <div className="file-message">
                <img src={fileIcon} alt="File Icon" className="file-icon" /> {/* Show file icon */}
                <span>{message.fileName}</span>
                <button className="view-button" onClick={() => window.open(message.fileUrl)}>
        <FontAwesomeIcon icon={faEye} /> 
      </button>
      <button className="delete-button" onClick={() => onDeleteMessage(index)}>
        <FontAwesomeIcon icon={faTrash} /> 
      </button>
              </div>
              {message.type === 'pdf' && (
                <iframe className="pdf-view" src={message.fileUrl} title="PDF Viewer"></iframe>
              )}
            </>
          )}
          {message.type === 'image' && (
            <>
              <img src={message.imageUrl} alt="Files" className="message-image" />
              <button className="view-button" onClick={() => window.open(message.fileUrl)}>
        <FontAwesomeIcon icon={faEye} /> 
      </button>              <button className="delete-button" onClick={() => onDeleteMessage(index)}>
        <FontAwesomeIcon icon={faTrash} /> 
      </button>            </>
          )}
          
          
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
