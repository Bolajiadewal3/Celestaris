// src/audioManager.js
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const soundBuffers = {};

const SFX_MANIFEST = {
  button_click: `${import.meta.env.BASE_URL}Audio/Button_Click.ogg`,
  camera_zoom: `${import.meta.env.BASE_URL}Audio/Camera_Zoom.mp3`,
  overlay_open: `${import.meta.env.BASE_URL}Audio/Overlay_Open.mp3`,
  overlay_close: `${import.meta.env.BASE_URL}Audio/Overlay_Close.mp3`,
  overlay_wipe: `${import.meta.env.BASE_URL}Audio/Overlay_Wipe.mp3`,
  exit_click: `${import.meta.env.BASE_URL}Audio/Exit_Click.ogg`,
};

// Preload and decode all audio files into RAM on app launch
export async function preloadAllSFX() {
  const loadPromises = Object.entries(SFX_MANIFEST).map(async ([key, path]) => {
    try {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      soundBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (err) {
      console.warn(`Failed to load sound: ${key}`, err);
    }
  });

  await Promise.all(loadPromises);
}

// Play sound from pre-decoded buffer with zero JS overhead
export function playSFX(key, volume = 0.3) {
  if (!soundBuffers[key]) return;

  // Unsuspend context if browser blocked initial autoplay
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const source = audioCtx.createBufferSource();
  const gainNode = audioCtx.createGain();

  source.buffer = soundBuffers[key];
  gainNode.gain.value = volume;

  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  source.start(0);
}
