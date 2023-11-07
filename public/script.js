// script.js

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
  
    sendButton.addEventListener('click', async () => {
      const message = userInput.value;
      if (message) {
        const response = await sendMessageToNamida(message);
        displayMessage('Tú', message);
        displayMessage('Namida', response);
        userInput.value = '';
      }
    });
  
    async function sendMessageToNamida(message) {
      const response = await fetch('/ask-namida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
      return data.response;
    }
  
    function displayMessage(sender, message) {
      const messageElement = document.createElement('p');
      messageElement.innerText = `${sender}: ${message}`;
      chatContainer.appendChild(messageElement);
    }
  });
  