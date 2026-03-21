/* ============================================ */
/* 🧩 Ghép Hình Vui — Game Logic (Fixed)        */
/* 20 Categories · 300+ Cards                   */
/* ============================================ */

const LIBRARY = {
    animals: { name: 'Động vật', emoji: '🐾', type: 'emoji', cards: ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🦄', '🐔', '🐧'] },
    fruits: { name: 'Trái cây', emoji: '🍎', type: 'emoji', cards: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍌', '🍉', '🥝', '🍒', '🥭', '🍍', '🫐', '🍐', '🥥', '🍈'] },
    transport: { name: 'Xe cộ', emoji: '🚗', type: 'emoji', cards: ['🚗', '🚕', '🚌', '🚎', '🚑', '🚒', '🚀', '✈️', '🚁', '⛵', '🚂', '🏍️', '🛸', '🚲', '🛴', '🚜'] },
    ocean: { name: 'Đại dương', emoji: '🐠', type: 'emoji', cards: ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🦀', '🦞', '🐚', '🐳', '🐬', '🦭', '🪸', '🐢', '🦐', '🪼'] },
    space: { name: 'Vũ trụ', emoji: '🚀', type: 'emoji', cards: ['🚀', '🛸', '🌍', '🌙', '⭐', '☀️', '🪐', '🌈', '☄️', '🔭', '👨‍🚀', '👩‍🚀', '🛰️', '🌌', '💫', '🌕'] },
    food: { name: 'Đồ ăn', emoji: '🍕', type: 'emoji', cards: ['🍕', '🍔', '🌭', '🍟', '🌮', '🍣', '🍱', '🧁', '🍩', '🍪', '🎂', '🍿', '🥐', '🧀', '🍗', '🥞'] },
    sports: { name: 'Thể thao', emoji: '⚽', type: 'emoji', cards: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥊', '🎯', '🏊', '🚴', '🤸', '⛷️', '🏄', '🤾'] },
    weather: { name: 'Thời tiết', emoji: '🌤️', type: 'emoji', cards: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌩️', '🌈', '❄️', '🌪️', '🌊', '💨', '🌫️', '☃️', '🌡️', '⚡', '🌦️'] },
    music: { name: 'Âm nhạc', emoji: '🎵', type: 'emoji', cards: ['🎵', '🎶', '🎹', '🎸', '🎺', '🥁', '🎻', '🎷', '🪗', '🎤', '🎧', '📻', '🪘', '🎙️', '🔔', '🎼'] },
    nature: { name: 'Hoa lá', emoji: '🌸', type: 'emoji', cards: ['🌸', '🌺', '🌻', '🌷', '🌹', '🍀', '🌲', '🌴', '🍁', '🌵', '🎋', '🪻', '🌾', '🍃', '🌿', '🪷'] },
    fantasy: { name: 'Cổ tích', emoji: '🧚', type: 'emoji', cards: ['🧚', '🧙', '🦄', '🐉', '👸', '🤴', '🏰', '🗡️', '🧝', '🧞', '🧜', '👻', '🎪', '🦸', '🧛', '🤖'] },
    faces: { name: 'Mặt cười', emoji: '😊', type: 'emoji', cards: ['😀', '😂', '🥰', '😎', '🤩', '😜', '🤗', '😇', '🥳', '🤠', '🤓', '😺', '👽', '🤪', '🥸', '😻'] },
    insects: { name: 'Côn trùng', emoji: '🦋', type: 'emoji', cards: ['🦋', '🐛', '🐝', '🐞', '🦗', '🪲', '🪳', '🦟', '🐜', '🕷️', '🦂', '🪱', '🐌', '🦠', '🪰', '🐾'] },
    flags: { name: 'Cờ quốc gia', emoji: '🏳️', type: 'emoji', cards: ['🇻🇳', '🇺🇸', '🇯🇵', '🇰🇷', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇨🇳', '🇧🇷', '🇦🇺', '🇨🇦', '🇪🇸', '🇷🇺', '🇮🇳', '🇹🇭'] },
    hands: { name: 'Cử chỉ', emoji: '👋', type: 'emoji', cards: ['👋', '👍', '👎', '✌️', '🤞', '🤟', '🤘', '👌', '🤏', '✋', '🖐️', '👊', '✊', '🤝', '🙏', '💪'] },
    shapes: { name: 'Hình khối', emoji: '🔷', type: 'emoji', cards: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⬛', '⬜', '🔶', '🔷', '🔺', '🔻', '💎', '⭕', '❤️', '💜'] },
    buildings: { name: 'Công trình', emoji: '🏰', type: 'emoji', cards: ['🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏰', '🏯', '⛪'] },
    letters_upper: {
        name: 'CHỮ HOA', emoji: '🔤', type: 'letter', cards:
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c, i) => ({
                char: c, color: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#D946EF', '#0891B2', '#059669'][i % 13]
            }))
    },
    letters_lower: {
        name: 'chữ thường', emoji: '🔡', type: 'letter', cards:
            'abcdefghijklmnopqrstuvwxyz'.split('').map((c, i) => ({
                char: c, color: ['#22C55E', '#0EA5E9', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#EAB308', '#14B8A6', '#6366F1', '#D946EF', '#0891B2', '#059669', '#F43F5E'][i % 13]
            }))
    },
    numbers: {
        name: 'Số đếm', emoji: '🔢', type: 'letter', cards:
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50, 100].map((n, i) => ({
                char: String(n), color: ['#6366F1', '#EC4899', '#F97316', '#14B8A6', '#8B5CF6', '#EF4444', '#22C55E', '#0EA5E9', '#F59E0B', '#E11D48', '#7C3AED', '#059669', '#DC2626'][i % 13]
            }))
    }
};

// ===== STATE =====
let G = { cat: 'animals', pairs: 6, deck: [], flipped: [], matchCount: 0, totalPairs: 0, moveCount: 0, sec: 0, timer: null, locked: false };

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('categories');
    Object.entries(LIBRARY).forEach(([k, v]) => {
        const b = document.createElement('button');
        b.className = 'cat-btn' + (k === G.cat ? ' active' : '');
        b.dataset.cat = k;
        b.innerHTML = `<span class="cat-emoji">${v.emoji}</span><span class="cat-name">${v.name}</span>`;
        b.onclick = () => {
            G.cat = k;
            grid.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            if (typeof SoundSystem !== 'undefined') SoundSystem.sfxClick();
        };
        grid.appendChild(b);
    });
});

function pickDiff(btn) {
    G.pairs = +btn.dataset.pairs;
    document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
}

// ===== START GAME =====
function startGame() {
    const lib = LIBRARY[G.cat];
    const n = Math.min(G.pairs, lib.cards.length);
    const picked = shuffle([...lib.cards]).slice(0, n);
    const deck = shuffle([...picked, ...picked]);

    G.deck = deck; G.flipped = []; G.matchCount = 0; G.totalPairs = n;
    G.moveCount = 0; G.sec = 0; G.locked = false;

    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('matched').innerHTML = `0/<span id="totalPairs">${n}</span>`;

    // Build board
    const board = document.getElementById('board');
    const cols = deck.length <= 12 ? 3 : deck.length <= 16 ? 4 : deck.length <= 25 ? 5 : 6;
    board.className = 'board c' + cols;
    board.innerHTML = '';

    deck.forEach((item, i) => {
        const isLetter = lib.type === 'letter';
        const key = isLetter ? item.char : item;
        const content = isLetter
            ? `<span class="card-letter" style="color:${item.color}">${item.char}</span>`
            : `<span class="card-emoji">${item}</span>`;

        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.key = key;
        card.dataset.theme = G.cat;
        card.onclick = () => flip(card);
        card.innerHTML = `<div class="card-inner"><div class="card-front"></div><div class="card-back">${content}</div></div>`;
        board.appendChild(card);
    });

    show('gameScreen');
    startTimer();

    // Quick preview
    setTimeout(() => {
        board.querySelectorAll('.card').forEach(c => c.classList.add('flipped'));
        setTimeout(() => board.querySelectorAll('.card').forEach(c => c.classList.remove('flipped')), 1200);
    }, 200);
}

// ===== FLIP & MATCH =====
function flip(card) {
    if (G.locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (G.flipped.length >= 2) return;

    card.classList.add('flipped');
    G.flipped.push(card);
    if (typeof SoundSystem !== 'undefined') SoundSystem.sfxFlip();

    if (G.flipped.length === 2) {
        G.moveCount++;
        document.getElementById('moves').textContent = G.moveCount;

        const [a, b] = G.flipped;
        G.locked = true;

        if (a.dataset.key === b.dataset.key) {
            if (typeof SoundSystem !== 'undefined') SoundSystem.sfxMatch();
            setTimeout(() => {
                a.classList.add('matched'); a.classList.remove('flipped');
                b.classList.add('matched'); b.classList.remove('flipped');
                G.matchCount++;
                document.getElementById('matched').innerHTML = `${G.matchCount}/<span id="totalPairs">${G.totalPairs}</span>`;
                G.flipped = []; G.locked = false;
                if (G.matchCount === G.totalPairs) setTimeout(showWin, 500);
            }, 350);
        } else {
            if (typeof SoundSystem !== 'undefined') SoundSystem.sfxWrong();
            setTimeout(() => {
                a.classList.add('wrong'); b.classList.add('wrong');
                setTimeout(() => {
                    a.classList.remove('flipped', 'wrong');
                    b.classList.remove('flipped', 'wrong');
                    G.flipped = []; G.locked = false;
                }, 450);
            }, 600);
        }
    }
}

// ===== TIMER =====
function startTimer() {
    clearInterval(G.timer);
    G.timer = setInterval(() => {
        G.sec++;
        document.getElementById('timer').textContent =
            String(Math.floor(G.sec / 60)).padStart(2, '0') + ':' + String(G.sec % 60).padStart(2, '0');
    }, 1000);
}

// ===== WIN =====
function showWin() {
    clearInterval(G.timer);
    const t = String(Math.floor(G.sec / 60)).padStart(2, '0') + ':' + String(G.sec % 60).padStart(2, '0');
    document.getElementById('winTime').textContent = t;
    document.getElementById('winMoves').textContent = G.moveCount;

    const r = G.totalPairs / G.moveCount;
    document.getElementById('winStars').textContent = r >= 0.75 ? '⭐⭐⭐' : r >= 0.45 ? '⭐⭐' : '⭐';

    // Confetti
    const c = document.getElementById('confetti');
    c.innerHTML = '';
    const colors = ['#FF6B9D', '#6C63FF', '#FFD93D', '#6BCB77', '#00B4D8', '#FF8C42'];
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'confetti-piece';
        Object.assign(p.style, {
            left: Math.random() * 100 + '%',
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: Math.random() * 3 + 's',
            animationDuration: (2 + Math.random() * 2) + 's',
            width: (5 + Math.random() * 8) + 'px',
            height: (5 + Math.random() * 8) + 'px',
            borderRadius: Math.random() > 0.5 ? '50%' : '2px'
        });
        c.appendChild(p);
    }

    if (typeof SoundSystem !== 'undefined') SoundSystem.sfxWin();
    show('winScreen');
}

// ===== NAV =====
function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}
function goHome() { clearInterval(G.timer); show('startScreen'); }
function restartGame() { clearInterval(G.timer); startGame(); }

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
