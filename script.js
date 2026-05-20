// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';
});

// ===== NAVBAR TOGGLE (Mobile) =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.navbar nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkToggle.textContent = '☀️';
  }
  darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      darkToggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== PARTICLE ANIMATION (Hero) =====
const particleCanvas = document.getElementById('particles-canvas');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    particleCanvas.width = particleCanvas.parentElement.offsetWidth;
    particleCanvas.height = particleCanvas.parentElement.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ===== TYPING EFFECT (Hero) =====
const typingEl = document.getElementById('typingText');
if (typingEl) {
  const texts = [
    'Mengeksplorasi peran kecerdasan buatan dalam mewujudkan ekonomi inklusif.',
    'AI membantu 64.8 juta UMKM bertransformasi digital.',
    'Inklusi keuangan Indonesia telah mencapai 75.6% pada 2024.',
    '49 juta pengguna QRIS mendorong pembayaran digital nasional.'
  ];
  let textIdx = 0, charIdx = 0, isDeleting = false;

  function typeEffect() {
    const current = texts[textIdx];
    if (!isDeleting) {
      typingEl.innerHTML = current.substring(0, charIdx) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx > current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 50);
    } else {
      typingEl.innerHTML = current.substring(0, charIdx) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx < 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, 30);
    }
  }
  setTimeout(typeEffect, 1000);
}

// ===== ANIMATED COUNTER =====
function animateCounters() {
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(target % 1 !== 0 ? 1 : 0);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      entry.target.style.opacity = '1';
      // Trigger counter animation for stats
      if (entry.target.classList.contains('stats-section')) {
        animateCounters();
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card, .feature-card, .chart-container, .news-card, .quiz-section, .dashboard-section, .stats-section').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ===== TAB NAVIGATION =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabGroup = btn.closest('section');
    tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ===== CHART.JS DASHBOARD =====
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#e2e8f0',
      bodyColor: '#e2e8f0',
      cornerRadius: 8,
      padding: 12
    }
  },
  interaction: { intersect: false, mode: 'index' }
};

// 1. Inklusi Keuangan
const inklusiCtx = document.getElementById('chartInklusi');
if (inklusiCtx) {
  new Chart(inklusiCtx, {
    type: 'line',
    data: {
      labels: ['2016', '2019', '2022', '2024'],
      datasets: [{
        label: 'Inklusi Keuangan (%)',
        data: [67.8, 76.2, 85.1, 75.6],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true, tension: 0.4, pointRadius: 6,
        pointBackgroundColor: '#6366f1', pointBorderColor: '#fff', pointBorderWidth: 2
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: false, min: 60, max: 90 } } }
  });
}

// 2. QRIS
const qrisCtx = document.getElementById('chartQRIS');
if (qrisCtx) {
  new Chart(qrisCtx, {
    type: 'bar',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Pengguna QRIS (Juta)',
        data: [6, 15, 26, 38, 49],
        backgroundColor: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'],
        borderRadius: 8
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: true } } }
  });
}

// 3. UMKM Digital
const umkmCtx = document.getElementById('chartUMKM');
if (umkmCtx) {
  new Chart(umkmCtx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'UMKM Digital (Juta)',
        data: [8, 13, 19, 24, 30, 36],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true, tension: 0.4, pointRadius: 6,
        pointBackgroundColor: '#f59e0b', pointBorderColor: '#fff', pointBorderWidth: 2
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: true } } }
  });
}

// 4. Literasi Digital
const literasiCtx = document.getElementById('chartLiterasi');
if (literasiCtx) {
  new Chart(literasiCtx, {
    type: 'bar',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        label: 'Indeks Literasi Digital',
        data: [3.49, 3.54, 3.65, 4.0, 44.53],
        backgroundColor: '#8b5cf6', borderRadius: 8
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: true } } }
  });
}

// 5. KUR
const kurCtx = document.getElementById('chartKUR');
if (kurCtx) {
  new Chart(kurCtx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'KUR (Triliun Rp)',
        data: [140, 190, 253, 285, 297, 320],
        backgroundColor: '#ef4444', borderRadius: 8
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: true } } }
  });
}

