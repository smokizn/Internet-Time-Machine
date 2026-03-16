/**
 * core/theme-loader.js - Dynamically loads CSS and JS for each era
 */
const ThemeLoader = {
  _currentCssLink: null,
  _currentScript: null,
  _currentEra: null,

  // Browser chrome configs per era
  _chromeConfig: {
    '1998': {
      name: 'Netscape Navigator 4.0',
      logo: '🔮',
      bgColor: '#d4d0c8',
      borderColor: '#808080',
      textColor: '#000080',
      btnStyle: 'border: 2px outset #ffffff; background: #d4d0c8;'
    },
    '2006': {
      name: 'Internet Explorer 6.0',
      logo: '🌐',
      bgColor: '#d4d0c8',
      borderColor: '#0050a0',
      textColor: '#0050a0',
      btnStyle: 'border: 2px outset #ffffff; background: #d4d0c8;'
    },
    '2013': {
      name: 'Google Chrome 30',
      logo: '⬤',
      bgColor: '#f1f3f4',
      borderColor: '#dadce0',
      textColor: '#202124',
      btnStyle: 'border: 1px solid #dadce0; background: #f1f3f4; border-radius: 50%;'
    },
    '2050': {
      name: 'NeuralBrowse AI v∞',
      logo: '🧠',
      bgColor: '#050510',
      borderColor: '#00ffcc',
      textColor: '#00ffcc',
      btnStyle: 'border: 1px solid #00ffcc; background: #050510; color: #00ffcc;'
    }
  },

  loadTheme(era) {
    console.log('[ThemeLoader] Loading theme for era:', era);

    // Clean up previous theme artifacts
    this._cleanup();

    // Load new CSS
    this._loadCSS(era);

    // Update browser chrome immediately
    this.updateBrowserChrome(era);

    // Render content
    if (typeof UIEngine !== 'undefined') {
      UIEngine.renderEraContent(era);
    }

    // Load JS and run init function after a short delay
    // (to let CSS paint and content render)
    setTimeout(() => {
      this._loadJS(era);
    }, 100);

    this._currentEra = era;
  },

  _loadCSS(era) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `themes/${era}/styles.css`;
    link.id = `theme-css-${era}`;
    document.head.appendChild(link);
    this._currentCssLink = link;
  },

  _loadJS(era) {
    // Remove old script
    if (this._currentScript) {
      this._currentScript.remove();
      this._currentScript = null;
    }

    const scriptFiles = {
      '1998': 'behavior.js',
      '2006': 'cursor-effects.js',
      '2013': 'meme-engine.js',
      '2050': 'glitch-engine.js'
    };

    const file = scriptFiles[era];
    if (!file) return;

    const script = document.createElement('script');
    script.src = `themes/${era}/${file}`;
    script.id = `theme-js-${era}`;
    script.onload = () => {
      // Call the era init function
      const initFns = {
        '1998': 'init1998',
        '2006': 'init2006',
        '2013': 'init2013',
        '2050': 'init2050'
      };
      const fnName = initFns[era];
      if (fnName && typeof window[fnName] === 'function') {
        console.log('[ThemeLoader] Calling', fnName);
        window[fnName]();
      }
    };
    script.onerror = () => {
      console.error('[ThemeLoader] Failed to load script for era:', era);
    };
    document.body.appendChild(script);
    this._currentScript = script;
  },

  _cleanup() {
    // Remove old CSS
    if (this._currentCssLink) {
      this._currentCssLink.remove();
      this._currentCssLink = null;
    }
    // Remove old script
    if (this._currentScript) {
      this._currentScript.remove();
      this._currentScript = null;
    }

    // Call cleanup functions for previous era
    const cleanupFns = {
      '1998': 'cleanup1998',
      '2006': 'cleanup2006',
      '2013': 'cleanup2013',
      '2050': 'cleanup2050'
    };
    if (this._currentEra) {
      const fn = cleanupFns[this._currentEra];
      if (fn && typeof window[fn] === 'function') {
        window[fn]();
      }
    }

    // Remove any era-injected popups / overlays
    document.querySelectorAll(
      '.era-popup, .sparkle-particle, .heart-float, .matrix-char, .popup-spam-window, .cursor-trail'
    ).forEach(el => el.remove());

    // Reset status bar
    const statusMain = document.getElementById('status-main');
    if (statusMain) statusMain.textContent = 'Internet Time Machine v1.0';
    const statusConn = document.getElementById('status-connection');
    if (statusConn) statusConn.textContent = 'Ready';
    const statusRight = document.getElementById('status-right');
    if (statusRight) statusRight.textContent = '';

    // Hide loading overlay
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.remove('visible');
  },

  updateBrowserChrome(era) {
    const config = this._chromeConfig[era];
    if (!config) return;

    const chrome = document.getElementById('browser-chrome');
    const browserName = document.getElementById('browser-name');
    const browserLogo = document.getElementById('browser-logo');

    if (chrome) {
      chrome.style.background = config.bgColor;
      chrome.style.borderBottomColor = config.borderColor;
    }
    if (browserName) {
      browserName.textContent = config.name;
      browserName.style.color = config.textColor;
    }
    if (browserLogo) {
      browserLogo.textContent = config.logo;
    }

    // Style nav buttons
    document.querySelectorAll('#browser-chrome .chrome-btn').forEach(btn => {
      btn.style.cssText = config.btnStyle;
      btn.style.color = config.textColor;
    });
  }
};
