// ─── Language Data ──────────────────────────────────────────────────────────
const LANGUAGES = [
  {
    id: "english", name: "English", rank: 1, flag: "🇺🇸", color: 1,
    greeting: "Hello World",
    speakers: "~290M speakers",
    fact: "The most widely spoken language in the US, used in government, media, and education.",
    aliases: [],
  },
  {
    id: "spanish", name: "Spanish", rank: 2, flag: "🇲🇽", color: 2,
    greeting: "Hola Mundo",
    speakers: "~41M speakers",
    fact: "The US has the 2nd largest Spanish-speaking population in the world.",
    aliases: ["espanol", "español"],
  },
  {
    id: "chinese", name: "Chinese", rank: 3, flag: "🇨🇳", color: 3,
    greeting: "你好世界",
    speakers: "~3.5M speakers",
    fact: "Includes Mandarin, Cantonese, and other Chinese dialects spoken across the US.",
    aliases: ["mandarin", "cantonese"],
  },
  {
    id: "tagalog", name: "Tagalog", rank: 4, flag: "🇵🇭", color: 4,
    greeting: "Kamusta sa Mundo",
    speakers: "~1.7M speakers",
    fact: "The national language of the Philippines, spoken widely in California and Nevada.",
    aliases: ["filipino"],
  },
  {
    id: "vietnamese", name: "Vietnamese", rank: 5, flag: "🇻🇳", color: 5,
    greeting: "Chào thế giới",
    speakers: "~1.5M speakers",
    fact: "Uses a Latin-based alphabet with unique tonal diacritics developed in the 17th century.",
    aliases: [],
  },
  {
    id: "arabic", name: "Arabic", rank: 6, flag: "🇸🇦", color: 6,
    greeting: "مرحبا بالعالم",
    speakers: "~1.2M speakers",
    fact: "One of the 6 official languages of the United Nations; spoken right to left.",
    aliases: [],
  },
  {
    id: "french", name: "French", rank: 7, flag: "🇫🇷", color: 7,
    greeting: "Bonjour le monde",
    speakers: "~1.3M speakers",
    fact: "Louisiana Creole is a unique French-based dialect still native to the US.",
    aliases: ["français", "francais"],
  },
  {
    id: "korean", name: "Korean", rank: 8, flag: "🇰🇷", color: 8,
    greeting: "안녕하세요 세계",
    speakers: "~1.1M speakers",
    fact: "Korean uses Hangul, a uniquely designed alphabet invented in the 15th century.",
    aliases: [],
  },
  {
    id: "russian", name: "Russian", rank: 9, flag: "🇷🇺", color: 9,
    greeting: "Привет мир",
    speakers: "~900K speakers",
    fact: "The most widely spoken Slavic language; large communities in New York and Los Angeles.",
    aliases: [],
  },
  {
    id: "german", name: "German", rank: 10, flag: "🇩🇪", color: 10,
    greeting: "Hallo Welt",
    speakers: "~900K speakers",
    fact: "Pennsylvania Dutch, a German dialect, is still spoken by Amish communities in the US.",
    aliases: ["deutsch"],
  },
  {
    id: "haitiancreole", name: "Haitian Creole", rank: 11, flag: "🇭🇹", color: 11,
    greeting: "Bonjou Monn",
    speakers: "~800K speakers",
    fact: "A French-based creole with African, Spanish, and indigenous Taíno language influences.",
    aliases: ["haitian", "creole"],
  },
  {
    id: "hindi", name: "Hindi", rank: 12, flag: "🇮🇳", color: 12,
    greeting: "नमस्ते दुनिया",
    speakers: "~800K speakers",
    fact: "One of the two official languages of India; spoken across the US tech and medical sectors.",
    aliases: [],
  },
];

// ─── State ──────────────────────────────────────────────────────────────────
let found          = new Set();
let totalGuesses   = 0;
let streak         = 0;
let hintsLeft      = 3;
let hintedCards    = new Set();
let timerInterval  = null;
let secondsElapsed = 0;
let gameStarted    = false;
let gameOver       = false;

// ─── DOM refs ────────────────────────────────────────────────────────────────
const guessInput     = document.getElementById("guess");
const foundCountEl   = document.getElementById("found-count");
const guessCountEl   = document.getElementById("guess-count");
const streakEl       = document.getElementById("streak-display");
const timerEl        = document.getElementById("timer");
const bestTimeEl     = document.getElementById("best-time");
const progressFill   = document.getElementById("progress-fill");
const hintBtn        = document.getElementById("hint-btn");
const hintRemaining  = document.getElementById("hint-remaining");
const giveupBtn      = document.getElementById("giveup-btn");
const winPanel       = document.getElementById("win-panel");
const inputSection   = document.getElementById("input-section");
const themeToggle    = document.getElementById("theme-toggle");
const themeIcon      = document.getElementById("theme-icon");
const grid           = document.getElementById("language-grid");
const playAgainBtn   = document.getElementById("play-again");

