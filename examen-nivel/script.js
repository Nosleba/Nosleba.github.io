/**
 * ============================================================
 *  ENGLISH PLACEMENT TEST FOR KIDS — script.js
 *  Features: All 35 questions, SpeechSynthesis, localStorage,
 *            progress bar, animated cards, score ring, confetti
 * ============================================================
 */

/* ─────────────────────────────────────────────────────────────
   1. QUESTION DATA
───────────────────────────────────────────────────────────── */

/** Reading passages (shown above related questions) */
const PASSAGES = {
  lucy: `"Hello! My name is Lucy. I am 9 years old. I live in Peru with my parents and my little brother. I like reading books and playing volleyball after school."`,
  david: `"David wakes up at 7:00 every morning. He eats breakfast with his family and goes to school by bus. His favorite subject is science because he likes learning about animals and plants."`
};

/** Full question bank */
const QUESTIONS = [
  /* ── SECTION 1: GRAMMAR (15) ── */
  { section:"Grammar",    q:'My name ___ Anna.',                         opts:['am','is','are'],                                                          ans:'is'  },
  { section:"Grammar",    q:'They ___ students.',                        opts:['is','are','am'],                                                          ans:'are' },
  { section:"Grammar",    q:'She ___ to school every day.',              opts:['go','goes','going'],                                                       ans:'goes'},
  { section:"Grammar",    q:'I ___ a sandwich for lunch.',               opts:['eat','eats','eating'],                                                     ans:'eat' },
  { section:"Grammar",    q:'___ you like ice cream?',                   opts:['Does','Are','Do'],                                                         ans:'Do'  },
  { section:"Grammar",    q:'He ___ soccer after school.',               opts:['plays','play','playing'],                                                  ans:'plays'},
  { section:"Grammar",    q:'There ___ a dog in the garden.',            opts:['are','is','am'],                                                           ans:'is'  },
  { section:"Grammar",    q:'We ___ English on Mondays.',                opts:['study','studies','studying'],                                              ans:'study'},
  { section:"Grammar",    q:'My father is ___ engineer.',                opts:['a','an','the'],                                                            ans:'an'  },
  { section:"Grammar",    q:'I can ___ very fast.',                      opts:['runs','running','run'],                                                    ans:'run' },
  { section:"Grammar",    q:'The cat is ___ the table.',                 opts:['on','in','under'],                                                         ans:'under'},
  { section:"Grammar",    q:'She ___ happy today.',                      opts:['are','is','be'],                                                           ans:'is'  },
  { section:"Grammar",    q:'Yesterday we ___ to the park.',             opts:['go','went','going'],                                                       ans:'went'},
  { section:"Grammar",    q:'These ___ my books.',                       opts:['is','are','am'],                                                           ans:'are' },
  { section:"Grammar",    q:'Tom and Sam ___ brothers.',                 opts:['is','are','be'],                                                           ans:'are' },

  /* ── SECTION 2: VOCABULARY (8) ── */
  { section:"Vocabulary", q:'Which word is a color?',                    opts:['Apple','Blue','Chair'],                                                    ans:'Blue'   },
  { section:"Vocabulary", q:"Which animal says 'meow'?",                 opts:['Dog','Bird','Cat'],                                                        ans:'Cat'    },
  { section:"Vocabulary", q:'Which one is a fruit?',                     opts:['Banana','Carrot','Bread'],                                                 ans:'Banana' },
  { section:"Vocabulary", q:'Where do students study?',                  opts:['Hospital','School','Airport'],                                             ans:'School' },
  { section:"Vocabulary", q:"Which word means mother's son?",            opts:['Brother','Sister','Uncle'],                                                ans:'Brother'},
  { section:"Vocabulary", q:'Which one is used for writing?',            opts:['Pencil','Plate','Shoe'],                                                   ans:'Pencil' },
  { section:"Vocabulary", q:'Which activity is a hobby?',                opts:['Swimming','Sleeping','Eating'],                                            ans:'Swimming'},
  { section:"Vocabulary", q:'Which one is a drink?',                     opts:['Rice','Juice','Sandwich'],                                                 ans:'Juice'  },

  /* ── SECTION 3: READING — Lucy (3) ── */
  { section:"Reading", passage:"lucy", q:'How old is Lucy?',                         opts:['8','9','10'],                                                             ans:'9'             },
  { section:"Reading", passage:"lucy", q:'Where does Lucy live?',                    opts:['Brazil','Mexico','Peru'],                                                  ans:'Peru'          },
  { section:"Reading", passage:"lucy", q:'What does Lucy like to do?',               opts:['Play volleyball','Play basketball','Ride a bike'],                         ans:'Play volleyball'},

  /* ── SECTION 3: READING — David (4) ── */
  { section:"Reading", passage:"david", q:'What time does David wake up?',            opts:['6:00','7:00','8:00'],                                                      ans:'7:00'               },
  { section:"Reading", passage:"david", q:'How does David go to school?',             opts:['By car','By bike','By bus'],                                               ans:'By bus'             },
  { section:"Reading", passage:"david", q:"What is David's favorite subject?",        opts:['Math','Science','History'],                                                 ans:'Science'            },
  { section:"Reading", passage:"david", q:'Why does David like science?',             opts:['Because it is easy','Because he likes animals and plants','Because his friends like it'], ans:'Because he likes animals and plants'},

  /* ── SECTION 4: LISTENING (5) ── */
  { section:"Listening", audio:'My favorite animal is a dog.',     q:'What is the favorite animal?',                   opts:['Cat','Dog','Bird'],                       ans:'Dog'          },
  { section:"Listening", audio:'I go to school at 8 o\'clock.',   q:'What time does the speaker go to school?',        opts:["7 o'clock","8 o'clock","9 o'clock"],      ans:"8 o'clock"    },
  { section:"Listening", audio:'My backpack is blue.',             q:'What color is the backpack?',                     opts:['Red','Green','Blue'],                     ans:'Blue'         },
  { section:"Listening", audio:'I have two sisters.',              q:'How many sisters does the speaker have?',         opts:['One','Two','Three'],                      ans:'Two'          },
  { section:"Listening", audio:'I like pizza and orange juice.',   q:'What does the speaker like to drink?',            opts:['Milk','Water','Orange juice'],             ans:'Orange juice' }
];

