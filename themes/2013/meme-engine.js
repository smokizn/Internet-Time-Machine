/**
 * themes/2013/meme-engine.js
 * Reddit/9GAG era: rage comics, meme cards, voting, fake comments
 */

/* ===== CLEANUP ===== */
let _2013_intervals = [];
let _2013_timeouts = [];

function cleanup2013() {
  _2013_intervals.forEach(id => clearInterval(id));
  _2013_timeouts.forEach(id => clearTimeout(id));
  _2013_intervals = [];
  _2013_timeouts = [];

  document.querySelectorAll('.era-popup').forEach(el => el.remove());
}

/* ===== MAIN INIT ===== */
function init2013() {
  console.log('[2013] Initializing...');
  updateStatusBar2013();
  setupVoting();
  showLoadingSpinner();
  renderComments();
}

/* ===== STATUS BAR ===== */
function updateStatusBar2013() {
  const statusMain = document.getElementById('status-main');
  const statusConn = document.getElementById('status-connection');
  const statusRight = document.getElementById('status-right');

  if (statusMain) statusMain.textContent = 'reddit.com/r/InternetNostalgia';
  if (statusConn) statusConn.textContent = '👽 3,412 redditors here now';
  if (statusRight) statusRight.textContent = 'Chrome 30 · karma: 31,337';
}

/* ===== VOTING SYSTEM ===== */
const _voteState = {};

function setupVoting() {
  document.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', handleVote);
  });
}

function handleVote(e) {
  const btn = e.currentTarget;
  const id = btn.dataset.id;
  const dir = btn.dataset.vote; // 'up' or 'down'
  const countEl = document.getElementById('vote-' + id);
  if (!countEl) return;

  const prev = _voteState[id] || null;
  let count = parseInt(countEl.textContent.replace(/,/g, ''), 10) || 0;

  // Remove previous vote classes
  document.querySelectorAll(`[data-id="${id}"]`).forEach(b => b.classList.remove('voted'));

  if (prev === dir) {
    // Toggle off
    _voteState[id] = null;
    count += dir === 'up' ? -1 : 1;
  } else {
    // Apply new vote
    if (prev === 'up')   count--;
    if (prev === 'down') count++;
    _voteState[id] = dir;
    count += dir === 'up' ? 1 : -1;
    btn.classList.add('voted');
  }

  countEl.textContent = count.toLocaleString();

  // Flash effect
  countEl.style.transition = 'color 0.2s';
  countEl.style.color = dir === 'up' ? '#ff6314' : '#7193ff';
  const tid = setTimeout(() => {
    countEl.style.color = '';
  }, 400);
  _2013_timeouts.push(tid);
}

/* ===== LOADING SPINNER ===== */
function showLoadingSpinner() {
  const spinner = document.getElementById('loading-memes');
  if (!spinner) return;

  spinner.style.display = 'block';

  // After 2.5s reveal it's "done" and generate extra meme card
  const tid = setTimeout(() => {
    spinner.style.display = 'none';
    generateExtraMemeCard();
  }, 2500);
  _2013_timeouts.push(tid);
}

/* ===== GENERATE AN EXTRA MEME CARD ===== */
const _extraMemes = [
  {
    id: 'p5',
    topText: 'ONE DOES NOT SIMPLY',
    bottomText: 'SCROLL PAST THIS MEME',
    face: '🧙',
    faceClass: 'boromir-face',
    votes: 7294,
    user: 'Boromir_memes',
    sub: 'r/lotrmemes',
    title: 'One does not simply... make a bad LotR meme',
    tags: ['LOTR', 'one does not simply', 'boromir']
  },
  {
    id: 'p6',
    topText: 'SUCCESS KID',
    bottomText: 'GOT AN UPVOTE',
    face: '✊',
    faceClass: 'success-face',
    votes: 4201,
    user: 'success_kid_fan',
    sub: 'r/AdviceAnimals',
    title: 'Success Kid strikes again [OC]',
    tags: ['success kid', 'win', 'OC']
  },
  {
    id: 'p7',
    topText: 'OVERLY ATTACHED GF',
    bottomText: 'CHECKED YOUR PHONE 47 TIMES',
    face: '😍',
    faceClass: 'oag-face',
    votes: 3337,
    user: 'OAG_throwaway',
    sub: 'r/AdviceAnimals',
    title: "Overly Attached Girlfriend knows what she's doing",
    tags: ['OAG', 'overly attached', 'gf']
  }
];

let _extraMemeIdx = 0;

