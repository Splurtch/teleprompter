const scriptInput = document.getElementById('scriptInput');
const speedRange = document.getElementById('speedRange');
const fontRange = document.getElementById('fontRange');
const speedValue = document.getElementById('speedValue');
const fontValue = document.getElementById('fontValue');
const appTitle = document.getElementById('appTitle');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const mirrorBtn = document.getElementById('mirrorBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const teleprompterViewport = document.getElementById('teleprompterViewport');
const teleprompterText = document.getElementById('teleprompterText');

const baseConfig = {
  appTitle: 'Teleprompter',
  defaultText: `Hola, este es tu teleprompter.

Pega aquí tu guion, ajusta la velocidad y empieza a grabar con más confianza.

Respira, sonríe y habla con naturalidad.`,
  speed: { min: 10, max: 180, default: 40 },
  fontSize: { min: 24, max: 96, default: 48 },
  shortcuts: true
};

const incomingConfig = window.TELEPROMPTER_CONFIG || {};
const config = {
  ...baseConfig,
  ...incomingConfig,
  speed: { ...baseConfig.speed, ...(incomingConfig.speed || {}) },
  fontSize: { ...baseConfig.fontSize, ...(incomingConfig.fontSize || {}) }
};

let speed = Number(config.speed.default);
let isRunning = false;
let isMirrored = false;
let animationFrameId = null;
let lastTimestamp = 0;
let yOffset = 0;

function applyConfig() {
  document.title = config.appTitle;
  appTitle.textContent = config.appTitle;

  speedRange.min = String(config.speed.min);
  speedRange.max = String(config.speed.max);
  speedRange.value = String(config.speed.default);
  speedValue.textContent = String(config.speed.default);

  fontRange.min = String(config.fontSize.min);
  fontRange.max = String(config.fontSize.max);
  fontRange.value = String(config.fontSize.default);
  fontValue.textContent = String(config.fontSize.default);
  teleprompterText.style.fontSize = `${config.fontSize.default}px`;
}

function syncText() {
  teleprompterText.textContent = scriptInput.value.trim() || config.defaultText;
}

function updatePosition() {
  teleprompterText.style.top = `${yOffset}px`;
}

function resetPosition() {
  const viewportHeight = teleprompterViewport.clientHeight;
  yOffset = viewportHeight;
  updatePosition();
}

function loop(timestamp) {
  if (!isRunning) return;

  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const deltaSeconds = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  yOffset -= speed * deltaSeconds;
  updatePosition();

  const textHeight = teleprompterText.getBoundingClientRect().height;
  if (yOffset + textHeight < 0) {
    yOffset = teleprompterViewport.clientHeight;
  }

  animationFrameId = requestAnimationFrame(loop);
}

function togglePlayPause() {
  isRunning = !isRunning;
  playPauseBtn.textContent = isRunning ? 'Pausar' : 'Iniciar';

  if (isRunning) {
    lastTimestamp = 0;
    animationFrameId = requestAnimationFrame(loop);
  } else if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function resetTeleprompter() {
  isRunning = false;
  playPauseBtn.textContent = 'Iniciar';
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  lastTimestamp = 0;
  resetPosition();
}

function toggleMirror() {
  isMirrored = !isMirrored;
  teleprompterViewport.classList.toggle('mirror', isMirrored);
  mirrorBtn.textContent = `Espejo: ${isMirrored ? 'ON' : 'OFF'}`;
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await teleprompterViewport.requestFullscreen();
    return;
  }
  await document.exitFullscreen();
}

applyConfig();
scriptInput.value = config.defaultText;
syncText();
resetPosition();

scriptInput.addEventListener('input', () => {
  syncText();
  resetPosition();
});

speedRange.addEventListener('input', () => {
  speed = Number(speedRange.value);
  speedValue.textContent = String(speed);
});

fontRange.addEventListener('input', () => {
  const fontSize = Number(fontRange.value);
  fontValue.textContent = String(fontSize);
  teleprompterText.style.fontSize = `${fontSize}px`;
});

playPauseBtn.addEventListener('click', togglePlayPause);
resetBtn.addEventListener('click', resetTeleprompter);
mirrorBtn.addEventListener('click', toggleMirror);
fullscreenBtn.addEventListener('click', () => {
  toggleFullscreen().catch(() => {});
});

window.addEventListener('resize', () => {
  if (!isRunning) {
    resetPosition();
  }
});

if (config.shortcuts) {
  window.addEventListener('keydown', (event) => {
    if (event.target === scriptInput) return;

    if (event.code === 'Space') {
      event.preventDefault();
      togglePlayPause();
    }

    if (event.key.toLowerCase() === 'r') {
      resetTeleprompter();
    }

    if (event.key.toLowerCase() === 'm') {
      toggleMirror();
    }

    if (event.key.toLowerCase() === 'f') {
      toggleFullscreen().catch(() => {});
    }
  });
}
