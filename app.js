/**
 * app.js - Internet Time Machine main application controller
 */
const App = {
  currentEra: null,
  validEras: ['1998', '2006', '2013', '2050'],

  init() {
    // Wire up era selector buttons
    document.querySelectorAll('.era-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const era = btn.dataset.era;
        if (era && this.validEras.includes(era)) {
          this.switchEra(era);
        }
      });
    });

    // Initialize router (reads hash and may trigger switchEra)
    Router.init();

    // If no hash is present, stay on welcome screen
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
      this._updateActiveButton(null);
    }
  },

  switchEra(era) {
    if (!this.validEras.includes(era)) {
      console.warn('[App] Unknown era:', era);
      return;
    }

    if (this.currentEra === era) return; // Already in this era

    console.log('[App] Switching to era:', era);
    this.currentEra = era;

    // Update URL hash (router will not re-fire if already set)
    Router.navigate(era);

    // Update the active button highlight
    this._updateActiveButton(era);

    // Update address bar
    const address = document.getElementById('address-bar');
    if (address) {
      const urls = {
        '1998': 'http://www.geocities.com/TimesSquare/Arena/7462/index.html',
        '2006': 'http://www.myspace.com/xXx_d4rk_s0ul_xXx',
        '2013': 'http://www.reddit.com/r/gaming/top/?t=all',
        '2050': 'neural://∞.ai/reality?session=corrupted&timestamp=ERROR'
      };
      address.value = urls[era] || 'http://internet-time-machine.com/';
    }

    // Load theme (CSS + JS + content)
    ThemeLoader.loadTheme(era);
  },

  _updateActiveButton(era) {
    document.querySelectorAll('.era-btn').forEach(btn => {
      if (btn.dataset.era === era) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
