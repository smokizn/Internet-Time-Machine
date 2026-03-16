/**
 * themes/2006/cursor-effects.js
 * MySpace-era: sparkles, music, hearts, welcome popup
 */

/* ===== STATE ===== */
let _2006_mouseMoveHandler = null;
let _2006_intervals = [];
let _2006_timeouts = [];
let _2006_audioCtx = null;
let _2006_melodyNodes = [];
let _2006_heartInterval = null;

/* ===== CLEANUP ===== */
function cleanup2006() {
  if (_2006_mouseMoveHandler) {
    document.removeEventListener('mousemove', _2006_mouseMoveHandler);
    _2006_mouseMoveHandler = null;
  }
  _2006_intervals.forEach(id => clearInterval(id));
  _2006_timeouts.forEach(id => clearTimeout(id));
  _2006_intervals = [];
  _2006_timeouts = [];

  if (_2006_heartInterval) {
    clearInterval(_2006_heartInterval);
    _2006_heartInterval = null;
  }

  if (_2006_audioCtx) {
    try { _2006_audioCtx.close(); } catch(e) {}
    _2006_audioCtx = null;
  }

  document.querySelectorAll(
    '.sparkle-particle, .heart-float, .popup-2006, .era-popup, .cursor-trail'
  ).forEach(el => el.remove());

  const musicBar = document.getElementById('injected-music-bar');
  if (musicBar) musicBar.remove();
}

/* ===== MAIN INIT ===== */
function init2006() {
  console.log('[2006] Initializing...');
  updateStatusBar2006();
  setupCursorSparkles();
  spawnHearts();

  const t1 = setTimeout(() => showWelcomePopup2006(), 600);
  _2006_timeouts.push(t1);

  createMusicPlayer();
}

/* ===== STATUS BAR ===== */
function updateStatusBar2006() {
  const statusMain = document.getElementById('status-main');
  const statusConn = document.getElementById('status-connection');
  const statusRight = document.getElementById('status-right');

  if (statusMain) statusMain.textContent = 'myspace.com/xXx_d4rk_s0ul_xXx';
  if (statusConn) statusConn.textContent = '🎵 Linkin Park - Numb';
  if (statusRight) statusRight.textContent = 'Internet Explorer 6.0';
}

/* ===== CURSOR SPARKLE TRAIL ===== */
function setupCursorSparkles() {
  const sparkleChars = ['★', '✦', '✧', '✩', '✪', '♥', '♦', '◆', '✿', '❀'];
  const colors = ['#ff00ff', '#ff69b4', '#00ffff', '#ffff00', '#ff8800', '#00ff88', '#8800ff'];

  let lastX = 0, lastY = 0;
  let sparkleThrottle = false;

  _2006_mouseMoveHandler = (e) => {
    if (sparkleThrottle) return;
    sparkleThrottle = true;
    setTimeout(() => { sparkleThrottle = false; }, 30);

    const dx = Math.abs(e.clientX - lastX);
    const dy = Math.abs(e.clientY - lastY);
    if (dx < 5 && dy < 5) return;
    lastX = e.clientX;
    lastY = e.clientY;

    // Create 2-3 sparkles
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle-particle';
      s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      s.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
      s.style.top  = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.fontSize = (10 + Math.random() * 10) + 'px';
      s.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  };

  document.addEventListener('mousemove', _2006_mouseMoveHandler);
}

/* ===== FLOATING HEARTS ===== */
function spawnHearts() {
  const heartEmojis = ['♥', '❤', '💕', '💖', '💗', '⭐', '★'];
  const colors2 = ['#ff00ff', '#ff69b4', '#ff0000', '#ff8888', '#ffffff'];

  function spawnOneHeart() {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = (10 + Math.random() * 80) + 'vw';
    h.style.top  = (60 + Math.random() * 30) + 'vh';
    h.style.color = colors2[Math.floor(Math.random() * colors2.length)];
    h.style.fontSize = (12 + Math.random() * 18) + 'px';
    h.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3500);
  }

  // Spawn a burst initially
  for (let i = 0; i < 8; i++) {
    const tid = setTimeout(spawnOneHeart, i * 150);
    _2006_timeouts.push(tid);
  }

  // Then keep spawning periodically
  _2006_heartInterval = setInterval(() => {
    spawnOneHeart();
    if (Math.random() > 0.6) spawnOneHeart();
  }, 1200);
  _2006_intervals.push(_2006_heartInterval);
}

