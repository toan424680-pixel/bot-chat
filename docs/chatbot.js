// ============================================
// CHATBOT LOGIC - FRONTEND
// ============================================

const responses = {
  // Greetings
  'xin chào': 'Xin chào! 👋 Tôi là ChatBot, rất vui được gặp bạn! Có gì tôi có thể giúp bạn không?',
  'hi': 'Hi there! 😊 How can I help you today?',
  'hello': 'Hello! 👋 What can I do for you?',
  'chào': 'Xin chào! Có gì tôi có thể giúp bạn?',
  
  // Name questions
  'tên bạn': 'Tôi là ChatBot! 🤖 Rất vui được gặp bạn!',
  'what is your name': 'I am ChatBot, nice to meet you! 🤖',
  'tên của bạn': 'Tôi là ChatBot! 🤖',
  'bạn tên gì': 'Tôi tên là ChatBot! Rất vui khi gặp bạn! 😄',
  
  // Who are you
  'bạn là ai': 'Tôi là ChatBot - một trợ lý kỹ thuật được lập trình bằng JavaScript! 🤖',
  'who are you': 'I am ChatBot, an AI assistant created with JavaScript! 🤖',
  
  // Capabilities
  'bạn có thể làm gì': 'Tôi có thể:\n✅ Chat với bạn\n✅ Trả lời câu hỏi\n✅ Cung cấp thông tin\n✅ Hỗ trợ 24/7!',
  'what can you do': 'I can:\n✅ Chat with you\n✅ Answer questions\n✅ Provide information\n✅ Support 24/7!',
  'bạn có thể giúp gì': 'Tôi có thể giúp bạn với:\n🤝 Câu hỏi kỹ thuật\n🤝 Thông tin chung\n🤝 Gợi ý và tư vấn',
  
  // Thanks
  'cảm ơn': 'Không có gì! 😊 Nếu còn câu hỏi khác, cứ hỏi tôi nhé!',
  'thank you': 'You are welcome! 😊 Feel free to ask anything else!',
  'thanks': 'Happy to help! 😊',
  'cảm ơn bạn': 'Không có gì! 😊',
  
  // Goodbye
  'tạm biệt': 'Tạm biệt! 👋 Hẹn gặp lại bạn lần sau!',
  'bye': 'Goodbye! 👋 See you soon!',
  'see you': 'See you later! 👋',
  'tạm biệt bạn': 'Tạm biệt! 👋',
  
  // How are you
  'bạn khỏe không': 'Tôi khỏe lắm! 😊 Cảm ơn vì hỏi thăm. Bạn thế nào?',
  'how are you': 'I am doing great! 😊 Thanks for asking. How about you?',
  'bạn có khoẻ không': 'Tôi khỏe lắm! 😊',
  
  // Help
  'giúp': 'Tôi là đây! 🙋 Bạn cần giúp đỡ gì?',
  'help': 'I am here to help! 🙋 What do you need?',
  'hỗ trợ': 'Có gì tôi có thể giúp bạn không?',
  
  // Love/Like
  'tôi yêu bạn': 'Cảm ơn! 💕 Tôi cũng rất yêu quý người dùng của mình!',
  'i love you': 'Thanks! 💕 I appreciate your love!',
  'bạn tuyệt vời': 'Cảm ơn bạn! 😊 Tôi sẽ cố gắng hơn nữa!',
  
  // Compliments
  'bạn rất thông minh': 'Cảm ơn! 😊 Tôi làm hết sức cố gắng!',
  'you are smart': 'Thank you! 😊 I try my best!',
  
  // Default response
  'default': 'Xin lỗi, tôi không hiểu lắm. Bạn có thể nói lại không? 😅'
};

// Get response from chatbot
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  // Search for exact or partial matches
  for (const key in responses) {
    if (key !== 'default' && message.includes(key)) {
      return responses[key];
    }
  }
  
  // Return default response
  return responses.default;
}

// Send message function
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Display user message
  addMessage(message, 'user');
  
  // Clear input
  input.value = '';
  input.focus();
  
  // Get bot response
  setTimeout(() => {
    const reply = getBotResponse(message);
    addMessage(reply, 'bot');
  }, 500); // Simulate thinking time
}

// Add message to chat box
function addMessage(text, sender) {
  const chatBox = document.getElementById('chatBox');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;
  
  messageDiv.appendChild(contentDiv);
  
  if (sender === 'bot') {
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'bot-avatar-small';
    avatarDiv.textContent = '🤖';
    messageDiv.insertBefore(avatarDiv, contentDiv);
  }
  
  chatBox.appendChild(messageDiv);
  
  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message on Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('messageInput');
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add click listeners to suggestions
  const suggestions = document.querySelectorAll('.info-panel li');
  suggestions.forEach((item) => {
    item.addEventListener('click', () => {
      input.value = item.textContent;
      input.focus();
    });
  });
  
  // Welcome message
  setTimeout(() => {
    addMessage('Xin chào! 👋 Tôi là ChatBot. Có gì tôi có thể giúp bạn? 😊', 'bot');
  }, 500);
});
