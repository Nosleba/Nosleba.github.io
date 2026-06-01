// =============================================
//  TOPICS DATA — extracted from the syllabus
// =============================================
const topics = [
  // MES 1 — WHO AM I?
  { num: 1,  title: "Greetings & Introductions",        tag: "Saludos · To Be",          month: 1 },
  { num: 2,  title: "Personal Pronouns + Verb To Be",   tag: "Pronombres · Contracciones", month: 1 },
  { num: 3,  title: "Alphabet, Numbers & Age",          tag: "Abecedario · Números",      month: 1 },
  { num: 4,  title: "Family Members",                   tag: "Familia · This is my…",     month: 1 },
  { num: 5,  title: "Colors & Adjectives",              tag: "Colores · Adjetivos",       month: 1 },
  { num: 6,  title: "Describing Family",                tag: "Descripción oral",           month: 1 },
  { num: 7,  title: "Present Simple Basics",            tag: "I play / She plays",        month: 1 },
  { num: 8,  title: "Daily Routines",                   tag: "Wake up · Go to school",    month: 1 },
  { num: 9,  title: "Days, Parts of Day & Time",        tag: "Monday · Half past 7",      month: 1 },

  // MES 2 — MY WORLD
  { num: 10, title: "Food Vocabulary",                  tag: "Rice · Chicken · Juice",    month: 2 },
  { num: 11, title: "Likes & Dislikes",                 tag: "I like / I don't like",     month: 2 },
  { num: 12, title: "Ordering Food",                    tag: "Can I have…? Roleplay",     month: 2 },
  { num: 13, title: "Body Parts",                       tag: "TPR · Head, Nose, Arms",    month: 2 },
  { num: 14, title: "Feelings & Health",                tag: "I feel tired · My head hurts", month: 2 },
  { num: 15, title: "At the Doctor",                    tag: "Roleplay médico",           month: 2 },
  { num: 16, title: "Animals",                          tag: "Dog · Lion · Snake",        month: 2 },
  { num: 17, title: "Describing Animals",               tag: "It can fly · It can't swim", month: 2 },
  { num: 18, title: "My Favorite Animal",               tag: "Descripción escrita",       month: 2 },

  // MES 3 — MY COMMUNITY
  { num: 19, title: "Places in Town",                   tag: "School · Hospital · Market", month: 3 },
  { num: 20, title: "Giving Directions",                tag: "Go straight · Turn left",   month: 3 },
  { num: 21, title: "Present Continuous in Context",    tag: "I am walking to school",    month: 3 },
  { num: 22, title: "Classroom Language",               tag: "Open your book · Listen",   month: 3 },
  { num: 23, title: "Hobbies & Sports",                 tag: "I love dancing · Soccer",   month: 3 },
  { num: 24, title: "Present Simple vs Continuous",     tag: "I play vs I am playing",    month: 3 },
  { num: 25, title: "Past Simple Affirmative",          tag: "Played · Watched · Studied", month: 3 },
  { num: 26, title: "Past Simple Negative & Questions", tag: "I didn't play · Did you?",  month: 3 },
  { num: 27, title: "Time Expressions",                 tag: "Yesterday · Last week",     month: 3 },

  // MES 4 — I CAN COMMUNICATE
  { num: 28, title: "Shopping Vocabulary",              tag: "Price · Cheap · Expensive", month: 4 },
  { num: 29, title: "Irregular Verbs Introduction",     tag: "Buy→bought · Go→went",      month: 4 },
  { num: 30, title: "Shopping Dialogue",                tag: "How much? · Store roleplay", month: 4 },
  { num: 31, title: "Weather",                          tag: "Sunny · Rainy · Windy",     month: 4 },
  { num: 32, title: "Seasons",                          tag: "Summer · Winter · Spring",  month: 4 },
  { num: 33, title: "Going To Introduction",            tag: "It's going to rain",        month: 4 },
  { num: 34, title: "Going To Consolidation",           tag: "I am going to travel",      month: 4 },
  { num: 35, title: "Jobs & Dreams",                    tag: "Teacher · Doctor · Artist", month: 4 },
  { num: 36, title: "My Future",                        tag: "When I grow up…",           month: 4 },
];

