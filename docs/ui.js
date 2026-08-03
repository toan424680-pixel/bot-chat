// ============================================
// UI - User Interface Management
// ============================================

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.left = sidebar.style.left === '0px' ? '-300px' : '0px';
}

function closeSidebar() {
  document.getElementById('sidebar').style.left = '-300px';
}

// User Profile
function showUserProfile() {
  const profile = Storage.getUserProfile();
  document.getElementById('userName').value = profile.name;
  document.getElementById('userEmail').value = profile.email;
  document.getElementById('userAvatar').value = profile.avatar;
  openModal('userProfileModal');
}

function saveUserProfile() {
  const profile = {
    name: document.getElementById('userName').value || 'User',
    email: document.getElementById('userEmail').value,
    avatar: document.getElementById('userAvatar').value || '👤'
  };
  Storage.saveUserProfile(profile);
  closeModal('userProfileModal');
  showNotification('Hồ sơ đã được lưu!');
}

// Admin Panel
function showAdminPanel() {
  openModal('adminPanelModal');
  loadCustomResponses();
}

function addCustomResponse() {
  const keyword = document.getElementById('adminKeyword').value.trim();
  const response = document.getElementById('adminResponse').value.trim();
  
  if (!keyword || !response) {
    showNotification('Vui lòng nhập keyword và response!');
    return;
  }
  
  Storage.saveCustomResponse(keyword, response);
  document.getElementById('adminKeyword').value = '';
  document.getElementById('adminResponse').value = '';
  showNotification('Response đã được thêm!');
  loadCustomResponses();
}

function loadCustomResponses() {
  const custom = Storage.getCustomResponses();
  const list = document.getElementById('customResponsesList');
  
  if (Object.keys(custom).length === 0) {
    list.innerHTML = '<p>Chưa có custom response nào</p>';
    return;
  }
  
  let html = '<div class="custom-responses">';
  for (const keyword in custom) {
    html += `
      <div class="response-item">
        <div class="response-keyword">🔑 ${keyword}</div>
        <div class="response-text">${custom[keyword]}</div>
        <button class="btn-delete" onclick="deleteCustomResponse('${keyword}')">🗑️ Xoá</button>
      </div>
    `;
  }
  html += '</div>';
  list.innerHTML = html;
}

function deleteCustomResponse(keyword) {
  if (confirm('Xoá response này?')) {
    Storage.deleteCustomResponse(keyword);
    showNotification('Response đã được xoá!');
    loadCustomResponses();
  }
}

// Settings
function showSettings() {
  const settings = Storage.getSettings();
  document.getElementById('autoSaveChat').checked = settings.autoSave;
  document.getElementById('autoTranslate').checked = settings.autoTranslate;
  document.getElementById('soundNotifications').checked = settings.soundNotifications;
  document.getElementById('compactMode').checked = settings.compactMode;
  openModal('settingsModal');
}

function saveSettings() {
  const settings = {
    autoSave: document.getElementById('autoSaveChat').checked,
    autoTranslate: document.getElementById('autoTranslate').checked,
    soundNotifications: document.getElementById('soundNotifications').checked,
    compactMode: document.getElementById('compactMode').checked
  };
  Storage.saveSettings(settings);
  closeModal('settingsModal');
  showNotification('Cài đặt đã được lưu!');
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = Storage.getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  Storage.saveTheme(newTheme);
  document.body.className = newTheme + '-theme';
  document.getElementById('themeToggleBtn').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  showNotification(newTheme === 'dark' ? 'Chế độ tối bật' : 'Chế độ sáng bật');
}

// Weather Widget
async function toggleWeatherWidget() {
  const widget = document.getElementById('weatherWidget');
  
  if (widget.style.display === 'none') {
    widget.style.display = 'block';
    await loadWeather();
  } else {
    widget.style.display = 'none';
  }
}

async function loadWeather() {
  const content = document.getElementById('weatherContent');
  content.innerHTML = 'Đang tải...';
  
  const weather = await API.getWeather('Hanoi');
  
  if (!weather) {
    content.innerHTML = 'Không thể tải dữ liệu thời tiết. Vui lòng cấu hình OpenWeatherMap API key.';
    return;
  }
  
  let html = `
    <div class="weather-info">
      <div class="weather-icon">${weather.icon}</div>
      <div class="weather-details">
        <p><strong>${weather.city}</strong></p>
        <p>🌡️ ${weather.temp}°C</p>
        <p>💧 ${weather.humidity}%</p>
        <p>💨 ${weather.windSpeed} m/s</p>
        <p>${weather.description}</p>
      </div>
    </div>
  `;
  content.innerHTML = html;
}

