// ============================================
// CONFIG - API Keys & Settings
// ============================================

const CONFIG = {
  // Google Gemini API
  GEMINI_API_KEY: 'AIzaSyBXJ_-rK_q_r_q_r_q_r_q_r_q_r_q_r_q', // Bạn cần thay bằng API key thực tế
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  
  // OpenWeatherMap API
  WEATHER_API_KEY: '2e0b8a2b2d5e0f0a0b2d5e0f0a0b2d5e', // Bạn cần thay bằng API key thực tế
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',
  
  // CoinGecko API (Free - No key needed)
  CRYPTO_API_URL: 'https://api.coingecko.com/api/v3/simple/price',
  
  // Settings
  ENABLE_AI: true,
  ENABLE_WEATHER: true,
  ENABLE_CRYPTO: true,
  AUTO_SAVE_CHAT: true,
  MESSAGE_DELAY: 500, // ms
  
  // Storage Keys
  STORAGE_KEYS: {
    USER_PROFILE: 'user_profile',
    CHAT_HISTORY: 'chat_history',
    CUSTOM_RESPONSES: 'custom_responses',
    SETTINGS: 'settings',
    THEME: 'theme'
  }
};

// Emojis
const EMOJIS = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩'],
  gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🤟', '🤘', '🤙', '👍', '👎'],
  animals: ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🍗', '🍖', '🌮', '🌯', '🥙', '🍤', '🍜', '🍝', '🍕', '🍔', '🍟']
};
