//© Zero - Código libre no comercial

// --- Cargar una imagen en lugar del SVG ---
const container = document.getElementById('tree-container');
const img = document.createElement('img');
img.src = '../Img/Imagen de WhatsApp 2025-09-25 a las 14.52.30_a716570b.jpg'; // coloca aquí la foto que quieras
img.alt = 'Mi pareja y yo';
img.style.width = '100%';
img.style.height = '100%';
img.style.borderRadius = '20px';
img.style.objectFit = 'cover';
img.style.opacity = 0;
img.style.transform = 'scale(0.8)';
img.style.transition = 'all 1.5s ease';

container.appendChild(img);

// Animación de entrada
setTimeout(() => {
  img.style.opacity = 1;
  img.style.transform = 'scale(1)';

  // Mostrar texto con efecto typing
  setTimeout(() => {
    showDedicationText();
    startFloatingObjects();
    startFloatingHearts(); // <<--- aquí reemplaza al contador
    playBackgroundMusic();
  }, 1200);

}, 500);

// --- Utilidades ---
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// --- Texto de dedicatoria ---
function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `Me siento muy orgullosa del gran hombre que eres, de lo mucho que te esfuerzas y aunque no todo sea sencillo, no te rindes. Aquí estaré para animarte y apoyarte siempre, mi amor. Te amo.`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      // Mostrar firma al terminar
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// --- Firma personalizada ---
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  signature.textContent = "Con amor, para Willian Fabian Cordova ❤️";
  signature.classList.add('visible');
}

// --- Objetos flotantes (pétalos) ---
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

// --- Corazones flotantes con iniciales ---
function startFloatingHearts() {
  const container = document.getElementById('floating-objects');
  let count = 0;

  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = "💖 W & D 💖"; // aquí pon las iniciales o texto que quieras
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.9;
    el.style.fontSize = `${20 + Math.random() * 14}px`;
    el.style.color = '#e60073';
    el.style.fontWeight = 'bold';
    el.style.textShadow = '0 0 6px rgba(0,0,0,0.3)';
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 80;
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh)`;
      el.style.opacity = 0;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 40) setTimeout(spawn, 400 + Math.random() * 600);
    else setTimeout(spawn, 1200 + Math.random() * 1500);
  }
  spawn();
}

// --- Música de fondo ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  }

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}

// Iniciar música al cargar
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});