// Crypto Widget
async function toggleCryptoWidget() {
  const widget = document.getElementById('cryptoWidget');
  
  if (widget.style.display === 'none') {
    widget.style.display = 'block';
    await loadCrypto();
  } else {
    widget.style.display = 'none';
  }
}

async function loadCrypto() {
  const content = document.getElementById('cryptoContent');
  content.innerHTML = 'Đang tải...';
  
  const cryptoData = await API.getCryptoPrices(['bitcoin', 'ethereum', 'cardano']);
  
  if (!cryptoData) {
    content.innerHTML = 'Không thể tải giá crypto';
    return;
  }
  
  let html = '<div class="crypto-list">';
  cryptoData.forEach(coin => {
    html += `
      <div class="crypto-item">
        <span class="crypto-name">${coin.symbol} ${coin.name}</span>
        <span class="crypto-price">${coin.price}</span>
      </div>
    `;
  });
  html += '</div>';
  content.innerHTML = html;
}

// Quiz Game
function playQuiz() {
  const quizzes = [
    {
      question: 'ChatBot được tạo bằng ngôn ngữ gì?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      answer: 1
    },
    {
      question: 'GitHub Pages là gì?',
      options: ['Một trang web', 'Hosting miễn phí từ GitHub', 'Một ứng dụng di động', 'Một framework'],
      answer: 1
    },
    {
      question: 'LocalStorage dùng để làm gì?',
      options: ['Lưu trữ dữ liệu trên browser', 'Tạo database', 'Gửi email', 'Render trang web'],
      answer: 0
    }
  ];
  
  const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
  
  let html = `
    <div class="quiz-container">
      <h3>${quiz.question}</h3>
      <div class="quiz-options">
  `;
  
  quiz.options.forEach((option, index) => {
    html += `<button class="quiz-btn" onclick="checkQuizAnswer(${index}, ${quiz.answer})">${option}</button>`;
  });
  
  html += `</div></div>`;
  
  addMessage(html, 'bot', true);
}

function checkQuizAnswer(selected, correct) {
  if (selected === correct) {
    addMessage('🎉 Chính xác! Bạn giỏi đấy!', 'bot');
  } else {
    addMessage('❌ Sai rồi. Hãy thử lại!', 'bot');
  }
}

// Emoji Picker
function openEmojiPicker() {
  const picker = document.getElementById('emojiPicker');
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
  
  if (picker.style.display === 'block') {
    loadEmojis();
  }
}

function loadEmojis() {
  const grid = document.getElementById('emojiGrid');
  grid.innerHTML = '';
  
  const allEmojis = [...EMOJIS.smileys, ...EMOJIS.gestures, ...EMOJIS.animals, ...EMOJIS.food];
  allEmojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.className = 'emoji-btn';
    btn.onclick = () => insertEmoji(emoji);
    grid.appendChild(btn);
  });
}

function insertEmoji(emoji) {
  const input = document.getElementById('messageInput');
  input.value += emoji;
  input.focus();
  document.getElementById('emojiPicker').style.display = 'none';
}

// Notification
function showNotification(message, duration = 3000) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, duration);
}

// Clear all data
function clearAllData() {
  if (confirm('Bạn chắc chắn muốn xoá tất cả dữ liệu? Hành động này không thể hoàn tác!')) {
    Storage.clear();
    document.getElementById('chatBox').innerHTML = '';
    messageCount = 0;
    document.getElementById('messageCount').textContent = '0';
    showNotification('Tất cả dữ liệu đã được xoá!');
  }
}

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  // Load theme
  const theme = Storage.getTheme();
  document.body.className = theme + '-theme';
  document.getElementById('themeToggleBtn').textContent = theme === 'dark' ? '☀️' : '🌙';
  
  // Menu button
  document.getElementById('menuBtn')?.addEventListener('click', toggleSidebar);
  document.getElementById('closeSidebarBtn')?.addEventListener('click', closeSidebar);
  
  // Theme toggle
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);
  
  // Emoji button
  document.getElementById('emojiBtn')?.addEventListener('click', openEmojiPicker);
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Close emoji picker when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#emojiBtn') && !e.target.closest('.emoji-picker')) {
      document.getElementById('emojiPicker').style.display = 'none';
    }
  });
});
