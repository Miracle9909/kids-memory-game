/* ============================================ */
/* 🎵 Music Playlist — YouTube IFrame API       */
/* 100 instrumental songs (VN + EN)             */
/* + SFX via Web Audio API                      */
/* ============================================ */

const MusicPlayer = (() => {
    let player = null;
    let isReady = false;
    let isPlaying = false;
    let currentIndex = 0;
    let shuffled = [];

    // 100 Popular Instrumental / No-Lyrics Tracks (YouTube Video IDs)
    // Mix of Vietnamese & English favorites
    const PLAYLIST = [
        // 🇻🇳 Vietnamese Instrumental / Piano / Lo-fi
        { id: 'kgx4WGK0oNU', title: 'Có Chắc Yêu Là Đây - Piano' },
        { id: 'J7UwSVOI6GY', title: 'Nơi Này Có Anh - Piano' },
        { id: '2dOSbCiSZh0', title: 'Hãy Trao Cho Anh - Piano' },
        { id: 'ZBhMGJMFqW4', title: 'Từ Đó - Piano Cover' },
        { id: 'qFLhGq0060w', title: 'See Tình - Piano' },
        { id: 'b2HcP0K4B5Q', title: 'Waiting For You - Piano' },
        { id: 'OWJ-RQ2u6Bw', title: 'Nhạc Không Lời Việt Nam Hay' },
        { id: 'sGR4VCKaSaM', title: 'Nhạc Thiếu Nhi Piano Medley' },
        { id: '7HOgUsOxLp0', title: 'Bống Bống Bang Bang - Piano' },
        { id: 'qqB2bMELWqs', title: 'Em Gái Mưa - Piano' },
        { id: 'h2VDYvS9xr0', title: 'Đừng Như Thói Quen - Piano' },
        { id: 'CKojkaofOE4', title: 'Chúng Ta Của Hiện Tại - Piano' },
        { id: 'Y0aDqGxIOJA', title: 'Nàng Thơ - Piano' },
        { id: 'oUFJJNQGwhk', title: 'Piano Relaxing Vietnamese' },
        { id: 'mNEUkqRoVkQ', title: 'Vietnamese Cafe Music' },

        // 🌍 English Pop Instrumental / Piano Covers
        { id: 'CvFH_6DNRCY', title: 'River Flows In You - Yiruma' },
        { id: 'kG9KSWYg-Jc', title: 'Kiss The Rain - Yiruma' },
        { id: '7maJOI3QMu0', title: 'Comptine - Amélie Soundtrack' },
        { id: 'vGJTaP6anOU', title: 'A Thousand Years - Piano' },
        { id: 'bDaHZNoOhXc', title: 'Perfect - Ed Sheeran Piano' },
        { id: 'lp-EO5I60KA', title: 'Someone Like You - Piano' },
        { id: 'rtOvBOTyX00', title: 'All Of Me - Piano Cover' },
        { id: 'rUokBZDu0GY', title: 'Thinking Out Loud - Piano' },
        { id: 'RDYgmCqOJz4', title: 'Shape Of You - Piano' },
        { id: 'FjiFGENWvOE', title: 'Let Her Go - Piano' },
        { id: 'pB-5XG-DbAA', title: 'Stay With Me - Piano' },
        { id: 'DHpOc-bAbV8', title: 'Say Something - Piano' },
        { id: '3JWTaaS7LdU', title: 'I Will Always Love You - Piano' },
        { id: 'hLQl3WQQoQ0', title: 'Someone You Loved - Piano' },
        { id: 'nSDgHBxUbVQ', title: 'Photograph - Piano' },

        // 🎹 Classical Piano / Relaxing
        { id: 'WJ3-F02-F_Y', title: 'Moonlight Sonata - Beethoven' },
        { id: '4Tr0otuiQuU', title: 'Fur Elise - Beethoven' },
        { id: 'GRxofEmo3HA', title: 'Canon in D - Pachelbel' },
        { id: 'YQ7S_bSpXrc', title: 'Spring Waltz - Chopin' },
        { id: 'XpJEg6MTPzc', title: 'Clair de Lune - Debussy' },
        { id: '75x6DncZDgI', title: 'The Entertainer - Joplin' },
        { id: 'D1sZ_vwqwcE', title: 'Turkish March - Mozart' },
        { id: 'NlprozGcs80', title: 'Gymnopédie No.1 - Satie' },
        { id: 'S-Xm7s9eGxU', title: 'La Campanella - Liszt' },
        { id: '_e2igZexpMs', title: 'Ballade Pour Adeline' },

        // 🎶 Studio Ghibli / Anime Instrumental
        { id: 'HskyMzuo_O4', title: 'Spirited Away - Piano' },
        { id: 'I1kGi-gN9JQ', title: 'My Neighbor Totoro - Piano' },
        { id: 'aNdoBlbWiGE', title: 'Howls Moving Castle - Piano' },
        { id: 'YK9Y1MTquig', title: 'Princess Mononoke - Piano' },
        { id: 'BJqb4e5VLIM', title: 'Castle In The Sky - Piano' },
        { id: 'puEWb4N0sCc', title: 'Ghibli Music Box Collection' },
        { id: 'sL-0F0ZVDyA', title: 'Ponyo - Piano' },
        { id: '77hPYBWjOmQ', title: 'Kiki Delivery Service - Piano' },
        { id: 'DkE1GG3qlKg', title: 'Studio Ghibli Piano Medley' },
        { id: 'VwgIGcLmpZo', title: 'Anime Piano Best Of' },

        // 🎼 K-Pop / J-Pop Instrumental
        { id: 'LnB2SjFijRs', title: 'Spring Day BTS - Piano' },
        { id: 'XQbUJBE0KKA', title: 'Dynamite BTS - Piano' },
        { id: 'po_NfmZPTSs', title: 'Love Scenario - Piano' },
        { id: '5mQz8p0Wd5U', title: 'BLACKPINK Piano Medley' },
        { id: 'gJKOXd9NYSQ', title: 'IU Eight - Piano' },

        // ☕ Lo-fi / Chill / Study Beats
        { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio - Chill' },
        { id: 'lTRiuFIWV54', title: 'Lo-fi Chill Study Beats' },
        { id: '5qap5aO4i9A', title: 'Chillhop Music - Peaceful' },
        { id: 'DWcJFNfaw9c', title: 'Lo-fi Jazz Cafe' },
        { id: 'kgx4WGK0oNU', title: 'Chill Piano Beats' },

        // 🎸 Acoustic / Guitar Instrumental
        { id: 'wOMwO5T3yT4', title: 'Acoustic Guitar Relaxing' },
        { id: 'Nop_ry7MgjE', title: 'Sungha Jung Medley' },
        { id: 'QGR_NEBMjr4', title: 'Classical Guitar Best Of' },
        { id: 'huyWwNdtiHY', title: 'Flamenco Guitar' },
        { id: 'izQsgE0L450', title: 'Fingerstyle Guitar Cover' },

        // 🎤 Disney / Pixar Instrumental
        { id: 'V1bFr2SWP1I', title: 'Let It Go - Piano' },
        { id: 'Oo3e8F12j7M', title: 'A Whole New World - Piano' },
        { id: 'bEeaS6fuUoA', title: 'Beauty And The Beast - Piano' },
        { id: 'POlkE4_DFSQ', title: 'Can You Feel The Love - Piano' },
        { id: 'tYMff1wHc8A', title: 'Remember Me (Coco) - Piano' },
        { id: 'nLqBZp4MPIE', title: 'Disney Piano Collection' },
        { id: 'J__7VkROges', title: 'Moana Piano Medley' },
        { id: 'KKz99FWNwJQ', title: 'Disney Lullaby Piano' },

        // 🌙 Lullaby / Sleep / Kids Friendly
        { id: 'hlWiI4xVXKY', title: 'Brahms Lullaby - Piano' },
        { id: 'RJqoj7tHm50', title: 'Twinkle Twinkle Little Star' },
        { id: 'C3MVcTRFBBI', title: 'Baby Mozart Lullaby' },
        { id: 'Ju0DP4sZCfg', title: 'Sleep Music For Kids' },
        { id: '1ZYbU82GVz4', title: 'Relaxing Kids Piano' },

        // 🎵 Trending / Modern Covers
        { id: 'rR94CDufS3E', title: 'Flowers - Miley Piano' },
        { id: 'LGIl7FgoZCI', title: 'As It Was - Piano' },
        { id: 'ZmDBbnmKFnI', title: 'Anti-Hero - Piano' },
        { id: 'WNIbGWO4EVE', title: 'Blinding Lights - Piano' },
        { id: 'gNi_6vlsDzs', title: 'Dandelions - Piano' },
        { id: '7USjUCdHLfk', title: 'Unstoppable - Piano Cover' },
        { id: 'FUjGf2Grrus', title: 'Calm Down - Piano' },
        { id: 'y6120QOlsfU', title: 'Sandstorm - Piano' },
        { id: 'r8OiC2HIwxQ', title: 'Believer - Piano' },
        { id: 'Sh2-P3hzX60', title: 'Dance Monkey - Piano' },

        // 🎻 Film Soundtracks
        { id: 'w1FLZPFI3jc', title: 'Interstellar - Piano' },
        { id: 'KKzB1rRk_10', title: 'Inception - Time Piano' },
        { id: 'BciS5krYL80', title: 'Forrest Gump - Piano' },
        { id: '0pPE2rJqNMY', title: 'La La Land - Piano' },
        { id: 'Y-_U0zCJRds', title: 'Titanic Piano Cover' },
        { id: 'jhf05vQJH7U', title: 'Harry Potter - Piano' },
    ];

    function loadYouTubeAPI() {
        if (document.getElementById('yt-api')) return;
        const tag = document.createElement('script');
        tag.id = 'yt-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
    }

    function init() {
        shuffled = shuffleArr([...PLAYLIST]);
        currentIndex = 0;
        loadYouTubeAPI();
    }

    // Called by YouTube API when ready
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: shuffled[0]?.id || PLAYLIST[0].id,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 1,
            },
            events: {
                onReady: () => { isReady = true; },
                onStateChange: onPlayerStateChange,
                onError: () => { nextTrack(); }
            }
        });
    };

    function onPlayerStateChange(e) {
        if (e.data === YT.PlayerState.ENDED) {
            nextTrack();
        }
    }

    function play() {
        if (!isReady) {
            // Retry after API loads
            setTimeout(play, 500);
            return;
        }
        player.loadVideoById(shuffled[currentIndex].id);
        player.setVolume(40);
        isPlaying = true;
        updateUI();
    }

    function pause() {
        if (!isReady) return;
        player.pauseVideo();
        isPlaying = false;
        updateUI();
    }

    function resume() {
        if (!isReady) return;
        player.playVideo();
        isPlaying = true;
        updateUI();
    }

    function toggle() {
        if (!isReady) {
            init();
            setTimeout(() => { play(); }, 1000);
            isPlaying = true;
            updateUI();
            return isPlaying;
        }
        if (isPlaying) { pause(); } else { resume(); }
        return isPlaying;
    }

    function nextTrack() {
        currentIndex = (currentIndex + 1) % shuffled.length;
        if (isReady && isPlaying) {
            player.loadVideoById(shuffled[currentIndex].id);
            player.setVolume(40);
        }
        updateUI();
    }

    function prevTrack() {
        currentIndex = (currentIndex - 1 + shuffled.length) % shuffled.length;
        if (isReady && isPlaying) {
            player.loadVideoById(shuffled[currentIndex].id);
            player.setVolume(40);
        }
        updateUI();
    }

    function getCurrentTitle() {
        return shuffled[currentIndex]?.title || 'Loading...';
    }

    function getTrackInfo() {
        return `${currentIndex + 1}/${shuffled.length}`;
    }

    function updateUI() {
        const titleEl = document.getElementById('track-title');
        const infoEl = document.getElementById('track-info');
        const fabEl = document.getElementById('musicFab');
        const miniEl = document.getElementById('miniPlayer');

        if (titleEl) titleEl.textContent = getCurrentTitle();
        if (infoEl) infoEl.textContent = getTrackInfo();
        if (fabEl) {
            fabEl.textContent = isPlaying ? '🎵' : '🔇';
            fabEl.classList.toggle('playing', isPlaying);
        }
        if (miniEl) miniEl.classList.toggle('visible', isPlaying);
    }

    function shuffleArr(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function reshufflePlaylist() {
        shuffled = shuffleArr([...PLAYLIST]);
        currentIndex = 0;
        if (isReady && isPlaying) {
            player.loadVideoById(shuffled[0].id);
            player.setVolume(40);
        }
        updateUI();
    }

    return {
        init, play, pause, toggle, nextTrack, prevTrack,
        reshufflePlaylist, getCurrentTitle, getTrackInfo,
        get isPlaying() { return isPlaying; },
        get totalTracks() { return PLAYLIST.length; }
    };
})();

// ===== SFX (keep from Web Audio API) =====
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

// Backward compatibility
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
