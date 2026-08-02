const responses = require('./responses');

// Chatbot logic
class ChatBot {
  getResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Search for matching response
    for (const key in responses) {
      if (message.includes(key)) {
        return responses[key];
      }
    }
    
    // Default response
    return responses.default;
  }
}

module.exports = new ChatBot();
