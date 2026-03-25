/* ============================================ */
/* 🎵 Kids Memory Game — Music + SFX v4          */
/* 5 bài nhạc mới — NO auto-play                 */
/* Web Audio API synthesizer                     */
/* ============================================ */

const MusicPlayer = (() => {
    let ctx = null, masterGain = null, isPlaying = false, melodyTimer = null, currentTrack = 0;

    const N = {
        C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
        C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99,
        G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
        C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.26, F5: 698.46, G5: 783.99, A5: 880.00
    };

    const TRACKS = [
        {
            name: '🎹 Bà Ơi Bà',
            melody: [N.E4, N.E4, N.G4, N.G4, N.A4, N.A4, N.G4, N.G4,
            N.E4, N.E4, N.D4, N.D4, N.C4, N.C4, N.C4, N.C4,
            N.D4, N.D4, N.E4, N.E4, N.G4, N.G4, N.A4, N.G4,
            N.E4, N.D4, N.C4, N.D4, N.E4, N.D4, N.C4, N.C4],
            bass: [N.C3, N.G3, N.A3, N.E3, N.F3, N.C3, N.G3, N.C3],
            tempo: 280, wave: 'sine'
        },
        {
            name: '🌈 Cả Nhà Thương Nhau',
            melody: [N.C4, N.E4, N.G4, N.E4, N.F4, N.A4, N.G4, N.E4,
            N.D4, N.F4, N.E4, N.D4, N.C4, N.E4, N.D4, N.C4,
            N.G4, N.A4, N.G4, N.E4, N.D4, N.E4, N.F4, N.G4,
            N.A4, N.G4, N.F4, N.E4, N.D4, N.E4, N.C4, N.C4],
            bass: [N.C3, N.F3, N.G3, N.C3, N.F3, N.G3, N.A3, N.C3],
            tempo: 300, wave: 'triangle'
        },
        {
            name: '🐝 Con Ong Vàng',
            melody: [N.G4, N.E4, N.G4, N.A4, N.G4, N.E4, N.D4, N.C4,
            N.D4, N.E4, N.F4, N.G4, N.A4, N.G4, N.F4, N.E4,
            N.C5, N.A4, N.G4, N.E4, N.D4, N.E4, N.G4, N.A4,
            N.G4, N.F4, N.E4, N.D4, N.C4, N.D4, N.C4, N.C4],
            bass: [N.C3, N.E3, N.G3, N.C3, N.F3, N.A3, N.G3, N.C3],
            tempo: 240, wave: 'sine'
        },
        {
            name: '🎠 London Bridge',
            melody: [N.G4, N.A4, N.G4, N.F4, N.E4, N.F4, N.G4, N.G4,
            N.D4, N.E4, N.F4, N.F4, N.E4, N.F4, N.G4, N.G4,
            N.G4, N.A4, N.G4, N.F4, N.E4, N.F4, N.G4, N.G4,
            N.D4, N.D4, N.G4, N.E4, N.F4, N.G4, N.C4, N.C4],
            bass: [N.G3, N.D3, N.E3, N.G3, N.C3, N.G3, N.D3, N.G3],
            tempo: 260, wave: 'sine'
        },
        {
            name: '🦋 Cháu Lên Ba',
            melody: [N.C4, N.D4, N.E4, N.G4, N.A4, N.G4, N.E4, N.D4,
            N.C4, N.D4, N.E4, N.G4, N.E4, N.D4, N.C4, N.C4,
            N.A4, N.G4, N.E4, N.G4, N.A4, N.C5, N.A4, N.G4,
            N.E4, N.G4, N.A4, N.G4, N.E4, N.D4, N.C4, N.C4],
            bass: [N.C3, N.G3, N.A3, N.E3, N.F3, N.C3, N.G3, N.C3],
            tempo: 250, wave: 'triangle'
        }
    ];

    let phraseIndex = 0;

    function init() { currentTrack = 0; updateUI(); }

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
        if (!ctx) return;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(vol, time + 0.04);
        g.gain.setValueAtTime(vol * 0.7, time + dur * 0.6);
        g.gain.linearRampToValueAtTime(0, time + dur);
        o.connect(g); g.connect(masterGain);
        o.start(time); o.stop(time + dur + 0.02);
    }

    function generateMelody() {
        if (!isPlaying || !ctx) return;
        const track = TRACKS[currentTrack];
        const mel = track.melody;
        const bas = track.bass;
        const now = ctx.currentTime;
        const noteDur = track.tempo / 1000;

        for (let i = 0; i < 8; i++) {
            const noteIdx = (phraseIndex * 8 + i) % mel.length;
            const freq = mel[noteIdx];
            const tm = now + i * noteDur;
            const dur = noteDur * 0.8;
            playNote(freq, tm, dur, track.wave || 'sine', 0.35);
            if (i % 2 === 0) playNote(freq * 1.5, tm, dur * 0.5, 'triangle', 0.08);
        }

        const bassIdx = (phraseIndex * 2) % bas.length;
        playNote(bas[bassIdx], now, noteDur * 4, 'triangle', 0.18);
        playNote(bas[(bassIdx + 1) % bas.length], now + noteDur * 4, noteDur * 4, 'triangle', 0.12);

        phraseIndex++;
        if (phraseIndex * 8 >= mel.length) phraseIndex = 0;
        melodyTimer = setTimeout(generateMelody, track.tempo * 8);
    }

    function play() { ensureCtx(); isPlaying = true; phraseIndex = 0; generateMelody(); updateUI(); }
    function pause() { isPlaying = false; clearTimeout(melodyTimer); updateUI(); }
    function toggle() { if (isPlaying) pause(); else play(); return isPlaying; }
    function nextTrack() { const w = isPlaying; pause(); currentTrack = (currentTrack + 1) % TRACKS.length; phraseIndex = 0; if (w) setTimeout(play, 100); updateUI(); }
    function prevTrack() { const w = isPlaying; pause(); currentTrack = (currentTrack - 1 + TRACKS.length) % TRACKS.length; phraseIndex = 0; if (w) setTimeout(play, 100); updateUI(); }
    function reshufflePlaylist() { const w = isPlaying; pause(); currentTrack = Math.floor(Math.random() * TRACKS.length); phraseIndex = 0; if (w) setTimeout(play, 100); updateUI(); }

    function updateUI() {
        const el = id => document.getElementById(id);
        if (el('track-title')) el('track-title').textContent = isPlaying ? TRACKS[currentTrack].name : '🎵 Nhấn ▶ để phát nhạc nền';
        if (el('track-info')) el('track-info').textContent = `${currentTrack + 1}/${TRACKS.length}`;
        const btn = el('musicPlayBtn') || el('musicFab');
        if (btn) btn.textContent = isPlaying ? '⏸️' : '▶️';
    }

    return {
        init, play, pause, toggle, nextTrack, prevTrack,
        reshufflePlaylist,
        get isPlaying() { return isPlaying; },
        get totalTracks() { return TRACKS.length; }
    };
})();

// ===== SFX =====
const SFX = (() => {
    let ctx = null, gain = null;

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
        const osc = ctx.createOscillator(), g = ctx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(0.6, start + 0.03);
        g.gain.linearRampToValueAtTime(0, start + dur);
        osc.connect(g); g.connect(gain);
        osc.start(start); osc.stop(start + dur + 0.01);
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
