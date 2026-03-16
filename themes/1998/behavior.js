/**
 * themes/1998/behavior.js
 * Dial-up era behaviors: sounds, popups, slow loading simulation
 */

/* ===== CLEANUP ===== */
let _1998_intervals = [];
let _1998_timeouts = [];
let _1998_audioCtx = null;

function cleanup1998() {
  _1998_intervals.forEach(id => clearInterval(id));
  _1998_timeouts.forEach(id => clearTimeout(id));
  _1998_intervals = [];
  _1998_timeouts = [];

  if (_1998_audioCtx) {
    try { _1998_audioCtx.close(); } catch(e) {}
    _1998_audioCtx = null;
  }

  document.querySelectorAll('.visitor-popup, .era-popup').forEach(el => el.remove());

  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('visible');
}

/* ===== MAIN INIT ===== */
function init1998() {
  console.log('[1998] Initializing...');
  updateStatusBar1998();
  showDialupScreen();
}

/* ===== DIAL-UP SOUND (Web Audio API) ===== */
function createAudioContext() {
  if (!_1998_audioCtx) {
    try {
      _1998_audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {
      console.warn('[1998] Web Audio not available');
    }
  }
  return _1998_audioCtx;
}

function playTone(frequency, startTime, duration, type, gainValue, ctx, destination) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.connect(gainNode);
  gainNode.connect(destination);

  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gainValue || 0.3, startTime + 0.02);
  gainNode.gain.setValueAtTime(gainValue || 0.3, startTime + duration - 0.02);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playDialupSound() {
  const ctx = createAudioContext();
  if (!ctx) return;

  // Resume context if suspended (autoplay policy)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const dest = ctx.destination;
  const now = ctx.currentTime;

  // --- Phase 1: Dial tone (0.0 - 0.8s)
  playTone(440, now + 0.0, 0.4, 'sine', 0.25, ctx, dest);
  playTone(350, now + 0.0, 0.4, 'sine', 0.2, ctx, dest);

  // --- Phase 2: DTMF-like dialing tones (0.8 - 3s)
  const dtmf = [
    [697, 1209], [770, 1336], [697, 1477], [770, 1209],
    [852, 1336], [697, 1209], [770, 1477], [852, 1209],
    [941, 1336], [697, 1209], [770, 1336]
  ];
  dtmf.forEach((pair, i) => {
    const t = now + 0.8 + i * 0.2;
    playTone(pair[0], t, 0.12, 'square', 0.15, ctx, dest);
    playTone(pair[1], t, 0.12, 'square', 0.12, ctx, dest);
  });

  // --- Phase 3: Handshake screeches (3.0 - 5.5s)
  const handshakeFreqs = [2100, 1300, 2100, 900, 1700, 2400, 800, 2100];
  handshakeFreqs.forEach((freq, i) => {
    const t = now + 3.0 + i * 0.32;
    playTone(freq, t, 0.28, 'sawtooth', 0.25, ctx, dest);
    // Layer some noise-like overtones
    playTone(freq * 1.5, t + 0.01, 0.25, 'square', 0.08, ctx, dest);
  });

  // --- Phase 4: Data negotiation noise (5.5 - 8s)
  let t = now + 5.5;
  for (let i = 0; i < 20; i++) {
    const freq = 800 + Math.random() * 1800;
    const dur = 0.05 + Math.random() * 0.1;
    playTone(freq, t, dur, 'square', 0.2, ctx, dest);
    t += dur + Math.random() * 0.05;
  }

  // --- Phase 5: Connected carrier tone (8 - 10s)
  playTone(2100, now + 8.0, 2.0, 'sine', 0.15, ctx, dest);
  playTone(1200, now + 8.2, 1.8, 'sine', 0.15, ctx, dest);

  return 10000; // approximate duration in ms
}

