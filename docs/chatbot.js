// ============================================
// CHATBOT - Main Logic
// ============================================

let messageCount = 0;
let currentChatRoom = 'default';
let isVoiceEnabled = false;
let isAIEnabled = false;

const responses = {
  // Greetings
  'xin chào': 'Xin chào! 👋 Tôi là ChatBot AI Pro, rất vui được gặp bạn! Có gì tôi có thể giúp bạn không?',
  'chào': 'Xin chào! Có gì tôi có thể giúp bạn?',
  'hi': 'Hi there! 😊 How can I help you today?',
  'hello': 'Hello! 👋 What can I do for you?',
  
  // Name questions
  'tên bạn': 'Tôi là ChatBot AI Pro! 🤖 Rất vui được gặp bạn!',
  'what is your name': 'I am ChatBot AI Pro, nice to meet you! 🤖',
  'tên của bạn': 'Tôi là ChatBot AI Pro! 🤖',
  'bạn tên gì': 'Tôi tên là ChatBot AI Pro! Rất vui khi gặp bạn! 😄',
  
  // Who are you
  'bạn là ai': 'Tôi là ChatBot AI Pro - một trợ lý kỹ thuật được lập trình bằng JavaScript! 🤖',
  'who are you': 'I am ChatBot AI Pro, an AI assistant created with JavaScript! 🤖',
  
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
  
  // Help
  'giúp': 'Tôi là đây! 🙋 Bạn cần giúp đỡ gì?',
  'help': 'I am here to help! 🙋 What do you need?',
  'hỗ trợ': 'Có gì tôi có thể giúp bạn không?',
  
  // Default
  'default': 'Xin lỗi, tôi không hiểu lắm. Bạn có thể nói lại không? 😅'
};

// Get bot response
function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  
  // Check custom responses first
  const customResponses = Storage.getCustomResponses();
  for (const key in customResponses) {
    if (message.includes(key)) {
      return customResponses[key];
    }
  }
  
  // Check built-in responses
  for (const key in responses) {
    if (key !== 'default' && message.includes(key)) {
      return responses[key];
    }
  }
  
  return responses.default;
}

// Send message
function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  addMessage(message, 'user');
  input.value = '';
  input.focus();
  
  // Auto-save to history
  if (Storage.getSettings().autoSave) {
    Storage.saveChatMessage(message, 'user');
  }
  
  messageCount++;
  document.getElementById('messageCount').textContent = messageCount;
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get response
  setTimeout(async () => {
    hideTypingIndicator();
    let reply;
    
    // Try AI first if enabled
    if (isAIEnabled) {
      reply = await API.getAIResponse(message);
    } else {
      reply = getBotResponse(message);
    }
    
    addMessage(reply, 'bot');
    
    // Speak if voice enabled
    if (isVoiceEnabled) {
      API.speak(reply, 'vi-VN');
    }
    
    // Auto-save to history
    if (Storage.getSettings().autoSave) {
      Storage.saveChatMessage(reply, 'bot');
    }
    
    messageCount++;
    document.getElementById('messageCount').textContent = messageCount;
  }, CONFIG.MESSAGE_DELAY);
}

// Add message to chat
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
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'flex';
  const chatBox = document.getElementById('chatBox');
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'none';
}

// New chat room
function newChatRoom() {
  currentChatRoom = 'chat_' + Date.now();
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  messageCount = 0;
  document.getElementById('messageCount').textContent = '0';
  
  // Add welcome message
  setTimeout(() => {
    addMessage('Xin chào! 👋 Đây là cuộc trò chuyện mới. Có gì tôi có thể giúp bạn? 😊', 'bot');
  }, 500);
  
  closeSidebar();
  showNotification('Tạo cuộc trò chuyện mới thành công!');
}

// Show chat history
function showChatHistory() {
  const history = Storage.getChatHistory();
  const modal = document.getElementById('chatHistoryModal');
  const content = document.getElementById('chatHistoryContent');
  
  if (history.length === 0) {
    content.innerHTML = '<p>Không có lịch sử chat</p>';
  } else {
    let html = '<div class="history-list">';
    history.forEach((msg, index) => {
      html += `
        <div class="history-item">
          <span class="history-time">${new Date(msg.timestamp).toLocaleString()}</span>
          <span class="history-sender">${msg.sender === 'user' ? '👤' : '🤖'}</span>
          <span class="history-message">${msg.message.substring(0, 50)}...</span>
        </div>
      `;
    });
    html += '</div>';
    content.innerHTML = html;
  }
  
  modal.style.display = 'block';
}

// Export chat
function exportChat() {
  const history = Storage.getChatHistory();
  const userProfile = Storage.getUserProfile();
  
  let content = `ChatBot AI Pro - Lịch sử trò chuyện\n`;
  content += `Người dùng: ${userProfile.name}\n`;
  content += `Ngày xuất: ${new Date().toLocaleString()}\n`;
  content += `=================================\n\n`;
  
  history.forEach(msg => {
    const time = new Date(msg.timestamp).toLocaleString();
    const sender = msg.sender === 'user' ? '👤 Bạn' : '🤖 ChatBot';
    content += `[${time}] ${sender}:\n${msg.message}\n\n`;
  });
  
  // Create download
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', `chatbot_history_${Date.now()}.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  
  showNotification('Chat đã được tải xuống!');
}

// Voice input
function startVoiceInput() {
  API.startSpeechRecognition((transcript) => {
    document.getElementById('messageInput').value = transcript;
    sendMessage();
  });
}

// Toggle voice
function toggleVoice() {
  isVoiceEnabled = !isVoiceEnabled;
  const btn = document.getElementById('voiceToggleBtn');
  btn.style.opacity = isVoiceEnabled ? '1' : '0.5';
  showNotification(isVoiceEnabled ? '✓ Giọng nói bật' : '✗ Giọng nói tắt');
}

// Show suggestions
function showSuggestions() {
  const suggestionsList = ['Xin chào', 'Tên bạn là gì', 'Bạn có thể giúp gì', 'Tạm biệt'];
  const area = document.getElementById('suggestionsArea');
  
  let html = '<div class="suggestions">';
  suggestionsList.forEach(suggestion => {
    html += `<button class="suggestion-btn" onclick="insertSuggestion('${suggestion}')">${suggestion}</button>`;
  });
  html += '</div>';
  
  area.innerHTML = html;
}

// Insert suggestion
function insertSuggestion(text) {
  document.getElementById('messageInput').value = text;
  document.getElementById('messageInput').focus();
}

// Keyboard support
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('messageInput');
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Click listeners for suggestions panel
  const suggestionsPanel = document.getElementById('suggestionsPanel');
  if (suggestionsPanel) {
    suggestionsPanel.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        insertSuggestion(e.target.textContent);
      }
    });
  }
  
  // Voice button
  document.getElementById('voiceInputBtn')?.addEventListener('click', startVoiceInput);
  document.getElementById('voiceToggleBtn')?.addEventListener('click', toggleVoice);
  document.getElementById('sendBtn')?.addEventListener('click', sendMessage);
  
  // Language selector
  document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
  
  // Welcome message
  setTimeout(() => {
    addMessage('Xin chào! 👋 Tôi là ChatBot AI Pro. Có gì tôi có thể giúp bạn? 😊', 'bot');
  }, 500);
  
  // Show suggestions
  showSuggestions();
});