const TOTAL = QUESTIONS.length; // 35

/* ─────────────────────────────────────────────────────────────
   2. SCORING / LEVELS
───────────────────────────────────────────────────────────── */
const LEVELS = [
  { min:31, max:35, label:'A2',       msg:'Excellent work! 🌟',   trophy:'🏆' },
  { min:25, max:30, label:'High A1',  msg:'Great job! 🎉',         trophy:'🥇' },
  { min:18, max:24, label:'A1',       msg:'Good effort! 👍',       trophy:'🥈' },
  { min:10, max:17, label:'Beginner', msg:'Keep practicing! 💪',   trophy:'🥉' },
  { min:0,  max:9,  label:'Pre-A1',   msg:'You can improve! 📚',   trophy:'⭐' }
];

/** Section metadata for the breakdown panel */
const SECTION_META = [
  { name:'Grammar',    emoji:'📖', range:[0,14]  },
  { name:'Vocabulary', emoji:'🔤', range:[15,22] },
  { name:'Reading',    emoji:'📄', range:[23,29] },
  { name:'Listening',  emoji:'🎧', range:[30,34] }
];

/* ─────────────────────────────────────────────────────────────
   3. STATE
───────────────────────────────────────────────────────────── */
let current   = 0;          // Current question index
let answers   = new Array(TOTAL).fill(null); // User answers
let confirmed = new Array(TOTAL).fill(false); // Answer locked?

const STORAGE_KEY = 'ept_kids_v1';

/* ─────────────────────────────────────────────────────────────
   4. DOM REFERENCES
───────────────────────────────────────────────────────────── */
const screens = {
  loading: document.getElementById('loading-screen'),
  start:   document.getElementById('start-screen'),
  quiz:    document.getElementById('quiz-screen'),
  results: document.getElementById('results-screen')
};

const UI = {
  sectionLabel:  document.getElementById('section-label'),
  qCounter:      document.getElementById('question-counter'),
  progressFill:  document.getElementById('progress-fill'),
  passageBox:    document.getElementById('passage-box'),
  passageText:   document.getElementById('passage-text'),
  qCard:         document.getElementById('question-card'),
  listenZone:    document.getElementById('listen-zone'),
  playBtn:       document.getElementById('play-btn'),
  playIcon:      document.getElementById('play-icon'),
  playLabel:     document.getElementById('play-label'),
  qNumber:       document.getElementById('q-number'),
  qText:         document.getElementById('q-text'),
  optionsGrid:   document.getElementById('options-grid'),
  feedbackBar:   document.getElementById('feedback-bar'),
  feedbackIcon:  document.getElementById('feedback-icon'),
  feedbackMsg:   document.getElementById('feedback-msg'),
  prevBtn:       document.getElementById('prev-btn'),
  nextBtn:       document.getElementById('next-btn'),
  // Results
  resultsTrophy: document.getElementById('results-trophy'),
  scoreBig:      document.getElementById('score-big'),
  ringFill:      document.getElementById('ring-fill'),
  resultsPct:    document.getElementById('results-pct'),
  resultsLevel:  document.getElementById('results-level'),
  resultsMsg:    document.getElementById('results-msg'),
  breakdownGrid: document.getElementById('breakdown-grid'),
  confettiLayer: document.getElementById('confetti-layer'),
  restartBtn:    document.getElementById('restart-btn'),
  startBtn:      document.getElementById('start-btn'),
  resumeNote:    document.getElementById('resume-note'),
  resumeBtn:     document.getElementById('resume-btn'),
  loaderBar:     document.getElementById('loader-bar')
};

