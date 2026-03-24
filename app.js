/* ============================================ */
/* 🧩 Ghép Hình Vui — Game Logic v3              */
/* 30+ Theme Packs · Auto-rotate · 500+ Cards   */
/* ============================================ */

// ===== THEME PACKS (auto-rotate every 3 hours) =====
const THEME_PACKS = [
    {
        name: '🌈 Cơ bản', id: 'basic',
        cats: {
            animals: { name: 'Động vật', emoji: '🐾', cards: ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵', '🦄', '🐔', '🐧'] },
            fruits: { name: 'Trái cây', emoji: '🍎', cards: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍌', '🍉', '🥝', '🍒', '🥭', '🍍', '🫐', '🍐', '🥥', '🍈'] },
            transport: { name: 'Xe cộ', emoji: '🚗', cards: ['🚗', '🚕', '🚌', '🚎', '🚑', '🚒', '🚀', '✈️', '🚁', '⛵', '🚂', '🏍️', '🛸', '🚲', '🛴', '🚜'] },
            ocean: { name: 'Đại dương', emoji: '🐠', cards: ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🦀', '🦞', '🐚', '🐳', '🐬', '🦭', '🪸', '🐢', '🦐', '🪼'] },
            food: { name: 'Đồ ăn', emoji: '🍕', cards: ['🍕', '🍔', '🌭', '🍟', '🌮', '🍣', '🍱', '🧁', '🍩', '🍪', '🎂', '🍿', '🥐', '🧀', '🍗', '🥞'] },
            faces: { name: 'Mặt cười', emoji: '😊', cards: ['😀', '😂', '🥰', '😎', '🤩', '😜', '🤗', '😇', '🥳', '🤠', '🤓', '😺', '👽', '🤪', '🥸', '😻'] },
        }
    },
    {
        name: '⚡ Pokemon', id: 'pokemon',
        cats: {
            fire: { name: 'Hệ Lửa', emoji: '🔥', cards: ['🔥', '🌋', '☄️', '🐉', '🦊', '🐎', '🐓', '🦅', '💥', '🌶️', '🕯️', '🔴', '🧨', '🏮', '🎆', '🌞'] },
            water: { name: 'Hệ Nước', emoji: '💧', cards: ['💧', '🌊', '🐢', '🐊', '🦈', '🐟', '🦑', '🐙', '🐬', '🐳', '🫧', '💦', '🧊', '❄️', '🌧️', '🪸'] },
            grass: { name: 'Hệ Cỏ', emoji: '🌿', cards: ['🌿', '🌱', '🌳', '🌴', '🍀', '🌻', '🌺', '🌸', '🍃', '🍂', '🎋', '🌵', '🌾', '🪴', '🍄', '🪻'] },
            electric: { name: 'Hệ Điện', emoji: '⚡', cards: ['⚡', '🔌', '💡', '🔋', '⭐', '✨', '💫', '🌩️', '🌟', '🔆', '🎇', '💛', '🟡', '📡', '🎯', '🏆'] },
            psychic: { name: 'Hệ Tâm Linh', emoji: '🔮', cards: ['🔮', '🧿', '👁️', '🌙', '🪐', '🌌', '🛸', '🎭', '🃏', '🪄', '🎩', '💜', '🟣', '🦋', '💎', '🌀'] },
            fairy: { name: 'Hệ Tiên', emoji: '🧚', cards: ['🧚', '🦄', '🌈', '💖', '🎀', '👑', '💍', '🌷', '🦢', '🕊️', '🎵', '💗', '🌸', '✨', '🎪', '🌟'] },
        }
    },
    {
        name: '🍥 Naruto', id: 'naruto',
        cats: {
            ninja: { name: 'Nhẫn giả', emoji: '🥷', cards: ['🥷', '⚔️', '🗡️', '🏯', '🎯', '🥊', '🪤', '🛡️', '🪖', '🎪', '🗻', '🌪️', '💨', '👊', '✊', '🤛'] },
            elements: { name: 'Ngũ hành', emoji: '🔥', cards: ['🔥', '💧', '🌍', '💨', '⚡', '🌊', '🌋', '❄️', '🌪️', '☄️', '🪨', '🌿', '🌙', '☀️', '🌈', '⭐'] },
            summons: { name: 'Triệu hồi', emoji: '🐸', cards: ['🐸', '🐍', '🐌', '🦊', '🦅', '🐕', '🐒', '🐘', '🦎', '🐢', '🐜', '🕷️', '🦂', '🐛', '🐝', '🦇'] },
            weapons: { name: 'Vũ khí', emoji: '⚔️', cards: ['⚔️', '🗡️', '🏹', '🔱', '🛡️', '💣', '🧨', '🪃', '🔧', '🔨', '⛏️', '🔪', '🪓', '🏏', '🥢', '📿'] },
            village: { name: 'Làng ninja', emoji: '🏯', cards: ['🏯', '⛩️', '🗾', '🎋', '🎑', '🏔️', '🌊', '🌅', '🌃', '🏙️', '🎎', '🎏', '🪭', '🧧', '🏮', '🎐'] },
            jutsu: { name: 'Nhẫn thuật', emoji: '🌀', cards: ['🌀', '💥', '🔥', '⚡', '💧', '🌪️', '☄️', '💫', '✨', '🌟', '💢', '💠', '🔆', '🌑', '🌕', '♾️'] },
        }
    },
    {
        name: '📚 Học tập', id: 'learning',
        cats: {
            letters_upper: {
                name: 'CHỮ HOA', emoji: '🔤', type: 'letter', cards:
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c, i) => ({ char: c, color: ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#D946EF', '#0891B2', '#059669'][i % 13] }))
            },
            letters_lower: {
                name: 'chữ thường', emoji: '🔡', type: 'letter', cards:
                    'abcdefghijklmnopqrstuvwxyz'.split('').map((c, i) => ({ char: c, color: ['#22C55E', '#0EA5E9', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#EAB308', '#14B8A6', '#6366F1', '#D946EF', '#0891B2', '#059669', '#F43F5E'][i % 13] }))
            },
            numbers: {
                name: 'Số đếm', emoji: '🔢', type: 'letter', cards:
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50, 100].map((n, i) => ({ char: String(n), color: ['#6366F1', '#EC4899', '#F97316', '#14B8A6', '#8B5CF6', '#EF4444', '#22C55E', '#0EA5E9', '#F59E0B', '#E11D48', '#7C3AED', '#059669', '#DC2626'][i % 13] }))
            },
            shapes: { name: 'Hình khối', emoji: '🔷', cards: ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⬛', '⬜', '🔶', '🔷', '🔺', '🔻', '💎', '⭕', '❤️', '💜'] },
            science: { name: 'Khoa học', emoji: '🔬', cards: ['🔬', '🧪', '⚗️', '🧬', '🔭', '🌡️', '💊', '🩺', '🧲', '⚙️', '🔩', '💡', '🔋', '📡', '🛰️', '🧫'] },
            math: {
                name: 'Toán', emoji: '➕', type: 'letter', cards:
                    ['+', '-', '×', '÷', '=', '<', '>', '%', 'π', '∞', '√', 'Σ', 'Δ', '∫', '∝', '≈'].map((c, i) => ({ char: c, color: ['#EF4444', '#0EA5E9', '#22C55E', '#F97316', '#6366F1', '#EC4899', '#8B5CF6', '#14B8A6', '#EAB308', '#D946EF', '#0891B2', '#059669', '#F43F5E'][i % 13] }))
            },
        }
    },
    {
        name: '🎨 Nghệ thuật', id: 'art',
        cats: {
            colors: { name: 'Màu sắc', emoji: '🎨', cards: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💗', '💖', '💝', '💕', '🩵', '🩷', '🩶'] },
            music: { name: 'Âm nhạc', emoji: '🎵', cards: ['🎵', '🎶', '🎹', '🎸', '🎺', '🥁', '🎻', '🎷', '🪗', '🎤', '🎧', '📻', '🪘', '🎙️', '🔔', '🎼'] },
            art_tools: { name: 'Dụng cụ vẽ', emoji: '🖌️', cards: ['🖌️', '✏️', '🖍️', '🖊️', '📏', '📐', '✂️', '📎', '🎨', '📝', '📒', '🗂️', '📌', '🖼️', '🎭', '🪡'] },
            flowers: { name: 'Hoa', emoji: '🌸', cards: ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🪻', '🪷', '🌿', '🍀', '🎋', '🌾', '🌵', '🪴', '🎍'] },
            stars: { name: 'Ngôi sao', emoji: '⭐', cards: ['⭐', '🌟', '✨', '💫', '🔆', '☀️', '🌙', '🌛', '🌜', '🌝', '🌞', '💥', '🎆', '🎇', '🪩', '🔮'] },
            fashion: { name: 'Thời trang', emoji: '👗', cards: ['👗', '👠', '👒', '🧢', '👓', '👜', '💍', '👑', '🎀', '🧣', '🧤', '🧥', '👔', '👕', '👖', '🥿'] },
        }
    },
    {
        name: '🌍 Khám phá', id: 'explore',
        cats: {
            space: { name: 'Vũ trụ', emoji: '🚀', cards: ['🚀', '🛸', '🌍', '🌙', '⭐', '☀️', '🪐', '🌈', '☄️', '🔭', '👨‍🚀', '👩‍🚀', '🛰️', '🌌', '💫', '🌕'] },
            weather: { name: 'Thời tiết', emoji: '🌤️', cards: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌩️', '🌈', '❄️', '🌪️', '🌊', '💨', '🌫️', '☃️', '🌡️', '⚡', '🌦️'] },
            flags: { name: 'Cờ quốc gia', emoji: '🏳️', cards: ['🇻🇳', '🇺🇸', '🇯🇵', '🇰🇷', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇨🇳', '🇧🇷', '🇦🇺', '🇨🇦', '🇪🇸', '🇷🇺', '🇮🇳', '🇹🇭'] },
            buildings: { name: 'Công trình', emoji: '🏰', cards: ['🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏰', '🏯', '⛪'] },
            insects: { name: 'Côn trùng', emoji: '🦋', cards: ['🦋', '🐛', '🐝', '🐞', '🦗', '🪲', '🪳', '🦟', '🐜', '🕷️', '🦂', '🪱', '🐌', '🦠', '🪰', '🐾'] },
            hands: { name: 'Cử chỉ', emoji: '👋', cards: ['👋', '👍', '👎', '✌️', '🤞', '🤟', '🤘', '👌', '🤏', '✋', '🖐️', '👊', '✊', '🤝', '🙏', '💪'] },
        }
    },
    {
        name: '🏰 Cổ tích', id: 'fairy',
        cats: {
            fantasy: { name: 'Phép thuật', emoji: '🧙', cards: ['🧚', '🧙', '🦄', '🐉', '👸', '🤴', '🏰', '🗡️', '🧝', '🧞', '🧜', '👻', '🎪', '🦸', '🧛', '🤖'] },
            disney: { name: 'Hoàng tử', emoji: '👑', cards: ['👑', '🏰', '🐟', '🦢', '🪄', '🎭', '🌹', '🪞', '🎠', '🃏', '🗝️', '📜', '🧊', '💫', '🦋', '🌙'] },
            monsters: { name: 'Quái vật', emoji: '👹', cards: ['👹', '👺', '👻', '💀', '☠️', '👽', '🤖', '🎃', '😈', '👿', '🧟', '🧌', '🦠', '🐲', '🐉', '🦖'] },
            treasure: { name: 'Kho báu', emoji: '💎', cards: ['💎', '💰', '🪙', '👑', '🏅', '🎖️', '🏆', '💍', '📿', '🔮', '🪬', '🧿', '⚱️', '🏺', '🗝️', '🔒'] },
            magic: { name: 'Ma thuật', emoji: '🪄', cards: ['🪄', '⚡', '🔥', '❄️', '💫', '🌟', '✨', '🌀', '💠', '🔆', '🌈', '🎆', '🎇', '💥', '♾️', '🕯️'] },
            heroes: { name: 'Siêu anh hùng', emoji: '🦸', cards: ['🦸', '🦹', '🤺', '🏋️', '🤸', '⛹️', '🏄', '🚴', '🤼', '🤾', '🥋', '🏇', '🤿', '🧗', '🪂', '🏂'] },
        }
    },
    {
        name: '🎮 Game', id: 'gaming',
        cats: {
            sports: { name: 'Thể thao', emoji: '⚽', cards: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥊', '🎯', '🏊', '🚴', '🤸', '⛷️', '🏄', '🤾'] },
            tools: { name: 'Công cụ', emoji: '🔧', cards: ['🔧', '🔨', '⛏️', '🪚', '🔩', '⚙️', '🗜️', '🪛', '🧰', '🪤', '🧲', '🔬', '🔭', '🧪', '🪜', '🧯'] },
            food2: { name: 'Bánh kẹo', emoji: '🍬', cards: ['🍬', '🍭', '🍫', '🍩', '🧁', '🎂', '🍰', '🍮', '🍧', '🍨', '🍦', '🥧', '🍡', '🍢', '🧇', '🥨'] },
            nature: { name: 'Thiên nhiên', emoji: '🌲', cards: ['🌲', '🌳', '🌴', '🏔️', '🌋', '🏖️', '🏜️', '🌊', '🏞️', '🌅', '🌄', '🌠', '🌉', '🌁', '🏕️', '🦜'] },
            tech: { name: 'Công nghệ', emoji: '💻', cards: ['💻', '📱', '⌚', '📷', '🎮', '🕹️', '🖥️', '⌨️', '🖨️', '🔌', '💾', '📀', '📡', '🤖', '🔋', '📟'] },
            emoji_mix: { name: 'Emoji Mix', emoji: '🎲', cards: ['🦋', '🌈', '🎭', '🎪', '🎡', '🎢', '🎠', '🎨', '🧩', '🪆', '🪁', '🎯', '🪀', '🎳', '🎰', '🧸'] },
        }
    },
    {
        name: '🦕 Khám phá mới', id: 'discovery',
        cats: {
            dinos: { name: 'Khủng long', emoji: '🦕', cards: ['🦕', '🦖', '🐊', '🦎', '🐉', '🐲', '🪺', '🥚', '🌿', '🌋', '🏔️', '🪨', '🦴', '🐾', '🌲', '🍃'] },
            robots: { name: 'Robot', emoji: '🤖', cards: ['🤖', '🔧', '⚙️', '🔩', '🛸', '📡', '🔋', '💡', '🖥️', '🕹️', '🎮', '📱', '⌚', '🔌', '💾', '🧲'] },
            desserts: { name: 'Tráng miệng', emoji: '🧁', cards: ['🧁', '🍰', '🎂', '🍩', '🍪', '🍫', '🍬', '🍭', '🍡', '🍮', '🥧', '🍦', '🍨', '🧇', '🥞', '🍯'] },
            sea: { name: 'Biển sâu', emoji: '🐋', cards: ['🐋', '🐳', '🐬', '🦈', '🐙', '🦑', '🦞', '🦀', '🐡', '🐠', '🐟', '🪸', '🐚', '🦭', '🐢', '🪼'] },
            birds: { name: 'Chim chóc', emoji: '🦜', cards: ['🦜', '🦅', '🦆', '🦢', '🕊️', '🐧', '🦉', '🦩', '🐦', '🐤', '🐣', '🐔', '🦃', '🦚', '🦤', '🪿'] },
            instruments: { name: 'Nhạc cụ', emoji: '🎸', cards: ['🎸', '🎹', '🎺', '🥁', '🎻', '🎷', '🪗', '🎤', '🎧', '📻', '🪘', '🎙️', '🔔', '🎼', '🪈', '🪕'] },
        }
    },
];

// ===== AUTO-ROTATION LOGIC =====
function getCurrentPack() {
    const hour = new Date().getHours();
    const packIndex = Math.floor(hour / 3) % THEME_PACKS.length;
    return THEME_PACKS[packIndex];
}

function getPackByTime() {
    const saved = localStorage.getItem('forcedPack');
    if (saved) return THEME_PACKS.find(p => p.id === saved) || getCurrentPack();
    return getCurrentPack();
}

// ===== STATE =====
let G = {
    cat: null, pairs: 6, deck: [], flipped: [], matchCount: 0,
    totalPairs: 0, moveCount: 0, sec: 0, timer: null, locked: false,
    currentPack: null
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    G.currentPack = getPackByTime();
    renderPackSelector();
    renderCategories();

    // Check for pack rotation every minute
    setInterval(() => {
        if (!localStorage.getItem('forcedPack')) {
            const newPack = getCurrentPack();
            if (newPack.id !== G.currentPack.id) {
                G.currentPack = newPack;
                renderCategories();
                updatePackDisplay();
            }
        }
    }, 60000);
});

function renderPackSelector() {
    const container = document.getElementById('packSelector');
    if (!container) return;
    container.innerHTML = '';
    THEME_PACKS.forEach(pack => {
        const btn = document.createElement('button');
        btn.className = 'pack-btn' + (pack.id === G.currentPack.id ? ' active' : '');
        btn.textContent = pack.name;
        btn.onclick = () => {
            G.currentPack = pack;
            localStorage.setItem('forcedPack', pack.id);
            renderCategories();
            container.querySelectorAll('.pack-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePackDisplay();
        };
        container.appendChild(btn);
    });
}

function updatePackDisplay() {
    const el = document.getElementById('currentPackName');
    if (el) el.textContent = G.currentPack.name;
}

function renderCategories() {
    const grid = document.getElementById('categories');
    if (!grid) return;
    grid.innerHTML = '';
    const cats = G.currentPack.cats;
    const keys = Object.keys(cats);
    G.cat = keys[0];

    keys.forEach(k => {
        const v = cats[k];
        const b = document.createElement('button');
        b.className = 'cat-btn' + (k === G.cat ? ' active' : '');
        b.innerHTML = `<span class="cat-emoji">${v.emoji}</span><span class="cat-name">${v.name}</span>`;
        b.onclick = () => {
            G.cat = k;
            grid.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            if (typeof SFX !== 'undefined') SFX.click();
        };
        grid.appendChild(b);
    });
}

function pickDiff(btn) {
    G.pairs = +btn.dataset.pairs;
    document.querySelectorAll('.diff').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    if (typeof SFX !== 'undefined') SFX.click();
}

// ===== START GAME =====
function startGame() {
    const lib = G.currentPack.cats[G.cat];
    if (!lib) return;
    const isLetter = lib.type === 'letter';
    const n = Math.min(G.pairs, lib.cards.length);
    const picked = shuffle([...lib.cards]).slice(0, n);
    const deck = shuffle([...picked, ...picked]);

    G.deck = deck; G.flipped = []; G.matchCount = 0; G.totalPairs = n;
    G.moveCount = 0; G.sec = 0; G.locked = false;

    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('matched').innerHTML = `0/<span id="totalPairs">${n}</span>`;

    const board = document.getElementById('board');
    const cols = deck.length <= 12 ? 3 : deck.length <= 16 ? 4 : deck.length <= 25 ? 5 : 6;
    board.className = 'board c' + cols;
    board.innerHTML = '';

    deck.forEach((item) => {
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
    if (typeof SFX !== 'undefined') SFX.flip();

    if (G.flipped.length === 2) {
        G.moveCount++;
        document.getElementById('moves').textContent = G.moveCount;
        const [a, b] = G.flipped;
        G.locked = true;

        if (a.dataset.key === b.dataset.key) {
            if (typeof SFX !== 'undefined') SFX.match();
            setTimeout(() => {
                a.classList.add('matched'); a.classList.remove('flipped');
                b.classList.add('matched'); b.classList.remove('flipped');
                G.matchCount++;
                document.getElementById('matched').innerHTML = `${G.matchCount}/<span id="totalPairs">${G.totalPairs}</span>`;
                G.flipped = []; G.locked = false;
                if (G.matchCount === G.totalPairs) setTimeout(showWin, 500);
            }, 350);
        } else {
            if (typeof SFX !== 'undefined') SFX.wrong();
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
    if (typeof SFX !== 'undefined') SFX.win();
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
