// ============================================
// API - External API Integration
// ============================================

class API {
  // Google Gemini AI
  static async getAIResponse(message) {
    try {
      if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY.includes('_key')) {
        return 'Xin lỗi, API key chưa được cấu hình. Vui lòng thêm Google Gemini API key vào config.js'; // Fallback
      }

      const response = await fetch(
        `${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
          })
        }
      );

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời.';
    } catch (error) {
      console.error('AI API Error:', error);
      return 'Xin lỗi, có lỗi khi kết nối với AI. Vui lòng thử lại sau.';
    }
  }

  // Weather API
  static async getWeather(city = 'Hanoi') {
    try {
      if (!CONFIG.WEATHER_API_KEY || CONFIG.WEATHER_API_KEY.includes('key')) {
        return null; // API key not configured
      }

      const response = await fetch(
        `${CONFIG.WEATHER_API_URL}?q=${city}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error('Weather API Error');

      const data = await response.json();
      return {
        city: data.name,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: this.getWeatherIcon(data.weather[0].main),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed)
      };
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }

  static getWeatherIcon(weatherType) {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️'
    };
    return icons[weatherType] || '🌤️';
  }

  // Crypto Prices
  static async getCryptoPrices(coins = ['bitcoin', 'ethereum', 'cardano']) {
    try {
      const ids = coins.join(',');
      const response = await fetch(
        `${CONFIG.CRYPTO_API_URL}?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`
      );

      if (!response.ok) throw new Error('Crypto API Error');

      const data = await response.json();
      const result = [];

      for (const coin in data) {
        result.push({
          name: coin.charAt(0).toUpperCase() + coin.slice(1),
          symbol: this.getCryptoSymbol(coin),
          price: '$' + data[coin].usd.toFixed(2),
          marketCap: data[coin].usd_market_cap ? '$' + (data[coin].usd_market_cap / 1e9).toFixed(2) + 'B' : 'N/A'
        });
      }

      return result;
    } catch (error) {
      console.error('Crypto API Error:', error);
      return null;
    }
  }

  static getCryptoSymbol(coin) {
    const symbols = {
      'bitcoin': '₿',
      'ethereum': 'Ξ',
      'cardano': '₳',
      'ripple': 'XRP',
      'litecoin': 'Ł'
    };
    return symbols[coin] || coin.toUpperCase();
  }

  // Translate (using free translation API)
  static async translate(text, targetLanguage = 'en') {
    try {
      const response = await fetch('https://api.mymemory.translated.net/get', {
        method: 'GET',
        url: `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${targetLanguage}`
      });

      // For simplicity, we'll return the original text
      // In production, use a proper translation API
      return text;
    } catch (error) {
      console.error('Translation Error:', error);
      return text;
    }
  }

  // Speech to Text
  static startSpeechRecognition(callback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      callback(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  }

  // Text to Speech
  static speak(text, lang = 'vi-VN') {
    if (!('speechSynthesis' in window)) {
      console.error('Text-to-speech not supported');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // Search (using Google Search - requires CORS proxy or backend)
  static async search(query) {
    try {
      // Note: Direct Google Search from frontend requires backend or CORS proxy
      // For now, we'll return a simple result
      console.log('Search query:', query);
      return `Kết quả tìm kiếm cho: ${query}`;
    } catch (error) {
      console.error('Search Error:', error);
      return null;
    }
  }
}