/* ─────────────────────────────────────────────────────────────
   5. SCREEN TRANSITIONS
───────────────────────────────────────────────────────────── */
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

/* ─────────────────────────────────────────────────────────────
   6. LOADING SCREEN
───────────────────────────────────────────────────────────── */
function spawnStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*100}%;
      --dur:${(Math.random()*3+2).toFixed(1)}s;
      --delay:${(Math.random()*4).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
}

function runLoader() {
  spawnStars();
  showScreen('loading');
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 15;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    UI.loaderBar.style.width = pct + '%';
    if (pct === 100) setTimeout(afterLoad, 300);
  }, 120);
}

function afterLoad() {
  spawnBubbles();
  checkSavedProgress();
  showScreen('start');
}

/* ─────────────────────────────────────────────────────────────
   7. START SCREEN — bubbles
───────────────────────────────────────────────────────────── */
function spawnBubbles() {
  const container = document.getElementById('bubbles');
  const sizes = [40,60,80,100,50,70,35,90];
  sizes.forEach((s, i) => {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.cssText = `
      width:${s}px; height:${s}px;
      left:${(i * 13 + Math.random()*8)}%;
      --dur:${(10 + Math.random()*8).toFixed(1)}s;
      --delay:${(Math.random()*6).toFixed(1)}s;
    `;
    container.appendChild(b);
  });
}

/* ─────────────────────────────────────────────────────────────
   8. LOCAL STORAGE
───────────────────────────────────────────────────────────── */
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ current, answers, confirmed }));
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

function checkSavedProgress() {
  const saved = loadProgress();
  if (saved && saved.answers.some(a => a !== null)) {
    UI.resumeNote.style.display = 'block';
    UI.resumeBtn.onclick = () => {
      current   = saved.current;
      answers   = saved.answers;
      confirmed = saved.confirmed;
      startQuiz();
    };
  }
}

/* ─────────────────────────────────────────────────────────────
   9. QUIZ LOGIC
───────────────────────────────────────────────────────────── */
function startQuiz() {
  showScreen('quiz');
  renderQuestion();
}

