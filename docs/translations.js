// ============================================
// TRANSLATIONS - Multi-language Support
// ============================================

const TRANSLATIONS = {
  vi: {
    // Common
    'hello': 'Xin chào',
    'goodbye': 'Tạm biệt',
    'thanks': 'Cảm ơn',
    'yes': 'Có',
    'no': 'Không',
    
    // Chatbot Responses
    'greeting': 'Xin chào! 👋 Tôi là ChatBot AI Pro, rất vui được gặp bạn!',
    'who_are_you': 'Tôi là ChatBot AI Pro - một trợ lý thông minh được lập trình bằng JavaScript!',
    'what_can_you_do': 'Tôi có thể:\n✅ Chat với bạn\n✅ Trả lời câu hỏi\n✅ Cung cấp thông tin\n✅ Hỗ trợ 24/7',
    'default_response': 'Xin lỗi, tôi không hiểu lắm. Bạn có thể nói lại không?',
    
    // UI Labels
    'new_chat': 'Cuộc trò chuyện mới',
    'profile': 'Hồ sơ',
    'history': 'Lịch sử chat',
    'download': 'Tải xuống chat',
    'admin': 'Admin Panel',
    'weather': 'Thời tiết',
    'crypto': 'Giá Crypto',
    'quiz': 'Quiz trò chơi',
    'settings': 'Cài đặt',
    'clear_data': 'Xoá tất cả dữ liệu',
    'send': 'Gửi',
    'cancel': 'Huỷ',
    'save': 'Lưu',
    'delete': 'Xoá',
    
    // Modals
    'user_profile': 'Hồ sơ người dùng',
    'name': 'Tên',
    'email': 'Email',
    'avatar': 'Avatar',
    'admin_panel': 'Admin Panel',
    'keyword': 'Keyword',
    'response': 'Câu trả lời',
    'add_response': 'Thêm response',
    'chat_history': 'Lịch sử chat',
    'dark_mode': 'Chế độ tối',
    'light_mode': 'Chế độ sáng',
    
    // Messages
    'saved_success': 'Đã lưu thành công!',
    'deleted_success': 'Đã xoá thành công!',
    'error_occurred': 'Có lỗi xảy ra',
    'loading': 'Đang tải...',
    'online': 'Online',
    'offline': 'Offline',
    
    // Voice & Speech
    'listening': 'Đang nghe...',
    'speaking': 'Đang nói...',
    'speech_not_supported': 'Trình duyệt không hỗ trợ nhận dạng giọng nói',
    
    // Weather
    'temperature': 'Nhiệt độ',
    'humidity': 'Độ ẩm',
    'wind_speed': 'Tốc độ gió',
    'weather_description': 'Mô tả thời tiết',
  },
  
  en: {
    // Common
    'hello': 'Hello',
    'goodbye': 'Goodbye',
    'thanks': 'Thanks',
    'yes': 'Yes',
    'no': 'No',
    
    // Chatbot Responses
    'greeting': 'Hello! 👋 I am ChatBot AI Pro, nice to meet you!',
    'who_are_you': 'I am ChatBot AI Pro - an intelligent assistant created with JavaScript!',
    'what_can_you_do': 'I can:\n✅ Chat with you\n✅ Answer questions\n✅ Provide information\n✅ Support 24/7',
    'default_response': 'Sorry, I didn\'t understand that. Could you please rephrase?',
    
    // UI Labels
    'new_chat': 'New Chat',
    'profile': 'Profile',
    'history': 'Chat History',
    'download': 'Download Chat',
    'admin': 'Admin Panel',
    'weather': 'Weather',
    'crypto': 'Crypto Prices',
    'quiz': 'Quiz Game',
    'settings': 'Settings',
    'clear_data': 'Clear All Data',
    'send': 'Send',
    'cancel': 'Cancel',
    'save': 'Save',
    'delete': 'Delete',
    
    // Modals
    'user_profile': 'User Profile',
    'name': 'Name',
    'email': 'Email',
    'avatar': 'Avatar',
    'admin_panel': 'Admin Panel',
    'keyword': 'Keyword',
    'response': 'Response',
    'add_response': 'Add Response',
    'chat_history': 'Chat History',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    
    // Messages
    'saved_success': 'Saved successfully!',
    'deleted_success': 'Deleted successfully!',
    'error_occurred': 'An error occurred',
    'loading': 'Loading...',
    'online': 'Online',
    'offline': 'Offline',
    
    // Voice & Speech
    'listening': 'Listening...',
    'speaking': 'Speaking...',
    'speech_not_supported': 'Your browser doesn\'t support speech recognition',
    
    // Weather
    'temperature': 'Temperature',
    'humidity': 'Humidity',
    'wind_speed': 'Wind Speed',
    'weather_description': 'Weather Description',
  },
  
  es: {
    'greeting': '¡Hola! 👋 Soy ChatBot AI Pro, ¡encantado de conocerte!',
    'who_are_you': '¡Soy ChatBot AI Pro - un asistente inteligente creado con JavaScript!',
    'default_response': 'Lo siento, no entendí eso. ¿Podrías reformular?',
    'hello': 'Hola',
    'goodbye': 'Adiós',
  },
  
  fr: {
    'greeting': 'Bonjour! 👋 Je suis ChatBot AI Pro, ravi de vous rencontrer!',
    'who_are_you': 'Je suis ChatBot AI Pro - un assistant intelligent créé avec JavaScript!',
    'default_response': 'Désolé, je n\'ai pas compris. Pouvez-vous reformuler?',
    'hello': 'Bonjour',
    'goodbye': 'Au revoir',
  },
  
  ja: {
    'greeting': 'こんにちは! 👋 私はChatBot AI Proです。',
    'who_are_you': '私はChatBot AI Pro - JavaScriptで作られたインテリジェントアシスタントです!',
    'default_response': '申し訳ありません。言い直してください。',
    'hello': 'こんにちは',
    'goodbye': 'さようなら',
  }
};

// Translate function
function t(key, lang = getCurrentLanguage()) {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

// Get current language
function getCurrentLanguage() {
  return Storage.get('language', 'vi') || 'vi';
}

// Set language
function setLanguage(lang) {
  Storage.save('language', lang);
  updateUILanguage(lang);
}

// Update all UI with new language
function updateUILanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, lang);
  });
  
  // Update placeholder texts
  const inputElement = document.getElementById('messageInput');
  if (inputElement) {
    inputElement.placeholder = lang === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...';
  }
  
  // Reload page to apply all translations
  location.reload();
}
