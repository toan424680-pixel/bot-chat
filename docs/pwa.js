// ============================================
// PWA - Progressive Web App Support
// ============================================

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/bot-chat/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button
  const installBtn = document.createElement('button');
  installBtn.textContent = '📥 Cài đặt App';
  installBtn.className = 'btn-install';
  installBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    z-index: 1000;
    font-size: 14px;
  `;
  
  document.body.appendChild(installBtn);
  
  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted install prompt');
      } else {
        console.log('User dismissed install prompt');
      }
      deferredPrompt = null;
      installBtn.remove();
    });
  });
});

// App Installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  showNotification('✅ App đã được cài đặt thành công!');
});

// Online/Offline Detection
window.addEventListener('online', () => {
  console.log('Application is online');
  document.getElementById('botStatus').textContent = 'Online';
  document.getElementById('botStatus').style.color = '#4ade80';
  showNotification('✅ Kết nối internet được khôi phục');
});

window.addEventListener('offline', () => {
  console.log('Application is offline');
  document.getElementById('botStatus').textContent = 'Offline';
  document.getElementById('botStatus').style.color = '#ef4444';
  showNotification('⚠️ Không có kết nối internet');
});

// Check initial online status
if (!navigator.onLine) {
  document.getElementById('botStatus').textContent = 'Offline';
  document.getElementById('botStatus').style.color = '#ef4444';
}

// Background Sync (Simple implementation)
if ('serviceWorker' in navigator && 'SyncManager' in window) {
  async function registerBackgroundSync() {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('sync-chat-history');
      console.log('Background sync registered');
    } catch (error) {
      console.log('Background sync registration failed:', error);
    }
  }
  
  window.addEventListener('load', registerBackgroundSync);
}

// Notification Permission
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('ChatBot AI Pro', {
          body: 'Thông báo đã được bật!',
          icon: '🤖'
        });
      }
    });
  }
}

// Show notification
function showPushNotification(title, options = {}) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/bot-chat/icon-192x192.png',
      badge: '/bot-chat/badge-72x72.png',
      ...options
    });
  }
}

// Handle notification click
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NOTIFICATION_CLICK') {
      window.focus();
    }
  });
}

// Cache Management
const CACHE_NAME = 'chatbot-v1';
const URLS_TO_CACHE = [
  '/bot-chat/',
  '/bot-chat/index.html',
  '/bot-chat/styles.css',
  '/bot-chat/config.js',
  '/bot-chat/storage.js',
  '/bot-chat/api.js',
  '/bot-chat/translations.js',
  '/bot-chat/chatbot.js',
  '/bot-chat/ui.js',
  '/bot-chat/pwa.js',
  '/bot-chat/manifest.json'
];

async function cacheAssets() {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(URLS_TO_CACHE);
    console.log('Assets cached successfully');
  } catch (error) {
    console.log('Cache error:', error);
  }
}

// Call caching on load
window.addEventListener('load', cacheAssets);

// Request Performance Metrics
function capturePerformanceMetrics() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Performance:', entry.name, entry.duration);
        }
      });
      
      observer.observe({
        entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint']
      });
    } catch (error) {
      console.log('Performance observer error:', error);
    }
  }
}

window.addEventListener('load', capturePerformanceMetrics);

// Storage Quota
async function checkStorageQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    const percentUsed = (estimate.usage / estimate.quota) * 100;
    console.log(`Storage used: ${percentUsed.toFixed(2)}%`);
    
    if (percentUsed > 90) {
      showNotification('⚠️ Bộ nhớ sắp đầy!');
    }
  }
}

window.addEventListener('load', checkStorageQuota);

// Periodic Background Sync (For browser that support it)
async function registerPeriodicSync() {
  if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.periodicSync.register('update-crypto', {
        minInterval: 24 * 60 * 60 * 1000 // 24 hours
      });
      console.log('Periodic sync registered');
    } catch (error) {
      console.log('Periodic sync registration failed:', error);
    }
  }
}

window.addEventListener('load', registerPeriodicSync);

// Shared Target API (Share to app)
if ('shareTarget' in navigator) {
  // This would be handled by manifest.json
  console.log('Share Target API available');
}

// Payment Request API
function initiatePayment() {
  if ('PaymentRequest' in window) {
    const supportedInstruments = [
      {
        supportedMethods: 'basic-card',
        data: {
          supportedNetworks: ['visa', 'mastercard']
        }
      }
    ];
    
    const details = {
      total: {
        label: 'Total',
        amount: { currency: 'USD', value: '0.00' }
      }
    };
    
    // Payment request would be created here
    console.log('Payment Request API available');
  }
}

// Screen Orientation Lock
function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('portrait-primary').catch((error) => {
      console.log('Screen orientation lock failed:', error);
    });
  }
}

// Request permission on load
window.addEventListener('load', () => {
  requestNotificationPermission();
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App is hidden');
  } else {
    console.log('App is visible');
    // Sync data when app comes to foreground
    if (navigator.onLine) {
      checkStorageQuota();
    }
  }
});

// Beacon API for analytics
function sendAnalytics(data) {
  if (navigator.sendBeacon) {
    const url = '/api/analytics';
    navigator.sendBeacon(url, JSON.stringify(data));
  }
}

// Send analytics when user leaves
window.addEventListener('beforeunload', () => {
  sendAnalytics({
    messageCount: messageCount,
    sessionLength: Date.now() - sessionStartTime
  });
});

const sessionStartTime = Date.now();

// Vibration API
function vibrate(pattern = 200) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// Wake Lock API
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake lock acquired');
      
      document.addEventListener('visibilitychange', async () => {
        if (document.hidden) {
          wakeLock.release();
        } else {
          await navigator.wakeLock.request('screen');
        }
      });
    } catch (error) {
      console.log('Wake lock request failed:', error);
    }
  }
}

// Ambient Light Sensor API
function initAmbientLightSensor() {
  if ('AmbientLightSensor' in window) {
    const sensor = new AmbientLightSensor();
    
    sensor.addEventListener('reading', () => {
      const illuminance = sensor.illuminance;
      console.log('Ambient light:', illuminance);
      
      // Auto switch theme based on light level
      if (illuminance < 10) {
        if (Storage.getTheme() !== 'dark') {
          toggleTheme();
        }
      }
    });
    
    sensor.addEventListener('error', (event) => {
      console.log('Sensor error:', event.error);
    });
    
    try {
      sensor.start();
    } catch (error) {
      console.log('Ambient light sensor not available:', error);
    }
  }
}

// Initialize PWA features
window.addEventListener('load', () => {
  initAmbientLightSensor();
});

// Log PWA capabilities
console.log('PWA Features Available:');
console.log('- Service Worker:', 'serviceWorker' in navigator);
console.log('- Notifications:', 'Notification' in window);
console.log('- Cache API:', 'caches' in window);
console.log('- IndexedDB:', 'indexedDB' in window);
console.log('- Web Workers:', 'Worker' in window);
console.log('- Shared Workers:', 'SharedWorker' in window);
console.log('- Service Worker Container:', 'controller' in navigator.serviceWorker);