// 6. Internet
const internetCtx = document.getElementById('chartInternet');
if (internetCtx) {
  new Chart(internetCtx, {
    type: 'doughnut',
    data: {
      labels: ['Pengguna Internet', 'Belum Terjangkau'],
      datasets: [{
        data: [79.5, 20.5],
        backgroundColor: ['#6366f1', '#e2e8f0'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// ===== REGIONAL CHARTS =====
const regionalInklusiCtx = document.getElementById('chartRegionalInklusi');
if (regionalInklusiCtx) {
  new Chart(regionalInklusiCtx, {
    type: 'bar',
    data: {
      labels: ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali-NT', 'Papua-Maluku'],
      datasets: [{
        label: 'Inklusi Keuangan (%)',
        data: [83, 72, 68, 65, 70, 55],
        backgroundColor: '#6366f1', borderRadius: 8
      }]
    },
    options: { ...chartOptions, indexAxis: 'y', scales: { x: { beginAtZero: true, max: 100 } } }
  });
}

const regionalInternetCtx = document.getElementById('chartRegionalInternet');
if (regionalInternetCtx) {
  new Chart(regionalInternetCtx, {
    type: 'bar',
    data: {
      labels: ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali-NT', 'Papua-Maluku'],
      datasets: [{
        label: 'Penetrasi Internet (%)',
        data: [85, 74, 70, 67, 72, 48],
        backgroundColor: '#10b981', borderRadius: 8
      }]
    },
    options: { ...chartOptions, indexAxis: 'y', scales: { x: { beginAtZero: true, max: 100 } } }
  });
}

const regionalUMKMCtx = document.getElementById('chartRegionalUMKM');
if (regionalUMKMCtx) {
  new Chart(regionalUMKMCtx, {
    type: 'bar',
    data: {
      labels: ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali-NT', 'Papua-Maluku'],
      datasets: [{
        label: 'UMKM (Juta)',
        data: [32, 14, 6, 5, 4, 3.8],
        backgroundColor: '#f59e0b', borderRadius: 8
      }]
    },
    options: { ...chartOptions, scales: { y: { beginAtZero: true } } }
  });
}

const regionalQRISCtx = document.getElementById('chartRegionalQRIS');
if (regionalQRISCtx) {
  new Chart(regionalQRISCtx, {
    type: 'bar',
    data: {
      labels: ['DKI Jakarta', 'Jawa Barat', 'Jawa Timur', 'Jawa Tengah', 'Bali', 'DIY', 'Sumut', 'Sulsel', 'Kaltim', 'Riau'],
      datasets: [{
        label: 'Adopsi QRIS (%)',
        data: [78, 65, 58, 52, 68, 60, 45, 42, 40, 38],
        backgroundColor: '#8b5cf6', borderRadius: 8
      }]
    },
    options: { ...chartOptions, indexAxis: 'y' }
  });
}

const regionalLiterasiCtx = document.getElementById('chartRegionalLiterasi');
if (regionalLiterasiCtx) {
  new Chart(regionalLiterasiCtx, {
    type: 'radar',
    data: {
      labels: ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali-NT', 'Papua-Maluku'],
      datasets: [{
        label: 'Indeks Literasi Digital',
        data: [48, 42, 40, 38, 44, 32],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#8b5cf6',
        pointBackgroundColor: '#8b5cf6'
      }]
    },
    options: { responsive: true, scales: { r: { beginAtZero: true, max: 60 } } }
  });
}

const regionalKURCtx = document.getElementById('chartRegionalKUR');
if (regionalKURCtx) {
  new Chart(regionalKURCtx, {
    type: 'bar',
    data: {
      labels: ['Jatim', 'Jateng', 'Jabar', 'Sumut', 'Sulsel', 'DKI', 'Bali', 'Lampung', 'NTB', 'Kaltim'],
      datasets: [{
        label: 'KUR (Triliun Rp)',
        data: [52, 48, 45, 28, 22, 20, 15, 14, 12, 11],
        backgroundColor: '#ef4444', borderRadius: 8
      }]
    },
    options: { ...chartOptions, indexAxis: 'y' }
  });
}

// ===== QUIZ INTERAKTIF =====
const quizData = [
  { question: "Berapa tingkat inklusi keuangan Indonesia pada tahun 2024?", options: ["65.2%", "75.6%", "80.1%", "70.3%"], answer: 1 },
  { question: "Apa itu QRIS?", options: ["Kartu kredit digital", "Standar QR code pembayaran nasional", "Aplikasi pinjaman online", "Sistem transfer bank"], answer: 1 },
  { question: "Berapa jumlah UMKM di Indonesia?", options: ["32.5 juta", "50.2 juta", "64.8 juta", "75 juta"], answer: 2 },
  { question: "AI credit scoring membantu siapa?", options: ["Perusahaan besar", "Masyarakat unbanked", "Bank sentral", "Investor asing"], answer: 1 },
  { question: "SDG mana yang terkait pengentasan kemiskinan?", options: ["SDG #4", "SDG #7", "SDG #1", "SDG #12"], answer: 2 },
  { question: "Berapa indeks literasi digital Indonesia tahun 2025?", options: ["38.50", "40.12", "44.53", "50.00"], answer: 2 },
  { question: "Apa manfaat AI bagi UMKM?", options: ["Menggantikan tenaga kerja", "Otomatisasi pemasaran & analitik", "Menaikkan pajak", "Mengurangi pelanggan"], answer: 1 },
  { question: "Berapa pengguna QRIS pada tahun 2024?", options: ["25 juta", "35 juta", "49 juta", "60 juta"], answer: 2 }
];

let currentQuiz = 0, quizScore = 0;

function initQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quizContainer');
  if (currentQuiz >= quizData.length) {
    const percent = Math.round((quizScore / quizData.length) * 100);
    container.innerHTML = `
      <div class="quiz-section" style="text-align:center;">
        <h3>🎉 Quiz Selesai!</h3>
        <div class="quiz-score-circle">${quizScore}/${quizData.length}</div>
        <p style="color:var(--gray);margin-bottom:1rem;">Kamu menjawab benar ${percent}% pertanyaan</p>
        <button class="quiz-btn" onclick="resetQuiz()">🔄 Ulangi Quiz</button>
      </div>`;
    return;
  }

  const q = quizData[currentQuiz];
  const progress = ((currentQuiz) / quizData.length) * 100;
  container.innerHTML = `
    <div class="quiz-section">
      <h3>🧠 Uji Pemahamanmu</h3>
      <p class="quiz-progress">Soal ${currentQuiz + 1} dari ${quizData.length}</p>
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
      <p class="quiz-question">${q.question}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" onclick="selectAnswer(${i})" id="opt-${i}">${opt}</div>
        `).join('')}
      </div>
      <button class="quiz-btn" onclick="nextQuestion()" id="quizNextBtn" style="display:none;">Selanjutnya →</button>
    </div>`;
}

function selectAnswer(index) {
  const q = quizData[currentQuiz];
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === q.answer) opt.classList.add('correct');
    else if (i === index && i !== q.answer) opt.classList.add('wrong');
  });
  if (index === q.answer) quizScore++;
  document.getElementById('quizNextBtn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuiz++;
  renderQuizQuestion();
}

function resetQuiz() {
  currentQuiz = 0;
  quizScore = 0;
  renderQuizQuestion();
}

// ===== CHATBOT WIDGET =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
  });
}

const botResponses = {
  'inklusi keuangan': 'Inklusi keuangan Indonesia mencapai 75.6% pada 2024 (OJK SNLIK). AI membantu melalui credit scoring alternatif untuk masyarakat unbanked.',
  'qris': 'QRIS adalah standar QR code nasional oleh Bank Indonesia. Pada 2024, pengguna QRIS mencapai 49 juta dan terus berkembang lintas negara.',
  'umkm': 'Indonesia memiliki 64.8 juta UMKM. AI membantu UMKM melalui chatbot, analitik penjualan, dan otomatisasi pemasaran digital.',
  'literasi digital': 'Indeks Literasi Digital Indonesia 2025 mencapai 44.53 (Komdigi IMDI), meningkat dari tahun sebelumnya.',
  'kemiskinan': 'AI membantu pengentasan kemiskinan melalui prediksi penerima bantuan sosial yang lebih tepat sasaran dan efisien.',
  'sdg': 'Website ini berkaitan dengan SDG #1 (No Poverty), SDG #8 (Decent Work), dan SDG #10 (Reduced Inequalities).',
  'kur': 'KUR (Kredit Usaha Rakyat) pada 2024 mencapai sekitar 320 triliun rupiah untuk mendukung UMKM Indonesia.',
  'default': 'Terima kasih atas pertanyaannya! Saya bisa membantu tentang: inklusi keuangan, QRIS, UMKM, literasi digital, kemiskinan, SDG, atau KUR. Silakan tanyakan topik yang kamu minati! 🤖'
};

function getBotResponse(message) {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return botResponses['default'];
}

function sendChat() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  const userDiv = document.createElement('div');
  userDiv.className = 'msg user';
  userDiv.textContent = msg;
  chatMessages.appendChild(userDiv);
  chatInput.value = '';

  // Typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'msg bot';
  typingDiv.textContent = '...';
  typingDiv.id = 'typingIndicator';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.textContent = getBotResponse(msg);
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}

if (chatSend) chatSend.addEventListener('click', sendChat);
if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (navMenu) navMenu.classList.remove('active');
    }
  });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});
