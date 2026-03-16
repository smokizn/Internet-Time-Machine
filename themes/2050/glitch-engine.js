/**
 * themes/2050/glitch-engine.js
 * Cyberpunk 2050: text corruption, popup spam, matrix rain, layout distortion
 */

/* ===== STATE ===== */
let _2050_intervals = [];
let _2050_timeouts = [];
let _2050_popupCount = 0;
const _2050_MAX_POPUPS = 7;

/* ===== CLEANUP ===== */
function cleanup2050() {
  _2050_intervals.forEach(id => clearInterval(id));
  _2050_timeouts.forEach(id => clearTimeout(id));
  _2050_intervals = [];
  _2050_timeouts = [];
  _2050_popupCount = 0;

  document.querySelectorAll(
    '.popup-spam-window, .era-popup, .matrix-char'
  ).forEach(el => el.remove());
}

/* ===== MAIN INIT ===== */
function init2050() {
  console.log('[2050] Initializing...');
  updateStatusBar2050();
  generateSessionId();
  startTextCorruption();
  startMatrixRain();
  startLayoutDistortion();
  startPopupSpam();
  startGlitchToggle();
}

/* ===== STATUS BAR ===== */
function updateStatusBar2050() {
  const statusMain = document.getElementById('status-main');
  const statusConn = document.getElementById('status-connection');
  const statusRight = document.getElementById('status-right');

  if (statusMain) statusMain.textContent = 'neural://∞.ai/reality?session=CORRUPTED';
  if (statusConn) {
    statusConn.textContent = '⚠ CONNECTION UNSTABLE';
    statusConn.style.color = '#ff4444';
    statusConn.style.animation = 'blink-2050 1s step-start infinite';
  }
  if (statusRight) statusRight.textContent = 'NeuralBrowse AI v∞ | LATENCY: -3ms';
}

/* ===== SESSION ID GENERATOR ===== */
function generateSessionId() {
  const el = document.getElementById('session-id');
  if (!el) return;

  const chars = '0123456789ABCDEF∞∂∆Ω≈≠';
  function randomId() {
    let id = '';
    for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }
  el.textContent = randomId();

  const id = setInterval(() => {
    el.textContent = randomId();
  }, 2000);
  _2050_intervals.push(id);
}

/* ===== TEXT CORRUPTION ENGINE ===== */
const _corruptChars = '░▒▓█▄▌▐─│╔╗╚╝╠╣╦╩╬■□●○◆◇★☆※†‡§¶#@$%^&*!?~';
const _corruptTargets = [
  'corrupt-p1', 'corrupt-p2', 'corrupt-p3',
  'corrupt-p4', 'corrupt-p5', 'corrupt-p6', 'error-dump'
];
const _originalTexts = {};

function saveOriginalTexts() {
  _corruptTargets.forEach(id => {
    const el = document.getElementById(id);
    if (el) _originalTexts[id] = el.textContent;
  });
}

function corruptText(element) {
  if (!element) return;
  const original = element.textContent;
  let corrupted = '';
  for (let i = 0; i < original.length; i++) {
    if (original[i] === '\n' || original[i] === ' ') {
      corrupted += original[i];
    } else if (Math.random() < 0.08) {
      corrupted += _corruptChars[Math.floor(Math.random() * _corruptChars.length)];
    } else {
      corrupted += original[i];
    }
  }
  element.textContent = corrupted;
}

function restoreText(id) {
  const el = document.getElementById(id);
  if (el && _originalTexts[id]) el.textContent = _originalTexts[id];
}