/** Render the current question */
function renderQuestion() {
  // Save state
  saveProgress();

  const q = QUESTIONS[current];
  const letters = ['A','B','C','D'];

  /* Animate card out → in */
  UI.qCard.style.animation = 'none';
  void UI.qCard.offsetHeight; // reflow
  UI.qCard.style.animation = 'slideInUp 0.35s cubic-bezier(.4,0,.2,1) both';

  /* Top bar */
  UI.sectionLabel.textContent = sectionEmoji(q.section) + ' ' + q.section;
  UI.qCounter.textContent     = `${current + 1} / ${TOTAL}`;

  /* Progress bar */
  const pct = ((current) / TOTAL) * 100;
  UI.progressFill.style.width = pct + '%';

  /* Passage */
  if (q.passage) {
    UI.passageBox.style.display = 'block';
    UI.passageText.textContent  = PASSAGES[q.passage];
  } else {
    UI.passageBox.style.display = 'none';
  }

  /* Listening zone */
  if (q.audio) {
    UI.listenZone.style.display = 'block';
    resetPlayBtn();
    UI.playBtn.onclick = () => speakText(q.audio);
    // Auto-play on first visit to this question
    if (!confirmed[current] && answers[current] === null) {
      setTimeout(() => speakText(q.audio), 400);
    }
  } else {
    UI.listenZone.style.display = 'none';
    stopSpeech();
  }

  /* Question text */
  UI.qNumber.textContent = `Question ${current + 1}`;
  UI.qText.textContent   = q.q;

  /* Options */
  UI.optionsGrid.innerHTML = '';
  q.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${opt}</span>`;
    btn.dataset.value = opt;

    // If already answered
    if (confirmed[current]) {
      const correct = (opt === q.ans);
      const chosen  = (opt === answers[current]);
      if (correct) btn.classList.add('correct');
      else if (chosen && !correct) btn.classList.add('incorrect');
      btn.disabled = true;
    } else if (answers[current] === opt) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', () => selectOption(btn, opt));
    UI.optionsGrid.appendChild(btn);
  });

  /* Feedback bar */
  if (confirmed[current]) {
    showFeedback(answers[current] === q.ans);
  } else {
    hideFeedback();
  }

  /* Nav buttons */
  UI.prevBtn.disabled = (current === 0);
  UI.nextBtn.disabled = (answers[current] === null);

  // Last question → change Next to "See Results"
  if (current === TOTAL - 1) {
    UI.nextBtn.textContent = confirmed[current] ? '🎉 See Results' : '🎉 See Results';
  } else {
    UI.nextBtn.textContent = 'Next →';
  }
}

function sectionEmoji(section) {
  const map = { Grammar:'📖', Vocabulary:'🔤', Reading:'📄', Listening:'🎧' };
  return map[section] || '';
}

/** User taps an option */
function selectOption(btn, value) {
  if (confirmed[current]) return; // Already locked

  // Deselect all
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  answers[current] = value;

  // Enable Next
  UI.nextBtn.disabled = false;

  // Auto-confirm and show feedback after short delay
  setTimeout(() => confirmAnswer(), 350);
}

/** Lock the answer and reveal correct/incorrect */
function confirmAnswer() {
  if (confirmed[current]) return;
  confirmed[current] = true;

  const q   = QUESTIONS[current];
  const correct = (answers[current] === q.ans);
  playSound(correct ? 'correct' : 'incorrect');

  document.querySelectorAll('.option-btn').forEach(btn => {
    const val = btn.dataset.value;
    btn.disabled = true;
    if (val === q.ans) btn.classList.add('correct');
    else if (val === answers[current]) btn.classList.add('incorrect');
  });

  showFeedback(correct);

  if (current === TOTAL - 1) {
    UI.nextBtn.textContent = '🎉 See Results';
  }
  saveProgress();
}

function showFeedback(correct) {
  UI.feedbackBar.style.display = 'flex';
  UI.feedbackBar.className     = 'feedback-bar ' + (correct ? 'correct-fb' : 'incorrect-fb');
  UI.feedbackBar.style.animation = 'none';
  void UI.feedbackBar.offsetHeight;
  UI.feedbackBar.style.animation = 'fadeInDown 0.3s ease both';
  UI.feedbackIcon.textContent = correct ? '✅' : '❌';
  UI.feedbackMsg.textContent  = correct
    ? randomFrom(['Correct! Great job! 🌟','Well done! ⭐','Excellent! 🎉','That\'s right! 💫'])
    : 'Not quite — keep going! 💪';
}

function hideFeedback() {
  UI.feedbackBar.style.display = 'none';
}

/* ─────────────────────────────────────────────────────────────
   10. NAVIGATION
───────────────────────────────────────────────────────────── */
UI.nextBtn.addEventListener('click', () => {
  if (answers[current] === null) return;
  if (!confirmed[current]) confirmAnswer();

  if (current < TOTAL - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
});

UI.prevBtn.addEventListener('click', () => {
  if (current > 0) {
    stopSpeech();
    current--;
    renderQuestion();
  }
});

/* ─────────────────────────────────────────────────────────────
   11. RESULTS
───────────────────────────────────────────────────────────── */
function showResults() {
  stopSpeech();
  clearProgress();

  const score = answers.reduce((sum, ans, i) => sum + (ans === QUESTIONS[i].ans ? 1 : 0), 0);
  const pct   = Math.round((score / TOTAL) * 100);
  const level = LEVELS.find(l => score >= l.min && score <= l.max) || LEVELS[LEVELS.length - 1];

  showScreen('results');

  /* Inject SVG gradient */
  const svg = document.querySelector('.score-ring');
  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  defs.innerHTML = `<linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#f05a28"/>
    <stop offset="100%" stop-color="#fbbf24"/>
  </linearGradient>`;
  svg.prepend(defs);

  /* Trophy & level */
  UI.resultsTrophy.textContent = level.trophy;
  UI.resultsLevel.textContent  = level.label;
  UI.resultsMsg.textContent    = level.msg;
  UI.resultsPct.textContent    = pct + '%';

  /* Animate score counter */
  animateCount(UI.scoreBig, 0, score, 1200);

  /* Ring animation */
  const circumference = 2 * Math.PI * 50; // ~314
  const offset = circumference - (score / TOTAL) * circumference;
  setTimeout(() => {
    UI.ringFill.style.strokeDasharray  = circumference;
    UI.ringFill.style.strokeDashoffset = offset;
  }, 200);

  /* Section breakdown */
  renderBreakdown(answers);

  /* Confetti */
  if (score >= 18) spawnConfetti();
}

function renderBreakdown(answers) {
  UI.breakdownGrid.innerHTML = '';
  SECTION_META.forEach(sec => {
    const [start, end] = sec.range;
    const total   = end - start + 1;
    const correct = answers.slice(start, end + 1).filter((a, i) => a === QUESTIONS[start + i].ans).length;
    const fillPct = Math.round((correct / total) * 100);

    UI.breakdownGrid.innerHTML += `
      <div class="bd-row">
        <span class="bd-label">${sec.emoji} ${sec.name}</span>
        <div class="bd-bar-track">
          <div class="bd-bar-fill" style="width:0%" data-target="${fillPct}%"></div>
        </div>
        <span class="bd-score">${correct}/${total}</span>
      </div>`;
  });
  // Animate bars after paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.bd-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target;
    });
  });
}

function spawnConfetti() {
  UI.confettiLayer.innerHTML = '';
  const colors = ['#f05a28','#fbbf24','#22c55e','#3b82f6','#a855f7','#ec4899','#06b6d4'];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      transform:rotate(${Math.random()*360}deg);
      --dur:${(3 + Math.random()*3).toFixed(1)}s;
      --delay:${(Math.random()*2).toFixed(1)}s;
      width:${6 + Math.random()*8}px;
      height:${6 + Math.random()*8}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    UI.confettiLayer.appendChild(piece);
  }
}

/* ─────────────────────────────────────────────────────────────
   12. RESTART
───────────────────────────────────────────────────────────── */
UI.restartBtn.addEventListener('click', () => {
  current   = 0;
  answers   = new Array(TOTAL).fill(null);
  confirmed = new Array(TOTAL).fill(false);
  clearProgress();
  UI.confettiLayer.innerHTML = '';
  UI.resumeNote.style.display = 'none';
  showScreen('start');
});

UI.startBtn.addEventListener('click', () => {
  current   = 0;
  answers   = new Array(TOTAL).fill(null);
  confirmed = new Array(TOTAL).fill(false);
  startQuiz();
});

/* ─────────────────────────────────────────────────────────────
   13. SPEECH SYNTHESIS (Listening section)
───────────────────────────────────────────────────────────── */
let speechUtterance = null;
let isSpeaking = false;

function speakText(text) {
  if (!window.speechSynthesis) {
    alert('Speech synthesis not supported in this browser.');
    return;
  }
  if (isSpeaking) {
    stopSpeech();
    return;
  }
  speechUtterance = new SpeechSynthesisUtterance(text);
  speechUtterance.lang  = 'en-US';
  speechUtterance.rate  = 0.88;
  speechUtterance.pitch = 1.1;

  // Choose a pleasant voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
    || voices.find(v => v.lang === 'en-US')
    || voices[0];
  if (preferred) speechUtterance.voice = preferred;

  speechUtterance.onstart = () => {
    isSpeaking = true;
    UI.playBtn.classList.add('playing');
    UI.playIcon.textContent = '⏸';
    UI.playLabel.textContent = 'Playing…';
  };
  speechUtterance.onend = speechUtterance.onerror = () => {
    isSpeaking = false;
    resetPlayBtn();
  };
  window.speechSynthesis.speak(speechUtterance);
}

function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  isSpeaking = false;
  resetPlayBtn();
}

function resetPlayBtn() {
  UI.playBtn.classList.remove('playing');
  UI.playIcon.textContent = '▶';
  UI.playLabel.textContent = 'Play Audio';
}

/* ─────────────────────────────────────────────────────────────
   14. SOUND EFFECTS (Web Audio API)
───────────────────────────────────────────────────────────── */
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx   = null;

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new AudioCtx(); } catch(e) { return null; }
  }
  return audioCtx;
}

function playSound(type) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'correct') {
    // Happy ascending tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523, ctx.currentTime);          // C5
    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);    // E5
    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);    // G5
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } else {
    // Low dull buzz
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  }
}

/* ─────────────────────────────────────────────────────────────
   15. HELPERS
───────────────────────────────────────────────────────────── */
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function animateCount(el, from, to, duration) {
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.floor(from + (to - from) * easeOut(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

/* ─────────────────────────────────────────────────────────────
   16. INIT
───────────────────────────────────────────────────────────── */
// Load voices (Chrome requires this)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  window.speechSynthesis.getVoices();
}

// Kick off the loading screen
runLoader();