// ─── Init ─────────────────────────────────────────────────────────────────
function init() {
  // Build grid cards
  grid.innerHTML = "";
  LANGUAGES.forEach(lang => {
    const card = document.createElement("div");
    card.className = "lang-card";
    card.id = `card-${lang.id}`;
    card.dataset.color = lang.color;
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <span class="card-rank">#${lang.rank}</span>
          <span class="card-question" aria-hidden="true">?</span>
        </div>
        <div class="card-back" aria-label="${lang.name}">
          <span class="card-flag">${lang.flag}</span>
          <span class="card-name">${lang.name}</span>
          <span class="card-greeting">"${lang.greeting}"</span>
          <span class="card-speakers">${lang.speakers}</span>
          <span class="card-fact">${lang.fact}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Reset state
  found.clear();
  totalGuesses   = 0;
  streak         = 0;
  hintsLeft      = 3;
  hintedCards.clear();
  secondsElapsed = 0;
  gameStarted    = false;
  gameOver       = false;
  clearInterval(timerInterval);

  // Reset UI
  guessInput.value            = "";
  foundCountEl.textContent    = "0";
  guessCountEl.textContent    = "0";
  streakEl.textContent        = "0";
  timerEl.textContent         = "0:00";
  progressFill.style.width    = "0%";
  hintBtn.disabled            = false;
  hintRemaining.textContent   = "(3 left)";
  winPanel.classList.add("hidden");
  inputSection.classList.remove("hidden");
  document.getElementById("new-record-badge").classList.add("hidden");

  // Best time from localStorage
  const savedBest = localStorage.getItem("lq_best");
  bestTimeEl.textContent = savedBest ? formatTime(parseInt(savedBest, 10)) : "—";

  guessInput.focus();
}

// ─── Timer ───────────────────────────────────────────────────────────────────
function startTimer() {
  gameStarted = true;
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = formatTime(secondsElapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(s) {
  const m   = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

// ─── Normalise input ──────────────────────────────────────────────────────────
function normalise(str) {
  return str.trim().toLowerCase().replace(/\s+/g, "");
}

// ─── Live input handler (auto-match on complete name) ─────────────────────────
guessInput.addEventListener("input", () => {
  if (gameOver) return;
  const raw = guessInput.value;
  if (!raw.trim()) return;

  if (!gameStarted) startTimer();

  const norm = normalise(raw);

  for (const lang of LANGUAGES) {
    if (found.has(lang.id)) continue;

    const nameNorm = normalise(lang.name);
    const allMatches = [nameNorm, ...lang.aliases.map(normalise)];

    if (allMatches.includes(norm)) {
      totalGuesses++;
      streak++;
      found.add(lang.id);

      revealCard(lang.id);
      updateStats();
      guessInput.value = "";

      addClass(guessInput, "input-correct", 500);

      const streakMsg = streak >= 3 ? ` ${streak} in a row! 🔥` : "";
      showToast(`✅ ${lang.flag} ${lang.name}!${streakMsg}`, "correct");

      if (found.size === LANGUAGES.length) {
        setTimeout(() => handleEnd(true), 300);
      }
      return;
    }
  }
});

// ─── Enter key — wrong guess penalty ─────────────────────────────────────────
guessInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (gameOver) return;

  const raw = guessInput.value.trim();
  if (!raw) return;

  const norm = normalise(raw);

  // Check if it matched an already-found language
  for (const lang of LANGUAGES) {
    const allMatches = [normalise(lang.name), ...lang.aliases.map(normalise)];
    if (allMatches.includes(norm) && found.has(lang.id)) {
      showToast(`${lang.flag} Already found!`, "info");
      guessInput.value = "";
      return;
    }
  }

  // It's a genuine wrong guess
  if (!gameStarted) startTimer();
  totalGuesses++;
  streak = 0;
  updateStats();

  addClass(guessInput, "input-shake", 450);
  showToast("❌ Not in the list — keep guessing!", "wrong");
  guessInput.value = "";
});

// ─── Reveal card ──────────────────────────────────────────────────────────────
function revealCard(id) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;
  card.classList.add("revealed");
  // Slight delay so the flip is visible before pop
  setTimeout(() => card.classList.add("pop"), 50);
}

// ─── Stats update ─────────────────────────────────────────────────────────────
function updateStats() {
  foundCountEl.textContent = found.size;
  guessCountEl.textContent = totalGuesses;
  streakEl.textContent     = streak;
  progressFill.style.width = `${(found.size / LANGUAGES.length) * 100}%`;
}

// ─── Hint ─────────────────────────────────────────────────────────────────────
hintBtn.addEventListener("click", () => {
  if (hintsLeft <= 0 || gameOver) return;

  const pool = LANGUAGES.filter(l => !found.has(l.id) && !hintedCards.has(l.id));
  if (!pool.length) {
    showToast("No more cards to hint!", "info");
    return;
  }

  if (!gameStarted) startTimer();

  const pick = pool[Math.floor(Math.random() * pool.length)];
  hintedCards.add(pick.id);
  hintsLeft--;

  hintRemaining.textContent = hintsLeft > 0 ? `(${hintsLeft} left)` : "(none left)";
  if (hintsLeft === 0) hintBtn.disabled = true;

  // Show hint text on card front
  const card  = document.getElementById(`card-${pick.id}`);
  const front = card.querySelector(".card-front");
  card.classList.add("hinted");

  let hintEl = front.querySelector(".card-hint-text");
  if (!hintEl) {
    hintEl = document.createElement("span");
    hintEl.className = "card-hint-text";
    front.appendChild(hintEl);
  }
  hintEl.textContent = `Starts with "${pick.name[0]}"`;

  showToast(`💡 One language starts with "${pick.name[0]}" (${pick.speakers})`, "hint");
  guessInput.focus();
});

// ─── Give Up ──────────────────────────────────────────────────────────────────
giveupBtn.addEventListener("click", () => {
  if (gameOver) return;
  const remaining = LANGUAGES.filter(l => !found.has(l.id));
  if (!remaining.length) return;

  if (!confirm(`Give up and reveal the remaining ${remaining.length} language(s)?`)) return;

  const selfFoundCount = found.size;

  remaining.forEach(lang => {
    found.add(lang.id);
    revealCard(lang.id);
  });

  updateStats();
  handleEnd(false, selfFoundCount);
});

// ─── End / win handler ───────────────────────────────────────────────────────
function handleEnd(won, selfFoundCount = LANGUAGES.length) {
  stopTimer();
  gameOver = true;

  const accuracy = totalGuesses > 0
    ? Math.round((selfFoundCount / totalGuesses) * 100)
    : 100;

  document.getElementById("final-time").textContent     = formatTime(secondsElapsed);
  document.getElementById("final-guesses").textContent  = totalGuesses;
  document.getElementById("final-accuracy").textContent = `${accuracy}%`;

  if (won) {
    const savedBest   = localStorage.getItem("lq_best");
    const isNewRecord = !savedBest || secondsElapsed < parseInt(savedBest, 10);

    if (isNewRecord) {
      localStorage.setItem("lq_best", secondsElapsed);
      bestTimeEl.textContent = formatTime(secondsElapsed);
      document.getElementById("new-record-badge").classList.remove("hidden");
    }

    document.getElementById("win-trophy").textContent = "🏆";
    document.getElementById("win-title").textContent  = "You got them all!";
    document.getElementById("win-sub").textContent    = "Impressive language knowledge!";

    setTimeout(() => {
      inputSection.classList.add("hidden");
      winPanel.classList.remove("hidden");
      launchConfetti();
    }, 600);
  } else {
    document.getElementById("win-trophy").textContent = "📖";
    document.getElementById("win-title").textContent  = "Better luck next time!";
    document.getElementById("win-sub").textContent    =
      `You found ${selfFoundCount} of 12 on your own — study up and try again!`;

    setTimeout(() => {
      inputSection.classList.add("hidden");
      winPanel.classList.remove("hidden");
    }, 400);
  }
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = [
    "#7c6dfa","#48cfad","#f59e0b","#ef4444",
    "#22c55e","#3b82f6","#ec4899","#a855f7","#06b6d4",
  ];
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";

  for (let i = 0; i < 130; i++) {
    const p     = document.createElement("div");
    const size  = 6 + Math.random() * 9;
    p.className = "confetti-piece";
    p.style.cssText = [
      `left:${Math.random() * 100}vw`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-duration:${1.8 + Math.random() * 2.4}s`,
      `animation-delay:${Math.random() * 1.4}s`,
      `--drift:${-110 + Math.random() * 220}px`,
      `border-radius:${Math.random() > 0.45 ? "50%" : "3px"}`,
    ].join(";");
    container.appendChild(p);
  }

  setTimeout(() => { container.innerHTML = ""; }, 5500);
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast     = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

// ─── Theme ────────────────────────────────────────────────────────────────────
let theme = localStorage.getItem("lq_theme") || "dark";
applyTheme(theme);

themeToggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  localStorage.setItem("lq_theme", theme);
});

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  themeIcon.textContent = t === "dark" ? "🌙" : "☀️";
}

// ─── Play again ────────────────────────────────────────────────────────────────
playAgainBtn.addEventListener("click", init);

// ─── Utility ──────────────────────────────────────────────────────────────────
function addClass(el, cls, removeAfterMs) {
  el.classList.remove(cls);
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), removeAfterMs);
}

// ─── Start ────────────────────────────────────────────────────────────────────
init();