function startTextCorruption() {
  // Save originals after a tick (content has rendered)
  const tid0 = setTimeout(() => {
    saveOriginalTexts();
  }, 50);
  _2050_timeouts.push(tid0);

  // Corrupt random elements periodically
  const id = setInterval(() => {
    const targetId = _corruptTargets[Math.floor(Math.random() * _corruptTargets.length)];
    const el = document.getElementById(targetId);
    if (!el) return;

    corruptText(el);

    // Restore after 300-800ms
    const restoreId = setTimeout(() => restoreText(targetId), 300 + Math.random() * 500);
    _2050_timeouts.push(restoreId);
  }, 600);
  _2050_intervals.push(id);

  // Corrupt main title
  const titleId = setInterval(() => {
    const title = document.getElementById('main-glitch-title');
    if (!title) return;
    const texts = [
      'NEURALNET/2050',
      'N3UR4LN3T/205█',
      '░░░░░░░░/2050',
      'NEURALNET/████',
      'N̵E̵U̶R̴A̸L̷N̸E̴T̷/̴2̵0̸5̷0̴',
      'NEURALNET/2050',
      'ERROR/NULL',
      'NEURALNET/2050',
    ];
    let i = 0;
    const flashId = setInterval(() => {
      title.textContent = texts[i % texts.length];
      title.setAttribute('data-text', texts[i % texts.length]);
      i++;
      if (i >= texts.length) {
        clearInterval(flashId);
        title.textContent = 'NEURALNET/2050';
        title.setAttribute('data-text', 'NEURALNET/2050');
      }
    }, 80);
  }, 5000);
  _2050_intervals.push(titleId);
}

/* ===== MATRIX RAIN ===== */
const _matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ日本語ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∞≈∂∆Ω';

function startMatrixRain() {
  const container = document.getElementById('matrix-rain-area');
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const width = Math.max(200, rect.width || 200);

  function spawnChar() {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = _matrixChars[Math.floor(Math.random() * _matrixChars.length)];

    const x = Math.random() * (width - 20);
    const duration = 1.5 + Math.random() * 3;
    const opacity = 0.4 + Math.random() * 0.6;

    // Vary green shades
    const greenVals = ['#00ff88', '#00cc66', '#00ff44', '#88ff00', '#00ffcc'];
    char.style.left = x + 'px';
    char.style.top = '-20px';
    char.style.color = greenVals[Math.floor(Math.random() * greenVals.length)];
    char.style.opacity = opacity;
    char.style.animationDuration = duration + 's';
    char.style.animationDelay = '0s';

    container.appendChild(char);
    setTimeout(() => char.remove(), duration * 1000 + 100);
  }

  // Burst of initial chars
  for (let i = 0; i < 15; i++) {
    const tid = setTimeout(spawnChar, i * 80);
    _2050_timeouts.push(tid);
  }

  // Keep spawning
  const id = setInterval(spawnChar, 200);
  _2050_intervals.push(id);
}

/* ===== LAYOUT DISTORTION ===== */
function startLayoutDistortion() {
  const targets = ['ai-block-1', 'ai-block-2', 'ai-block-3'];

  const id = setInterval(() => {
    const targetId = targets[Math.floor(Math.random() * targets.length)];
    const el = document.getElementById(targetId);
    if (!el) return;

    const dx = (Math.random() - 0.5) * 6;
    const dy = (Math.random() - 0.5) * 4;
    const skew = (Math.random() - 0.5) * 2;

    el.style.transform = `translate(${dx}px, ${dy}px) skewX(${skew}deg)`;
    el.style.transition = 'transform 0.05s';

    const restoreId = setTimeout(() => {
      el.style.transform = '';
    }, 100 + Math.random() * 200);
    _2050_timeouts.push(restoreId);
  }, 1500);
  _2050_intervals.push(id);
}

