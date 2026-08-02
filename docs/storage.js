// ============================================
// STORAGE - LocalStorage Management
// ============================================

class Storage {
  static save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  static get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error('Storage error:', e);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  }

  // Chat History
  static saveChatMessage(message, sender) {
    const history = this.get(CONFIG.STORAGE_KEYS.CHAT_HISTORY, []);
    history.push({
      message,
      sender,
      timestamp: new Date().toISOString()
    });
    this.save(CONFIG.STORAGE_KEYS.CHAT_HISTORY, history);
  }

  static getChatHistory() {
    return this.get(CONFIG.STORAGE_KEYS.CHAT_HISTORY, []);
  }

  static clearChatHistory() {
    this.remove(CONFIG.STORAGE_KEYS.CHAT_HISTORY);
  }

  // User Profile
  static saveUserProfile(profile) {
    this.save(CONFIG.STORAGE_KEYS.USER_PROFILE, profile);
  }

  static getUserProfile() {
    return this.get(CONFIG.STORAGE_KEYS.USER_PROFILE, {
      name: 'User',
      email: '',
      avatar: '👤'
    });
  }

  // Custom Responses
  static saveCustomResponse(keyword, response) {
    const custom = this.get(CONFIG.STORAGE_KEYS.CUSTOM_RESPONSES, {});
    custom[keyword.toLowerCase()] = response;
    this.save(CONFIG.STORAGE_KEYS.CUSTOM_RESPONSES, custom);
  }

  static getCustomResponses() {
    return this.get(CONFIG.STORAGE_KEYS.CUSTOM_RESPONSES, {});
  }

  static deleteCustomResponse(keyword) {
    const custom = this.get(CONFIG.STORAGE_KEYS.CUSTOM_RESPONSES, {});
    delete custom[keyword.toLowerCase()];
    this.save(CONFIG.STORAGE_KEYS.CUSTOM_RESPONSES, custom);
  }

  // Settings
  static saveSettings(settings) {
    this.save(CONFIG.STORAGE_KEYS.SETTINGS, settings);
  }

  static getSettings() {
    return this.get(CONFIG.STORAGE_KEYS.SETTINGS, {
      autoSave: true,
      autoTranslate: false,
      soundNotifications: false,
      compactMode: false
    });
  }

  // Theme
  static saveTheme(theme) {
    this.save(CONFIG.STORAGE_KEYS.THEME, theme);
  }

  static getTheme() {
    return this.get(CONFIG.STORAGE_KEYS.THEME, 'light');
  }
}