function generateExtraMemeCard() {
  const feed = document.getElementById('meme-container');
  if (!feed) return;

  const spinner = document.getElementById('loading-memes');
  const commentSection = document.getElementById('comment-section');
  const meme = _extraMemes[_extraMemeIdx % _extraMemes.length];
  _extraMemeIdx++;

  const card = document.createElement('div');
  card.className = 'post-card';
  card.style.animation = 'slide-in 0.3s ease-out';
  card.innerHTML = `
    <div class="vote-col">
      <button class="vote-btn upvote-btn" data-vote="up" data-id="${meme.id}">▲</button>
      <div class="vote-count" id="vote-${meme.id}">${meme.votes.toLocaleString()}</div>
      <button class="vote-btn downvote-btn" data-vote="down" data-id="${meme.id}">▼</button>
    </div>
    <div class="post-content">
      <div class="post-thumbnail">
        <div class="meme-box">
          <div class="meme-text meme-top">${meme.topText}</div>
          <div class="meme-face ${meme.faceClass}">${meme.face}</div>
          <div class="meme-text meme-bottom">${meme.bottomText}</div>
        </div>
      </div>
      <div class="post-info">
        <div class="post-title">${meme.title}</div>
        <div class="post-meta">
          submitted just now by <span class="post-user">${meme.user}</span> to
          <a href="#" class="subreddit-link">${meme.sub}</a>
          <span class="post-stats">| ${Math.floor(Math.random() * 500 + 50)} comments | share | save</span>
        </div>
        <div class="post-tags">
          ${meme.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  // Insert before comment section or at end
  if (commentSection) {
    feed.insertBefore(card, commentSection);
  } else {
    feed.appendChild(card);
  }

  // Wire up voting for new card
  card.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', handleVote);
  });

  // Show spinner again for "infinite scroll"
  if (spinner) {
    spinner.style.display = 'block';
    const tid = setTimeout(() => {
      spinner.style.display = 'none';
      if (_extraMemeIdx < _extraMemes.length) generateExtraMemeCard();
    }, 3500);
    _2013_timeouts.push(tid);
  }
}

/* ===== RENDER COMMENTS ===== */
const _era2013Comments = [
  {
    user: 'xXFuturama_FanXx',
    karma: '+1,847',
    text: "Not sure if this is the funniest thing I've seen today... or if I'm just really bored at work lol",
    replies: [
      { user: 'DeadpoolFanboy', karma: '+542', text: "Y U NO do actual work?" },
      { user: 'forever_alone_guy', karma: '+234', text: "I'm alone at home so I have no excuse... FOREVER ALONE" }
    ]
  },
  {
    user: 'GrammarNaziGuy',
    karma: '+934',
    text: "It's *you're* not *your*... sorry, I don't make the rules. Actually wait, I do make the rules. Rule 1: Y U NO use proper grammar.",
    replies: [
      { user: 'RageGuy2013', karma: '+127', text: "FUUUUUUUUUU" }
    ]
  },
  {
    user: 'IAmNotABot_Totally',
    karma: '+412',
    text: "Challenge accepted. I will now upvote everything on this page. My body is ready.",
    replies: []
  },
  {
    user: 'TrollfaceIRL',
    karma: '+2,001',
    text: "Problem? 😏 Came here from the front page. Worth it.",
    replies: [
      { user: 'LikeMindedIndividual', karma: '+88', text: "You, sir, are a gentleman and a scholar." },
      { user: 'NotSureIfTrolling', karma: '+67', text: "Not sure if serious... or trolling" }
    ]
  },
  {
    user: 'InstagramFilter_IRL',
    karma: '+156',
    text: "YOLO I upvoted this without even reading it. No ragrets.",
    replies: []
  }
];

function renderComments() {
  const section = document.getElementById('comment-section');
  if (!section) return;

  section.innerHTML = '<h3 class="comment-section-title">💬 Top Comments</h3>';

  _era2013Comments.forEach((comment, i) => {
    const tid = setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'comment-card';
      div.innerHTML = `
        <div class="comment-author">
          ${comment.user}
          <span class="comment-karma">${comment.karma} points</span>
        </div>
        <div class="comment-text">${comment.text}</div>
        <div class="comment-actions">
          <span onclick="this.textContent = 'permalinked!'">permalink</span>
          <span>embed</span>
          <span onclick="this.textContent = 'saved!'">save</span>
          <span onclick="this.textContent = 'reported! jk'">report</span>
          <span onclick="this.textContent = 'gifted!'">give gold</span>
        </div>
        ${comment.replies.map(r => `
          <div class="comment-card" style="margin-top:6px; border-left-color:#d8d8d8;">
            <div class="comment-author">
              ${r.user}
              <span class="comment-karma">${r.karma} points</span>
            </div>
            <div class="comment-text">${r.text}</div>
            <div class="comment-actions">
              <span>permalink</span>
              <span>save</span>
            </div>
          </div>
        `).join('')}
      `;
      section.appendChild(div);
    }, i * 300);
    _2013_timeouts.push(tid);
  });
}
