/* ============================================ */
/* 🎵 Background Music — Web Audio API           */
/* Procedural melodies + SFX                     */
/* Works on ALL devices including iOS Safari     */
/* ============================================ */

const MusicPlayer = (() => {
    let ctx = null;
    let masterGain = null;
    let isPlaying = false;
    let melodyTimer = null;
    let bassTimer = null;
    let currentTrack = 0;

    // 10 Different melody patterns (scales/keys)
    const TRACKS = [
        { name: '🌸 Bản nhạc mùa xuân', scale: [261, 293, 329, 349, 392, 440, 493, 523], tempo: 280, key: 'C' },
        { name: '🌙 Ru con ngủ', scale: [293, 329, 370, 392, 440, 493, 554, 587], tempo: 400, key: 'D' },
        { name: '⭐ Bầu trời sao', scale: [329, 370, 415, 440, 493, 554, 622, 659], tempo: 320, key: 'E' },
        { name: '🌊 Sóng biển', scale: [349, 392, 440, 466, 523, 587, 622, 698], tempo: 350, key: 'F' },
        { name: '🦋 Cánh bướm', scale: [392, 440, 493, 523, 587, 659, 698, 784], tempo: 260, key: 'G' },
        { name: '🌈 Cầu vồng', scale: [440, 493, 554, 587, 659, 698, 784, 880], tempo: 300, key: 'A' },
        { name: '🍀 Đồng cỏ xanh', scale: [261, 293, 329, 392, 440, 523, 587, 659], tempo: 310, key: 'Cm' },
        { name: '🎠 Vòng đu quay', scale: [329, 392, 440, 493, 587, 659, 698, 784], tempo: 240, key: 'Em' },
        { name: '🏰 Lâu đài cổ tích', scale: [349, 440, 466, 523, 587, 698, 784, 880], tempo: 340, key: 'Fm' },
        { name: '🎪 Ngày hội', scale: [392, 440, 523, 587, 659, 784, 880, 1047], tempo: 220, key: 'Gm' },
    ];

    function init() {
        currentTrack = Math.floor(Math.random() * TRACKS.length);
    }

    function ensureCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            masterGain = ctx.createGain();
            masterGain.gain.value = 0.15;
            masterGain.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') ctx.resume();
    }

    function playNote(freq, time, dur, type = 'sine', vol = 0.5) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;

        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(vol, time + 0.05);
        g.gain.setValueAtTime(vol * 0.8, time + dur * 0.6);
        g.gain.linearRampToValueAtTime(0, time + dur);

        osc.connect(g);
        g.connect(masterGain);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    }

    function generateMelody() {
        if (!isPlaying || !ctx) return;
        const track = TRACKS[currentTrack];
        const scale = track.scale;
        const now = ctx.currentTime;

        // Play 8 notes as a phrase
        for (let i = 0; i < 8; i++) {
            const note = scale[Math.floor(Math.random() * scale.length)];
            const t = now + (i * track.tempo / 1000);
            const dur = track.tempo / 1000 * 0.85;

            // Main melody (sine = soft/sweet)
            playNote(note, t, dur, 'sine', 0.4);

            // Sometimes add harmony
            if (Math.random() > 0.6) {
                playNote(note * 1.5, t, dur * 0.7, 'triangle', 0.15);
            }
        }

        // Bass: root note
        const root = scale[0] / 2;
        playNote(root, now, track.tempo * 4 / 1000, 'triangle', 0.25);
        playNote(scale[4] / 2, now + track.tempo * 4 / 1000, track.tempo * 4 / 1000, 'triangle', 0.2);

        // Schedule next phrase
        melodyTimer = setTimeout(generateMelody, track.tempo * 8);
    }

    function play() {
        ensureCtx();
        isPlaying = true;
        generateMelody();
        updateUI();
    }

    function pause() {
        isPlaying = false;
        clearTimeout(melodyTimer);
        clearTimeout(bassTimer);
        updateUI();
    }

    function toggle() {
        if (isPlaying) pause(); else play();
        return isPlaying;
    }

    function nextTrack() {
        const wasPlaying = isPlaying;
        pause();
        currentTrack = (currentTrack + 1) % TRACKS.length;
        if (wasPlaying) setTimeout(play, 100);
        updateUI();
    }

    function prevTrack() {
        const wasPlaying = isPlaying;
        pause();
        currentTrack = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
        if (wasPlaying) setTimeout(play, 100);
        updateUI();
    }

    function reshufflePlaylist() {
        const wasPlaying = isPlaying;
        pause();
        currentTrack = Math.floor(Math.random() * TRACKS.length);
        if (wasPlaying) setTimeout(play, 100);
        updateUI();
    }

    function getCurrentTitle() {
        return TRACKS[currentTrack].name;
    }

    function getTrackInfo() {
        return `${currentTrack + 1}/${TRACKS.length}`;
    }

    function updateUI() {
        const titleEl = document.getElementById('track-title');
        const infoEl = document.getElementById('track-info');
        const fabEl = document.getElementById('musicFab') || document.getElementById('musicPlayBtn');
        const miniEl = document.getElementById('miniPlayer');

        if (titleEl) titleEl.textContent = getCurrentTitle();
        if (infoEl) infoEl.textContent = getTrackInfo();
        if (fabEl) fabEl.textContent = isPlaying ? '⏸️' : '▶️';
        if (miniEl) miniEl.classList.toggle('visible', true);
    }

    return {
        init, play, pause, toggle, nextTrack, prevTrack,
        reshufflePlaylist, getCurrentTitle, getTrackInfo,
        get isPlaying() { return isPlaying; },
        get totalTracks() { return TRACKS.length; }
    };
})();

// ===== SFX =====
const SFX = (() => {
    let ctx = null;
    let gain = null;

    function init() {
        if (ctx) return;
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        gain = ctx.createGain();
        gain.gain.value = 0.3;
        gain.connect(ctx.destination);
    }

    function note(freq, start, dur, type = 'sine') {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.6, start + 0.03);
        g.gain.linearRampToValueAtTime(0, start + dur);
        osc.connect(g);
        g.connect(gain);
        osc.start(start);
        osc.stop(start + dur + 0.01);
    }

    function t() { init(); return ctx.currentTime; }

    return {
        flip() { const n = t(); note(800, n, 0.08); note(1200, n + 0.06, 0.08); },
        match() { const n = t(); note(523, n, 0.1); note(659, n + 0.1, 0.1); note(784, n + 0.2, 0.15); note(1047, n + 0.35, 0.2, 'triangle'); },
        wrong() { const n = t(); note(300, n, 0.15, 'sawtooth'); note(250, n + 0.15, 0.2, 'sawtooth'); },
        win() { const n = t();[523, 659, 784, 880, 1047, 1175, 1319, 1568].forEach((f, i) => { note(f, n + i * 0.12, 0.2); if (i % 2 === 0) note(f / 2, n + i * 0.12, 0.25, 'triangle'); }); },
        click() { note(600, t(), 0.05); }
    };
})();

// Backward compat
const SoundSystem = {
    startMusic: () => MusicPlayer.play(),
    stopMusic: () => MusicPlayer.pause(),
    toggle: () => MusicPlayer.toggle(),
    get isPlaying() { return MusicPlayer.isPlaying; },
    sfxFlip: () => SFX.flip(),
    sfxMatch: () => SFX.match(),
    sfxWrong: () => SFX.wrong(),
    sfxWin: () => SFX.win(),
    sfxClick: () => SFX.click()
};