/* ===== WEB AUDIO MELODY (8-bit style) ===== */
function playMelody() {
  try {
    if (!_2006_audioCtx) {
      _2006_audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (_2006_audioCtx.state === 'suspended') {
      _2006_audioCtx.resume();
    }
  } catch(e) {
    console.warn('[2006] Web Audio not available');
    return;
  }

  const ctx = _2006_audioCtx;

  // Stop any existing melody
  _2006_melodyNodes.forEach(node => {
    try { node.stop(); } catch(e) {}
  });
  _2006_melodyNodes = [];

  // Simple 8-bit inspired melody (Numb-ish progression, simplified)
  // Notes: frequencies in Hz
  const notes = [
    { freq: 293.66, dur: 0.25 }, // D4
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 220.00, dur: 0.25 }, // A3
    { freq: 220.00, dur: 0.25 }, // A3
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 293.66, dur: 0.25 }, // D4
    { freq: 349.23, dur: 0.25 }, // F4
    { freq: 440.00, dur: 0.50 }, // A4
    { freq: 392.00, dur: 0.25 }, // G4
    { freq: 349.23, dur: 0.25 }, // F4
    { freq: 329.63, dur: 0.50 }, // E4
    { freq: 293.66, dur: 0.25 }, // D4
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 220.00, dur: 1.00 }, // A3 (hold)
    { freq: 0,      dur: 0.25 }, // rest
    { freq: 261.63, dur: 0.25 }, // C4
    { freq: 293.66, dur: 0.25 }, // D4
    { freq: 329.63, dur: 0.25 }, // E4
    { freq: 392.00, dur: 0.50 }, // G4
    { freq: 440.00, dur: 0.25 }, // A4
    { freq: 493.88, dur: 0.50 }, // B4
    { freq: 440.00, dur: 1.00 }, // A4 (hold)
  ];

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.12;
  masterGain.connect(ctx.destination);

  let t = ctx.currentTime + 0.1;
  notes.forEach(note => {
    if (note.freq > 0) {
      const osc = ctx.createOscillator();
      const envGain = ctx.createGain();
      osc.connect(envGain);
      envGain.connect(masterGain);
      osc.type = 'square';
      osc.frequency.value = note.freq;
      envGain.gain.setValueAtTime(0, t);
      envGain.gain.linearRampToValueAtTime(1, t + 0.02);
      envGain.gain.setValueAtTime(1, t + note.dur - 0.03);
      envGain.gain.linearRampToValueAtTime(0, t + note.dur);
      osc.start(t);
      osc.stop(t + note.dur);
      _2006_melodyNodes.push(osc);
    }
    t += note.dur;
  });

  // Update play button
  const playBtn = document.getElementById('play-btn');
  if (playBtn) {
    playBtn.textContent = '⏸ Pause';
    const tid = setTimeout(() => {
      if (playBtn) playBtn.textContent = '▶ Play';
    }, t * 1000);
    _2006_timeouts.push(tid);
  }
}

/* Expose globally for the button onclick */
window.playMelody = playMelody;

/* ===== CREATE MUSIC PLAYER (if not in HTML) ===== */
function createMusicPlayer() {
  // The music player bar is already in the HTML via UIEngine.
  // This function can augment it or do additional setup.
  const bar = document.querySelector('.music-player-bar');
  if (!bar) {
    // inject one at the top of profile-main
    const main = document.querySelector('.profile-main');
    if (!main) return;
    const mp = document.createElement('div');
    mp.id = 'injected-music-bar';
    mp.className = 'music-player-bar';
    mp.innerHTML = `
      <span class="music-note">♪</span>
      <span class="music-title">Now Playing: <strong>Linkin Park - Numb</strong></span>
      <div class="music-controls">
        <button class="music-btn" onclick="window.playMelody && window.playMelody()">▶ Play</button>
        <button class="music-btn">⏹ Stop</button>
        <span class="music-note">♫</span>
      </div>
    `;
    main.prepend(mp);
  }
}

/* ===== WELCOME POPUP ===== */
function showWelcomePopup2006() {
  const popup = document.createElement('div');
  popup.className = 'popup-2006 era-popup';
  popup.innerHTML = `
    <div class="popup-2006-title">
      <span>✦ xXx_d4rk_s0ul_xXx ✦</span>
      <button class="popup-2006-close">✕</button>
    </div>
    <div class="popup-2006-body">
      <h2>OMG HI!!!</h2>
      <p>OMG OMG OMG welcome to my page!!! 💕</p>
      <p>ur so totally awesome for visiting!!!</p>
      <p style="color:#ff69b4; font-style:italic;">
        "in the end it doesn't even matter..."
      </p>
      <p style="font-size:11px; color:#888;">
        please sign my guestbook and leave a comment!!!<br/>
        add me as a friend if u think im kewl lol 😎
      </p>
      <button class="music-btn popup-play-song" style="margin:4px;">
        🎵 Play My Song
      </button>
      <button class="music-btn popup-close-bye" style="margin:4px;">
        💖 ok omg bye!
      </button>
    </div>
  `;

  popup.querySelector('.popup-2006-close').addEventListener('click', () => popup.remove());
  popup.querySelector('.popup-play-song').addEventListener('click', () => {
    if (typeof window.playMelody === 'function') window.playMelody();
  });
  popup.querySelector('.popup-close-bye').addEventListener('click', () => popup.remove());

  document.body.appendChild(popup);
}