// Topics currently "available" (you can expand this list as you publish pages)
const AVAILABLE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// =============================================
//  RENDER CARDS
// =============================================
function renderTopics(filter = 'all') {
  const grid = document.getElementById('topicsGrid');
  grid.innerHTML = '';

  topics.forEach(topic => {
    const isAvailable = AVAILABLE.includes(topic.num);
    const shouldShow  = filter === 'all' || parseInt(filter) === topic.month;

    const card = document.createElement('a');
    card.className = 'topic-card' + (shouldShow ? '' : ' hidden');
    card.dataset.month     = topic.month;
    card.dataset.available = isAvailable;

    if (isAvailable) {
      card.href   = `https://nosleba.github.io/Tema-${topic.num}/`;
      card.target = '_blank';
      card.rel    = 'noopener noreferrer';
    } else {
      card.href = '#';
      card.addEventListener('click', e => e.preventDefault());
    }

    card.innerHTML = `
      <span class="topic-number">Tema ${topic.num}</span>
      <span class="topic-title">${topic.title}</span>
      <span class="topic-tag">${topic.tag}</span>
    `;

    grid.appendChild(card);
  });
}

// =============================================
//  FILTER BUTTONS
// =============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    renderTopics(filter);
  });
});

// =============================================
//  MONTH CARDS — click to filter
// =============================================
document.querySelectorAll('.month-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const month = card.dataset.month;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === month);
    });
    renderTopics(month);
    document.querySelector('.topics-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// =============================================
//  EXAMS DATA
// =============================================
const exams = [
  { num: 1,  title: "Exam — Identity & Greetings",      tag: "Temas 1–3 · Verb To Be",         available: true  },
  { num: 2,  title: "Exam — Family & Descriptions",     tag: "Temas 4–6 · Adjectives",         available: true  },
  { num: 3,  title: "Exam — Daily Routines & Time",     tag: "Temas 7–9 · Present Simple",     available: false },
  { num: 4,  title: "Exam — Food & Feelings",           tag: "Temas 10–12 · Likes & Dislikes", available: false },
  { num: 5,  title: "Exam — Body & Health",             tag: "Temas 13–15 · Health Vocab",     available: false },
  { num: 6,  title: "Exam — Animals & Nature",          tag: "Temas 16–18 · Can / Can't",      available: false },
  { num: 7,  title: "Exam — Community & Places",        tag: "Temas 19–21 · Directions",       available: false },
  { num: 8,  title: "Exam — School & Past Simple",      tag: "Temas 22–24 · Present Cont.",    available: false },
  { num: 9,  title: "Exam — Past Simple Full",          tag: "Temas 25–27 · Time Expressions", available: false },
  { num: 10, title: "Exam — Final Evaluation",          tag: "Temas 28–36 · Going To",         available: false },
];

// =============================================
//  RENDER EXAMS
// =============================================
function renderExams() {
  const grid = document.getElementById('examsGrid');
  grid.innerHTML = '';

  exams.forEach(exam => {
    const card = document.createElement('a');
    card.className     = 'exam-card';
    card.dataset.available = exam.available;

    if (exam.available) {
      card.href   = `https://nosleba.github.io/Examen-${exam.num}/`;
      card.target = '_blank';
      card.rel    = 'noopener noreferrer';
    } else {
      card.href = '#';
      card.addEventListener('click', e => e.preventDefault());
    }

    card.innerHTML = `
      <span class="exam-icon">📝</span>
      <span class="exam-number">Examen ${exam.num}</span>
      <span class="exam-title">${exam.title}</span>
      <span class="exam-tag">${exam.tag}</span>
    `;

    grid.appendChild(card);
  });
}

// =============================================
//  INIT
// =============================================
renderTopics('all');
renderExams();