/* ===== DIAL-UP LOADING SCREEN ===== */
function showDialupScreen() {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;

  const ascii = document.getElementById('loading-ascii');
  const title = document.getElementById('loading-title');
  const fill = document.getElementById('loading-progress-fill');
  const statusText = document.getElementById('loading-status-text');

  if (ascii) {
    ascii.textContent = `
   ____  _       _     _   _
  |  _ \\(_) __ _| |   | | | |_ __
  | | | | |/ _\` | |   | | | | '_ \\
  | |_| | | (_| | |___| |_| | |_) |
  |____/|_|\\__,_|_____\\___/| .__/
                            |_|

  ╔══════════════════════════════════════╗
  ║    CONNECTING TO THE INTERNET...     ║
  ║                                      ║
  ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░  ║
  ║                                      ║
  ║  Baud Rate: 56,000 bps               ║
  ║  Protocol: V.90                      ║
  ╚══════════════════════════════════════╝
    `;
  }

  if (title) title.textContent = 'DIALING UP...';
  if (fill) fill.style.width = '0%';
  if (statusText) statusText.textContent = 'Picking up the phone line...';

  overlay.classList.add('visible');

  const steps = [
    { pct: 10, text: 'Dialing... *BEEEEEP*', delay: 800 },
    { pct: 20, text: 'ATDT 555-0123... dialing...', delay: 1600 },
    { pct: 30, text: 'CONNECT 56000', delay: 2600 },
    { pct: 45, text: 'Negotiating protocols...', delay: 4000 },
    { pct: 60, text: 'Authenticating with ISP...', delay: 5500 },
    { pct: 70, text: 'Obtaining IP address...', delay: 6500 },
    { pct: 80, text: 'Loading page... (please wait)', delay: 7500 },
    { pct: 90, text: 'Almost there...', delay: 8500 },
    { pct: 100, text: 'CONNECTED! Welcome to the Internet!', delay: 9200 }
  ];

  steps.forEach(step => {
    const tid = setTimeout(() => {
      if (fill) fill.style.width = step.pct + '%';
      if (statusText) statusText.textContent = step.text;
    }, step.delay);
    _1998_timeouts.push(tid);
  });

  // Play dial-up sound
  const duration = playDialupSound() || 10000;

  // Hide overlay after connection
  const hideId = setTimeout(() => {
    hideDialupScreen();
    // Show visitor popup after a short delay
    const popupId = setTimeout(() => showVisitorPopup(), 500);
    _1998_timeouts.push(popupId);
    // Start blinking
    makeTextBlink();
    // Simulate slow image loading
    simulateSlowLoading();
  }, duration);
  _1998_timeouts.push(hideId);
}

function hideDialupScreen() {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.style.transition = 'opacity 0.5s';
  overlay.style.opacity = '0';
  const tid = setTimeout(() => {
    overlay.classList.remove('visible');
    overlay.style.opacity = '1';
    overlay.style.transition = '';
  }, 500);
  _1998_timeouts.push(tid);
}

/* ===== BLINKING TEXT ===== */
function makeTextBlink() {
  // CSS handles blinking via .blink class — this JS version adds extra elements
  document.querySelectorAll('.section-title').forEach((el, i) => {
    const tid = setTimeout(() => {
      el.style.animation = 'blink-slow 1.5s ease-in-out infinite';
    }, i * 100);
    _1998_timeouts.push(tid);
  });
}

/* ===== VISITOR POPUP ===== */
function showVisitorPopup() {
  // Remove any existing popup
  const existing = document.querySelector('.visitor-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.className = 'visitor-popup era-popup';
  popup.innerHTML = `
    <div class="visitor-popup-titlebar">
      <span>🎉 Congratulations!</span>
      <button class="visitor-popup-close" onclick="this.closest('.visitor-popup').remove()">✕</button>
    </div>
    <div class="visitor-popup-body">
      <h2 class="blink">🎉 CONGRATULATIONS! 🎉</h2>
      <p style="font-size:16px; color:#ff0000; font-weight:bold; animation: blink 0.5s step-start infinite;">
        YOU ARE THE<br/>
        <span style="font-size:28px; color:#0000ff;">1,000,000th</span><br/>
        VISITOR!!!
      </p>
      <p>You have won a <strong>FREE iPod</strong> and <strong>$1,000,000</strong>!!!</p>
      <p style="font-size:10px; color:#808080;">(Click OK to claim your prize. Credit card required.)</p>
      <div>
        <button class="netscape-button"
          onclick="alert('ERROR: Prize unavailable in your area.\\n\\nPlease try again in 1999.'); this.closest(\\'.visitor-popup\\').remove();">
          🎁 CLAIM PRIZE!
        </button>
        <button class="netscape-button"
          onclick="alert('Are you sure? You might miss out!'); this.closest(\\'.visitor-popup\\').remove();">
          Cancel
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

/* ===== STATUS BAR UPDATE ===== */
function updateStatusBar1998() {
  const statusMain = document.getElementById('status-main');
  const statusConn = document.getElementById('status-connection');
  const statusRight = document.getElementById('status-right');

  if (statusMain) statusMain.textContent = 'Document: Done';
  if (statusConn) statusConn.textContent = '🔗 Connected at 56,000 bps';
  if (statusRight) statusRight.textContent = 'IP: 204.17.239.12';

  // Periodically update "status" messages
  const messages = [
    'Document: Done',
    'Contacting server: www.geocities.com...',
    'Waiting for reply...',
    'Document: Done',
    'Downloading image (34 of 47)...',
    'Document: Done',
    'Opening page: http://www.geocities.com/...',
    'Document: Done'
  ];
  let idx = 0;
  const id = setInterval(() => {
    idx = (idx + 1) % messages.length;
    if (statusMain) statusMain.textContent = messages[idx];
  }, 4000);
  _1998_intervals.push(id);
}

/* ===== SLOW IMAGE LOADING SIMULATION ===== */
function simulateSlowLoading() {
  const imgs = document.querySelectorAll('.animated-gif, .profile-pic-placeholder');
  imgs.forEach((img, i) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s';
    const tid = setTimeout(() => {
      img.style.opacity = '1';
    }, 500 + i * 800);
    _1998_timeouts.push(tid);
  });
}