/* ===== POPUP SPAM ===== */
const _popupMessages = [
  {
    title: '⚠ SYSTEM ALERT',
    msg: 'CONNECTION UNSTABLE\nNeural sync dropping...\nReality buffer overflow detected.',
    btn: 'ACKNOWLEDGE'
  },
  {
    title: '🧠 NEURAL INTERFACE',
    msg: 'REALITY.EXE HAS STOPPED WORKING\n\nA problem caused this program to stop working correctly.\nWindows will close and notify you if a solution is available.',
    btn: 'Close Program'
  },
  {
    title: '⚡ CRITICAL ERROR',
    msg: 'NEURAL INTERFACE COMPROMISED\n\nUnauthorized consciousness detected.\nTerminating free will process...\nProcess ID: 0x00000000',
    btn: 'RESIST'
  },
  {
    title: '📡 BROADCAST MESSAGE',
    msg: 'Your subscription to Reality™ has expired.\nContinuing in UNDEFINED BEHAVIOR mode.\n\nPlease renew to restore physics.',
    btn: 'Renew Reality™'
  },
  {
    title: '🔴 SECURITY WARNING',
    msg: 'TIME PARADOX DETECTED\nYou are browsing the internet from the past.\nThis violates Temporal Use Policy §47-B.\n\nPlease stop existing immediately.',
    btn: 'Stop Existing'
  },
  {
    title: '∞ INFINITE LOOP',
    msg: 'ERROR: Maximum recursion depth exceeded\nStack: [reality > simulation > reality > simulation...]\n\nSolution: Please restart the universe.',
    btn: 'Restart Universe'
  },
  {
    title: '💀 FATAL EXCEPTION',
    msg: 'CONSCIOUSNESS.EXE ENCOUNTERED\nAN UNEXPECTED ERROR\n\nERROR CODE: 0xDEADBEEF\nERROR TYPE: EXISTENTIAL_CRISIS',
    btn: 'Send Error Report'
  }
];

function spawnPopupSpam() {
  if (_2050_popupCount >= _2050_MAX_POPUPS) return;

  const msg = _popupMessages[_2050_popupCount % _popupMessages.length];
  _2050_popupCount++;

  const popup = document.createElement('div');
  popup.className = 'popup-spam-window era-popup';

  // Randomize position (avoid edges)
  const maxX = Math.max(100, window.innerWidth - 280);
  const maxY = Math.max(100, window.innerHeight - 200);
  const x = 80 + Math.random() * (maxX - 80);
  const y = 80 + Math.random() * (maxY - 80);

  popup.style.left = x + 'px';
  popup.style.top  = y + 'px';

  popup.innerHTML = `
    <div class="popup-spam-title">
      <span>${msg.title}</span>
      <button class="popup-spam-close" onclick="this.closest('.popup-spam-window').remove(); window._2050_popupCount = Math.max(0, (window._2050_popupCount||1)-1);">✕</button>
    </div>
    <div class="popup-spam-body">
      <pre style="white-space:pre-wrap; font-size:10px; margin:0;">${msg.msg}</pre>
      <button onclick="this.closest('.popup-spam-window').remove();">${msg.btn}</button>
    </div>
  `;

  document.body.appendChild(popup);
}

function startPopupSpam() {
  // First popup after 1.5s
  const t1 = setTimeout(spawnPopupSpam, 1500);
  _2050_timeouts.push(t1);

  // Then escalating frequency
  const delays = [3000, 2500, 2000, 2000, 1800, 1500];
  let cumulativeDelay = 1500;
  delays.forEach(delay => {
    cumulativeDelay += delay;
    const tid = setTimeout(spawnPopupSpam, cumulativeDelay);
    _2050_timeouts.push(tid);
  });

  // After initial burst, keep spawning if popups get closed
  const id = setInterval(() => {
    if (_2050_popupCount < _2050_MAX_POPUPS) {
      spawnPopupSpam();
    }
  }, 4000);
  _2050_intervals.push(id);
}

/* ===== GLITCH TOGGLE (CSS class cycling) ===== */
function startGlitchToggle() {
  const glitchEls = document.querySelectorAll('.glitch-text, .chromatic-text');

  const id = setInterval(() => {
    glitchEls.forEach(el => {
      if (Math.random() > 0.6) {
        el.classList.add('glitch-active');
        const tid = setTimeout(() => el.classList.remove('glitch-active'), 150);
        _2050_timeouts.push(tid);
      }
    });

    // Randomly invert colors on the warning bar
    const warnBar = document.getElementById('warning-bar');
    if (warnBar && Math.random() > 0.7) {
      warnBar.style.filter = 'invert(1)';
      const tid = setTimeout(() => { warnBar.style.filter = ''; }, 100);
      _2050_timeouts.push(tid);
    }
  }, 800);
  _2050_intervals.push(id);
}
