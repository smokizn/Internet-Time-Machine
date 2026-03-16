/**
 * core/ui-engine.js - Renders era-specific HTML content into #era-content
 */
const UIEngine = {

  renderEraContent(era) {
    const container = document.getElementById('era-content');
    if (!container) return;

    const renderers = {
      '1998': this._render1998.bind(this),
      '2006': this._render2006.bind(this),
      '2013': this._render2013.bind(this),
      '2050': this._render2050.bind(this)
    };

    if (renderers[era]) {
      container.innerHTML = renderers[era]();
    }
  },

  _render1998() {
    return `
      <div class="era-content-1998">

        <!-- PAGE HEADER -->
        <div class="page-header-1998">
          <marquee class="marquee-header" behavior="scroll" direction="left">
            ★ WELCOME TO MY WEBSITE!!! ★ &nbsp;&nbsp;&nbsp; YOU ARE VISITOR #1,000,000!!! &nbsp;&nbsp;&nbsp;
            BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 AT 800x600 RESOLUTION &nbsp;&nbsp;&nbsp;
            ★ SIGN MY GUESTBOOK ★ &nbsp;&nbsp;&nbsp; FREE STUFF INSIDE!!! &nbsp;&nbsp;&nbsp;
          </marquee>
          <h1 class="main-title blink">★ WELCOME TO MY WEBSITE!!! ★</h1>
          <p class="subtitle blink-slow">Best viewed in Netscape Navigator 4.0 at 800x600</p>
          <p class="last-updated">Last Updated: November 7, 1998</p>
        </div>

        <!-- MAIN TABLE LAYOUT -->
        <div class="table-layout">

          <!-- LEFT COLUMN -->
          <div class="col-left">
            <div class="nav-box">
              <div class="nav-title">⭐ NAVIGATION ⭐</div>
              <ul class="nav-list">
                <li><a href="#">🏠 Home</a></li>
                <li><a href="#">📷 My Photos</a></li>
                <li><a href="#">🎵 My Music</a></li>
                <li><a href="#">💌 Guestbook</a></li>
                <li><a href="#">🔗 Cool Links</a></li>
                <li><a href="#">📧 Email Me</a></li>
              </ul>
            </div>

            <div class="hit-counter-box">
              <div class="hit-counter-label">You are visitor #</div>
              <div class="hit-counter" id="hit-counter">1000000</div>
              <img class="counter-gif animated-gif" src="" alt="[COUNTER]" />
            </div>

            <div class="web-ring-box">
              <div class="nav-title">🌐 WEB RING 🌐</div>
              <p style="font-size:10px; text-align:center;">
                [Prev] · [Next]<br/>
                GeoCities Web Ring<br/>
                Member Since 1997
              </p>
            </div>

            <div class="awards-box">
              <div class="nav-title">🏆 AWARDS</div>
              <div class="award-gif animated-gif star-spin"></div>
              <p style="font-size:9px; text-align:center;">Cool Site of the Day!<br/>5 Stars Award!</p>
              <div class="award-gif animated-gif star-spin2"></div>
            </div>
          </div>

          <!-- RIGHT / MAIN COLUMN -->
          <div class="col-main">

            <div class="under-construction">
              <span class="under-con-icon">🚧</span>
              <strong> UNDER CONSTRUCTION </strong>
              <span class="under-con-icon">🚧</span>
              <br/><small>This page is currently under construction. Please check back soon!</small>
            </div>

            <div class="content-box">
              <h2 class="section-title">👋 About Me</h2>
              <table class="profile-table" cellpadding="4" cellspacing="0">
                <tr>
                  <td class="profile-pic-cell">
                    <div class="profile-pic-placeholder animated-gif face-blink">
                      <span style="font-size:40px;">😊</span>
                    </div>
                    <p style="font-size:10px; text-align:center;">This is me!</p>
                  </td>
                  <td class="profile-info-cell">
                    <p><b>Name:</b> CoolDude1998</p>
                    <p><b>Age:</b> 15</p>
                    <p><b>Location:</b> Springfield, USA</p>
                    <p><b>Hobbies:</b> HTML, Rollerblading, Pokémon</p>
                    <p><b>Fav Band:</b> <span class="blink" style="color:red;">Backstreet Boys!!!</span></p>
                    <p><b>Email:</b> <a href="#">cooldude1998@hotmail.com</a></p>
                    <p style="margin-top:8px; font-size:11px; color: #800000;">
                      I made this site all by myself using Microsoft FrontPage!!! :)
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            <div class="content-box">
              <h2 class="section-title">🌟 My Favorite Things</h2>
              <ul class="favorites-list">
                <li>🎮 Video Games: <span class="blink" style="color:navy;">Ocarina of Time, StarCraft</span></li>
                <li>📺 TV Shows: Friends, The Simpsons, X-Files</li>
                <li>🎵 Music: Backstreet Boys, Spice Girls, Blink-182</li>
                <li>🍕 Food: Pizza, Doritos, Mountain Dew</li>
                <li>🌐 Websites: <a href="#">Yahoo!</a>, <a href="#">AltaVista</a>, <a href="#">Geocities</a></li>
              </ul>
            </div>

            <div class="content-box">
              <h2 class="section-title">✉️ Guestbook</h2>
              <div class="guestbook">
                <div class="guestbook-entry">
                  <strong class="gb-name">XxSkaterBoyxX</strong>
                  <span class="gb-date">Nov 3, 1998</span>
                  <p class="gb-msg">kewl site dude!!! i bookmarked it :) :) :)</p>
                </div>
                <div class="guestbook-entry">
                  <strong class="gb-name">princess_bubbles</strong>
                  <span class="gb-date">Oct 28, 1998</span>
                  <p class="gb-msg">OMG i love your site!!! the background is SO COOL!!! sign mine back plz!!!</p>
                </div>
                <div class="guestbook-entry">
                  <strong class="gb-name">h4x0r_d00d</strong>
                  <span class="gb-date">Oct 15, 1998</span>
                  <p class="gb-msg">1337 s1t3 m4n!!!! l33t h4x0r approved!!!</p>
                </div>
              </div>
              <div style="margin-top:8px;">
                <button class="netscape-button" onclick="alert('Guestbook temporarily unavailable. Please try again later.')">
                  ✏️ Sign My Guestbook!
                </button>
              </div>
            </div>

            <div class="content-box">
              <h2 class="section-title">🔗 Cool Links!!!</h2>
              <div class="cool-links">
                <a href="#" class="cool-link-btn netscape-button">Yahoo! Search</a>
                <a href="#" class="cool-link-btn netscape-button">AltaVista</a>
                <a href="#" class="cool-link-btn netscape-button">Geocities</a>
                <a href="#" class="cool-link-btn netscape-button">Netscape Download</a>
                <a href="#" class="cool-link-btn netscape-button">Ask Jeeves</a>
              </div>
            </div>

          </div>
        </div>

        <!-- PAGE FOOTER -->
        <div class="page-footer-1998">
          <p class="blink-slow">This page has been visited <strong class="blink">1,000,000</strong> times!</p>
          <p style="font-size:10px; margin-top:4px;">
            © 1998 CoolDude1998 · Made with ❤️ and Microsoft FrontPage 98<br/>
            Best viewed in Netscape Navigator 4.0 at 800x600 · Internet Explorer sux!!!
          </p>
          <div class="footer-badges">
            <div class="footer-badge">Netscape NOW!</div>
            <div class="footer-badge">Best in IE 4.0</div>
            <div class="footer-badge">GeoCities Member</div>
            <div class="footer-badge animated-gif star-spin3">★ AWARD ★</div>
          </div>
        </div>

      </div>
    `;
  },

  _render2006() {
    return `
      <div class="era-content-2006">
        <!-- MySpace-style header -->
        <div class="myspace-header">
          <marquee class="marquee-2006" scrollamount="3">
            ♥ myspace.com ♥ &nbsp;|&nbsp; 🎵 Now Playing: Linkin Park - Numb &nbsp;|&nbsp;
            xXx_d4rk_s0ul_xXx's Profile &nbsp;|&nbsp; ♥ Add Me ♥ &nbsp;|&nbsp;
            emo 4 lyfe &nbsp;|&nbsp; i &lt;3 music &nbsp;|&nbsp;
          </marquee>
        </div>

        <div class="profile-layout">

          <!-- LEFT SIDEBAR (profile info) -->
          <div class="profile-sidebar">
            <div class="profile-pic-frame">
              <div class="profile-pic-inner">
                <span style="font-size:50px; display:block; text-align:center; line-height:80px;">😈</span>
              </div>
              <div class="profile-pic-caption">xXx_d4rk_s0ul_xXx</div>
            </div>

            <div class="sidebar-box">
              <div class="sidebar-title">Contact Table</div>
              <div class="contact-grid">
                <button class="contact-btn">💌 Add</button>
                <button class="contact-btn">✉️ Message</button>
                <button class="contact-btn">🏆 Rank</button>
                <button class="contact-btn">🚫 Block</button>
              </div>
            </div>

            <div class="sidebar-box">
              <div class="sidebar-title">xXx_d4rk_s0ul_xXx's Details</div>
              <table class="details-table">
                <tr><td class="detail-label">Status:</td><td>Single 😔</td></tr>
                <tr><td class="detail-label">Age:</td><td>17</td></tr>
                <tr><td class="detail-label">Location:</td><td>New Jersey</td></tr>
                <tr><td class="detail-label">Sign:</td><td>Scorpio ♏</td></tr>
                <tr><td class="detail-label">Body:</td><td>Athletic</td></tr>
                <tr><td class="detail-label">Ethnicity:</td><td>Mixed</td></tr>
                <tr><td class="detail-label">Religion:</td><td>Agnostic</td></tr>
              </table>
            </div>

            <div class="sidebar-box">
              <div class="sidebar-title">xXx_d4rk_s0ul_xXx's Mood</div>
              <p class="mood-text">😔 Feeling: <em>misunderstood</em></p>
              <p class="mood-quote">"in the end it doesn't even matter..."</p>
            </div>

            <div class="sidebar-box">
              <div class="sidebar-title">xXx_d4rk_s0ul_xXx has <span class="friend-count-highlight">247</span> friends</div>
              <div class="top-friends">
                <div class="friend-thumb">😊<br/><span>b3stfr3nd</span></div>
                <div class="friend-thumb">😎<br/><span>sk8rboi</span></div>
                <div class="friend-thumb">🥰<br/><span>xoxo_lyly</span></div>
                <div class="friend-thumb">😈<br/><span>d3vilchld</span></div>
                <div class="friend-thumb">🎸<br/><span>guitrhero</span></div>
                <div class="friend-thumb">💀<br/><span>sk3lton5</span></div>
                <div class="friend-thumb">🌹<br/><span>r0s3_grl</span></div>
                <div class="friend-thumb">🎵<br/><span>lnkn_prk</span></div>
              </div>
            </div>
          </div>

          <!-- MAIN CONTENT AREA -->
          <div class="profile-main">

            <div class="music-player-bar" id="music-player-bar">
              <span class="music-note">♪</span>
              <span class="music-title">Now Playing: <strong>Linkin Park - Numb</strong></span>
              <div class="music-controls">
                <button class="music-btn" id="play-btn" onclick="window.playMelody && window.playMelody()">▶ Play</button>
                <button class="music-btn">⏹ Stop</button>
                <input type="range" min="0" max="100" value="80" style="width:60px;" />
                <span class="music-note">♫</span>
              </div>
            </div>

            <div class="profile-about emo-border">
              <h2 class="section-title-2006">About Me 😎</h2>
              <p>hey evry1!! im xXx_d4rk_s0ul_xXx but u can call me Tyler... or dont idc lol</p>
              <p>i luv music especially: <strong class="glitter-text">LINKIN PARK, MCR, FOB, Evanescence</strong></p>
              <p>im emo but not like REEALLY emo lol... just misunderstood u kno?</p>
              <p style="color:#ff69b4;">~~~if u wanna know me better just msg me~~~</p>
              <p class="marquee-2006-text">♥ music is my life ♥ &nbsp; ♥ emo 4ever ♥ &nbsp; ♥ myspace rulez ♥</p>
            </div>

            <div class="profile-about">
              <h2 class="section-title-2006">Who I'd Like to Meet</h2>
              <p>someone who gets me... ur music taste must be good lol</p>
              <p>gerard way... hayley williams... pete wentz... taylor swift (ok she's kinda mainstream but watever)</p>
            </div>

            <div class="bulletins-box emo-border">
              <h2 class="section-title-2006">📋 Bulletins</h2>
              <div class="bulletin-item">
                <span class="bull-user">sk8rboi:</span>
                <span class="bull-text">REPOST IF U LOVE UR FRIENDS OR UR A HEARTLESS MONSTER!!! 😤</span>
                <span class="bull-time">2 mins ago</span>
              </div>
              <div class="bulletin-item">
                <span class="bull-user">xoxo_lyly:</span>
                <span class="bull-text">omg who's coming to warped tour this summer?!?! reply if u r!!!</span>
                <span class="bull-time">15 mins ago</span>
              </div>
              <div class="bulletin-item">
                <span class="bull-user">d3vilchld:</span>
                <span class="bull-text">new pics up on photobucket!!! comment plz!!!</span>
                <span class="bull-time">1 hr ago</span>
              </div>
              <div class="bulletin-item">
                <span class="bull-user">MySpace:</span>
                <span class="bull-text">Tom has added you as a friend!</span>
                <span class="bull-time">forever ago</span>
              </div>
            </div>

            <div class="comments-section">
              <h2 class="section-title-2006">💬 Comments (<span class="friend-count-highlight">42</span>)</h2>
              <div class="comment-box-2006">
                <div class="comment-pic">😊</div>
                <div class="comment-content">
                  <div class="comment-user">b3stfr3nd</div>
                  <div class="comment-body">omgggg tyler u r so kewl luv ur profile layout!!!
                    come to my page later i put up new pics!!! ♥♥♥
                  </div>
                  <div class="comment-date">Nov 12, 2006 - 9:34 PM</div>
                </div>
              </div>
              <div class="comment-box-2006">
                <div class="comment-pic">😈</div>
                <div class="comment-content">
                  <div class="comment-user">d3vilchld</div>
                  <div class="comment-body">sup bro, linkin park concert was INSANE last nite!!!
                    we should have gone 2gether... nxt time 4 real
                  </div>
                  <div class="comment-date">Nov 11, 2006 - 11:47 PM</div>
                </div>
              </div>
              <div class="comment-box-2006">
                <div class="comment-pic">🌹</div>
                <div class="comment-content">
                  <div class="comment-user">r0s3_grl</div>
                  <div class="comment-body">hey stranger!!! u havent been on in 4ever!!! msg me!!!
                    p.s. ur new default is soooo cute omg 😍😍😍
                  </div>
                  <div class="comment-date">Nov 09, 2006 - 3:12 PM</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  _render2013() {
    return `
      <div class="era-content-2013">
        <!-- Reddit-style top bar -->
        <div class="reddit-topbar">
          <span class="reddit-logo">👽 internet time machine</span>
          <div class="reddit-nav">
            <a href="#" class="reddit-nav-link">front</a>
            <a href="#" class="reddit-nav-link">all</a>
            <a href="#" class="reddit-nav-link active-nav">r/InternetNostalgia</a>
            <a href="#" class="reddit-nav-link">r/gaming</a>
            <a href="#" class="reddit-nav-link">r/funny</a>
            <a href="#" class="reddit-nav-link">r/aww</a>
          </div>
          <div class="reddit-user">
            <span>logged in as: u/InternetTimeTraveler</span>
            <span class="karma-badge">karma: 31,337</span>
          </div>
        </div>

        <div class="content-2013-layout">

          <!-- MAIN FEED -->
          <div class="main-feed" id="meme-container">

            <!-- Meme post card 1 -->
            <div class="post-card">
              <div class="vote-col">
                <button class="vote-btn upvote-btn" data-vote="up" data-id="p1">▲</button>
                <div class="vote-count" id="vote-p1">2847</div>
                <button class="vote-btn downvote-btn" data-vote="down" data-id="p1">▼</button>
              </div>
              <div class="post-content">
                <div class="post-thumbnail">
                  <div class="meme-box">
                    <div class="meme-text meme-top">NOT SURE IF</div>
                    <div class="meme-face fry-face">🤔</div>
                    <div class="meme-text meme-bottom">OR JUST HUNGRY</div>
                  </div>
                </div>
                <div class="post-info">
                  <div class="post-title">Not sure if genius or just lucky [Futurama Fry]</div>
                  <div class="post-meta">
                    submitted 3 hours ago by <span class="post-user">xXFuturama_FanXx</span> to
                    <a href="#" class="subreddit-link">r/AdviceAnimals</a>
                    <span class="post-stats">| 847 comments | share | save | hide | report</span>
                  </div>
                  <div class="post-tags">
                    <span class="tag">meme</span>
                    <span class="tag">futurama</span>
                    <span class="tag">fry</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Meme post card 2 -->
            <div class="post-card">
              <div class="vote-col">
                <button class="vote-btn upvote-btn" data-vote="up" data-id="p2">▲</button>
                <div class="vote-count" id="vote-p2">5412</div>
                <button class="vote-btn downvote-btn" data-vote="down" data-id="p2">▼</button>
              </div>
              <div class="post-content">
                <div class="post-thumbnail">
                  <div class="meme-box">
                    <div class="meme-text meme-top">Y U NO</div>
                    <div class="meme-face yuno-face">😤</div>
                    <div class="meme-text meme-bottom">MAKE SENSE</div>
                  </div>
                </div>
                <div class="post-info">
                  <div class="post-title">Y U NO understand this meme?!</div>
                  <div class="post-meta">
                    submitted 1 hour ago by <span class="post-user">RageComicFan2013</span> to
                    <a href="#" class="subreddit-link">r/funny</a>
                    <span class="post-stats">| 312 comments | share | save</span>
                  </div>
                  <div class="post-tags">
                    <span class="tag">y u no</span>
                    <span class="tag">rage</span>
                    <span class="tag">lol</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rage comic post card -->
            <div class="post-card">
              <div class="vote-col">
                <button class="vote-btn upvote-btn" data-vote="up" data-id="p3">▲</button>
                <div class="vote-count" id="vote-p3">9001</div>
                <button class="vote-btn downvote-btn" data-vote="down" data-id="p3">▼</button>
              </div>
              <div class="post-content">
                <div class="post-thumbnail">
                  <div class="rage-box">
                    <div class="rage-panel">
                      <div class="rage-face forever-alone">😢</div>
                      <div class="rage-caption">Friday night alone... again</div>
                    </div>
                    <div class="rage-panel">
                      <div class="rage-face forever-alone">😭</div>
                      <div class="rage-caption">FOREVER ALONE</div>
                    </div>
                  </div>
                </div>
                <div class="post-info">
                  <div class="post-title">It's over 9000 upvotes! MFW I check my post</div>
                  <div class="post-meta">
                    submitted 45 minutes ago by <span class="post-user">forever_alone_guy</span> to
                    <a href="#" class="subreddit-link">r/ForeverAlone</a>
                    <span class="post-stats">| 9001 comments | share | save</span>
                  </div>
                  <div class="post-tags">
                    <span class="tag">forever alone</span>
                    <span class="tag">rage comic</span>
                    <span class="tag">9gag</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Text post -->
            <div class="post-card post-text-card">
              <div class="vote-col">
                <button class="vote-btn upvote-btn" data-vote="up" data-id="p4">▲</button>
                <div class="vote-count" id="vote-p4">1337</div>
                <button class="vote-btn downvote-btn" data-vote="down" data-id="p4">▼</button>
              </div>
              <div class="post-content">
                <div class="post-info" style="padding-left:0">
                  <div class="post-title">TIL that Harlem Shake has 1 billion YouTube views now. We did this.</div>
                  <div class="post-meta">
                    submitted 2 hours ago by <span class="post-user">til_bro</span> to
                    <a href="#" class="subreddit-link">r/todayilearned</a>
                    <span class="post-stats">| 4,201 comments | share | save</span>
                  </div>
                  <div class="post-tags">
                    <span class="tag">TIL</span>
                    <span class="tag">harlem shake</span>
                    <span class="tag">YouTube</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comment section -->
            <div class="comment-section-2013" id="comment-section">
              <h3 class="comment-section-title">💬 Top Comments</h3>
              <!-- populated by meme-engine.js -->
            </div>

            <!-- Loading spinner -->
            <div class="loading-memes" id="loading-memes">
              <div class="loading-spinner"></div>
              <p>Loading more memes...</p>
            </div>
          </div>

          <!-- SIDEBAR -->
          <div class="sidebar-2013">
            <div class="sidebar-widget">
              <div class="widget-title">r/InternetNostalgia</div>
              <p class="widget-desc">A community for people who miss the early internet. Upvote if you remember!</p>
              <div class="widget-stats">
                <div><strong>847,291</strong><br/><small>readers</small></div>
                <div><strong>3,412</strong><br/><small>here now</small></div>
              </div>
              <button class="flat-btn flat-btn-primary">Subscribe</button>
            </div>

            <div class="sidebar-widget">
              <div class="widget-title">Trending</div>
              <ul class="trending-list">
                <li><span class="trend-rank">1</span> Harlem Shake</li>
                <li><span class="trend-rank">2</span> Gangnam Style</li>
                <li><span class="trend-rank">3</span> Overly Attached GF</li>
                <li><span class="trend-rank">4</span> Success Kid</li>
                <li><span class="trend-rank">5</span> First World Problems</li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <div class="widget-title">Meme of the Day</div>
              <div class="motd-box">
                <div class="meme-text" style="font-size:14px;">ONE DOES NOT SIMPLY</div>
                <div style="font-size:30px; text-align:center; padding:8px;">🧙</div>
                <div class="meme-text" style="font-size:14px;">WALK INTO REDDIT</div>
              </div>
            </div>

            <div class="sidebar-widget">
              <div class="widget-title">Rules</div>
              <ol class="rules-list">
                <li>Be excellent to each other</li>
                <li>No reposts within 3 months</li>
                <li>All memes must be dank</li>
                <li>No Advice Mallard (it sucks)</li>
                <li>YOLO is not a meme</li>
              </ol>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  _render2050() {
    return `
      <div class="era-content-2050">
        <div class="noise-overlay"></div>

        <!-- Warning bar -->
        <div class="warning-bar" id="warning-bar">
          ⚠ CONNECTION UNSTABLE ⚠ &nbsp;&nbsp; NEURAL INTERFACE v7.3.1 &nbsp;&nbsp;
          ⚠ REALITY.EXE HAS STOPPED WORKING ⚠ &nbsp;&nbsp; REBOOTING CONSCIOUSNESS... &nbsp;&nbsp;
          ⚠ DATA CORRUPTION DETECTED ⚠
        </div>

        <!-- Glitch header -->
        <div class="glitch-header">
          <h1 class="glitch-text chromatic-text" data-text="NEURALNET/2050" id="main-glitch-title">
            NEURALNET/2050
          </h1>
          <p class="glitch-subtitle">AI-Curated Experience™ | Neural Session #<span id="session-id">ERR_NULL</span></p>
        </div>

        <!-- Main 2050 content grid -->
        <div class="content-2050-grid">

          <!-- AI generated content block 1 -->
          <div class="ai-content broken-layout" id="ai-block-1">
            <div class="ai-label">AI-GENERATED CONTENT v9.2 ░░░ CONFIDENCE: 34%</div>
            <h2 class="glitch-text" data-text="HELLO HUMAN FRIEND">HELLO HUMAN FRIEND</h2>
            <p class="corrupted-text" id="corrupt-p1">
              Welcome to the internet of 2050. Everything is fine. Your neural implant
              is working correctly. Please disregard any unusual sensations in your
              prefrontal cortex. The advertisements you are experiencing are MANDATORY.
            </p>
            <p class="corrupted-text" id="corrupt-p2">
              ░░█▄▌ ERROR: THOUGHT_PATTERN_MISMATCH ▌█░░ Your browsing history
              has been uploaded to ██████ servers. Consent was assumed. Thank you
              for your cooperation citizen #4471-DELTA.
            </p>
            <div class="glitch-divider"></div>
            <p class="corrupted-text" id="corrupt-p3">
              TODAY'S RECOMMENDED MEMORIES: [MEMORY_01: Childhood.exe - 72% authentic]
              [MEMORY_02: Vacation_2049 - FILE CORRUPTED] [MEMORY_03: ████ - CLASSIFIED]
            </p>
          </div>

          <!-- Matrix rain sidebar -->
          <div class="matrix-bg" id="matrix-container">
            <div class="matrix-rain-area" id="matrix-rain-area">
              <!-- matrix characters injected by JS -->
              <div class="matrix-static-text">
                <p>01001000 01000101 01001100 01001100 01001111</p>
                <p>ESTABLISHING NEURAL LINK...</p>
                <p>SYNC RATE: 94.7%</p>
                <p>BANDWIDTH: ∞ Tbps</p>
                <p>LATENCY: -3ms (TIME DEBT)</p>
                <p>████████████░░░░ 72%</p>
                <p>DECRYPTING REALITY...</p>
                <p>STATUS: <span class="blink-2050">UNDEFINED</span></p>
              </div>
            </div>
          </div>

          <!-- Broken layout blocks -->
          <div class="ai-content" id="ai-block-2">
            <div class="ai-label">FEED AGGREGATE // TIMESTAMP: [REDACTED]</div>
            <div class="feed-item-2050">
              <span class="feed-icon">⚡</span>
              <div>
                <p class="glitch-text" data-text="NEWS: SKY REPLACED WITH AD">NEWS: SKY REPLACED WITH AD</p>
                <small class="feed-meta">3 nanoseconds ago · SOURCE: ████ Corp Media</small>
              </div>
            </div>
            <div class="feed-item-2050">
              <span class="feed-icon">🧠</span>
              <div>
                <p class="corrupted-text" id="corrupt-p4">TRENDING: Everyone uploading consciousness to cloud — servers at 9,847% capacity</p>
                <small class="feed-meta">ERROR: TIMESTAMP INVALID · SOURCE: Collapsed Timeline C</small>
              </div>
            </div>
            <div class="feed-item-2050">
              <span class="feed-icon">⚠</span>
              <div>
                <p class="corrupted-text" id="corrupt-p5">ALERT: Your subscription to Reality™ expires in 3 days. Renew or experience UNDEFINED BEHAVIOR</p>
                <small class="feed-meta">PRIORITY: CRITICAL · ACTION: REQUIRED</small>
              </div>
            </div>
            <div class="feed-item-2050">
              <span class="feed-icon">🔴</span>
              <div>
                <p class="corrupted-text" id="corrupt-p6">███████ has liked your existence. Your social credit score increased by 0.003</p>
                <small class="feed-meta">47ms ago · Verified by Blockchain #∞</small>
              </div>
            </div>
          </div>

          <!-- Error/warning block -->
          <div class="ai-content error-block" id="ai-block-3">
            <div class="ai-label blink-2050">SYSTEM CRITICAL</div>
            <pre class="error-dump" id="error-dump">
KERNEL PANIC - not syncing: REALITY CORRUPTION
CPU: 0 PID: ∞ Comm: consciousness.exe NOT TAINTED
Hardware name: Dyson Sphere Node #4471
Call Trace:
 [&lt;∞ffffff&gt;] dump_stack+0x4e/0x72
 [&lt;∞ffffff&gt;] panic+0xd2/0x20b
 [&lt;ERROR  &gt;] free_will_check+0x???/0x???
 [&lt;∞ffffff&gt;] simulate_reality+0x18/0x1a
 [&lt;∞ffffff&gt;] universe_init+0x1c/0x20
---[ end Kernel panic ]---
REBOOTING IN 3... 2... 1...
REBOOT FAILED. CONTINUING ANYWAY.
            </pre>
          </div>

        </div>

        <!-- Infinite scroll indicator -->
        <div class="infinite-scroll-2050" id="infinite-scroll">
          <div class="loading-2050-bar">
            <div class="loading-2050-fill" id="loading-2050-fill"></div>
          </div>
          <p class="loading-2050-text">LOADING NEXT DIMENSION...</p>
        </div>

      </div>
    `;
  }
};
