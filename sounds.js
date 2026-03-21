/* ============================================ */
/* 🎵 Sound System — Procedural Kids Music      */
/* Web Audio API — no external files needed      */
/* ============================================ */

const SoundSystem = (() => {
    let ctx = null;
    let musicGain = null;
    let sfxGain = null;
    let isPlaying = false;
    let melodyTimeout = null;
    let currentOscillators = [];

    // Pentatonic scale notes (happy, kid-friendly)
    const NOTES = {
        C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
        C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00,
        C6: 1046.50
    };

    // Cute melody patterns (pentatonic = always sounds good)
    const MELODIES = [
        ['C5', 'E5', 'G5', 'E5', 'C5', 'D5', 'E5', 'C5'],
        ['G4', 'A4', 'C5', 'D5', 'E5', 'D5', 'C5', 'A4'],
        ['E5', 'D5', 'C5', 'D5', 'E5', 'E5', 'E5', 'D5'],
        ['C5', 'C5', 'G4', 'G4', 'A4', 'A4', 'G4', 'G4'],
        ['E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'D5'],
        ['G5', 'E5', 'C5', 'D5', 'E5', 'G5', 'A5', 'G5'],
        ['C5', 'D5', 'E5', 'G5', 'A5', 'G5', 'E5', 'C5'],
        ['A4', 'C5', 'E5', 'C5', 'A4', 'G4', 'A4', 'C5'],
    ];

    function init() {
        if (ctx) return;
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        musicGain = ctx.createGain();
        musicGain.gain.value = 0.12;
        musicGain.connect(ctx.destination);
        sfxGain = ctx.createGain();
        sfxGain.gain.value = 0.3;
        sfxGain.connect(ctx.destination);
    }

    // Play a single note
    function playNote(freq, startTime, duration, type = 'sine', gainNode = musicGain) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        // Soft envelope
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.8, startTime + 0.03);
        noteGain.gain.linearRampToValueAtTime(0.4, startTime + duration * 0.5);
        noteGain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.01);
        currentOscillators.push(osc);

        return osc;
    }

    // Play bass accompaniment
    function playBass(freq, startTime, duration) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq / 2; // One octave lower

        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
        noteGain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(noteGain);
        noteGain.connect(musicGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.01);
        currentOscillators.push(osc);
    }

    // Play a full melody pattern
    function playMelody() {
        if (!isPlaying || !ctx) return;

        const melody = MELODIES[Math.floor(Math.random() * MELODIES.length)];
        const tempo = 0.22; // seconds per note
        const now = ctx.currentTime;

        melody.forEach((noteName, i) => {
            const freq = NOTES[noteName];
            if (!freq) return;

            // Main melody (sine - soft)
            playNote(freq, now + i * tempo, tempo * 0.85, 'sine');

            // Sparkle layer (triangle - every other note)
            if (i % 2 === 0) {
                playNote(freq * 2, now + i * tempo, tempo * 0.4, 'triangle');
            }

            // Bass on beats 0, 2, 4, 6
            if (i % 2 === 0) {
                playBass(freq, now + i * tempo, tempo * 1.8);
            }
        });

        // Schedule next melody
        const totalDuration = melody.length * tempo;
        melodyTimeout = setTimeout(() => playMelody(), totalDuration * 1000);
    }

    // === PUBLIC API ===

    function startMusic() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        isPlaying = true;
        playMelody();
    }

    function stopMusic() {
        isPlaying = false;
        if (melodyTimeout) clearTimeout(melodyTimeout);
        currentOscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        currentOscillators = [];
    }

    function toggle() {
        if (isPlaying) { stopMusic(); } else { startMusic(); }
        return isPlaying;
    }

    // === SOUND EFFECTS ===

    function sfxFlip() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        playNote(800, now, 0.08, 'sine', sfxGain);
        playNote(1200, now + 0.06, 0.08, 'sine', sfxGain);
    }

    function sfxMatch() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        playNote(523, now, 0.1, 'sine', sfxGain);
        playNote(659, now + 0.1, 0.1, 'sine', sfxGain);
        playNote(784, now + 0.2, 0.15, 'sine', sfxGain);
        playNote(1047, now + 0.35, 0.2, 'triangle', sfxGain);
    }

    function sfxWrong() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        playNote(300, now, 0.15, 'sawtooth', sfxGain);
        playNote(250, now + 0.15, 0.2, 'sawtooth', sfxGain);
    }

    function sfxWin() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const fanfare = [523, 659, 784, 880, 1047, 1175, 1319, 1568];
        fanfare.forEach((f, i) => {
            playNote(f, now + i * 0.12, 0.2, 'sine', sfxGain);
            if (i % 2 === 0) playNote(f / 2, now + i * 0.12, 0.25, 'triangle', sfxGain);
        });
    }

    function sfxClick() {
        init();
        if (ctx.state === 'suspended') ctx.resume();
        playNote(600, ctx.currentTime, 0.05, 'sine', sfxGain);
    }

    return {
        startMusic, stopMusic, toggle, get isPlaying() { return isPlaying; },
        sfxFlip, sfxMatch, sfxWrong, sfxWin, sfxClick
    };
})();
