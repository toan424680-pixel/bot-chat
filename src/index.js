const express = require('express');
const dotenv = require('dotenv');
const chatbot = require('./chatbot');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${process.env.BOT_NAME || 'ChatBot'}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; }
        .chat-box { border: 1px solid #ccc; height: 400px; overflow-y: auto; padding: 10px; margin-bottom: 10px; }
        .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .user-message { background-color: #007bff; color: white; text-align: right; }
        .bot-message { background-color: #f0f0f0; }
        input { width: 80%; padding: 10px; }
        button { width: 18%; padding: 10px; }
      </style>
    </head>
    <body>
      <h1>${process.env.BOT_NAME || 'ChatBot'}</h1>
      <div class="chat-box" id="chatBox"></div>
      <input type="text" id="messageInput" placeholder="Nhập tin nhắn..." />
      <button onclick="sendMessage()">Gửi</button>
      
      <script>
        function sendMessage() {
          const input = document.getElementById('messageInput');
          const message = input.value.trim();
          if (!message) return;
          
          // Display user message
          const chatBox = document.getElementById('chatBox');
          const userMsg = document.createElement('div');
          userMsg.className = 'message user-message';
          userMsg.textContent = message;
          chatBox.appendChild(userMsg);
          
          // Send to server
          fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          })
          .then(res => res.json())
          .then(data => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.textContent = data.reply;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
          });
          
          input.value = '';
        }
      </script>
    </body>
    </html>
  `);
});

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const reply = chatbot.getResponse(userMessage);
  res.json({ reply });
});

// Start server
app.listen(PORT, () => {
  console.log(`${process.env.BOT_NAME || 'ChatBot'} running on http://localhost:${PORT}`);
});
