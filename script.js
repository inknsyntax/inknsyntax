(() => {
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const store = {
        get: k => { try { return localStorage.getItem(k); } catch { return null; } },
        set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
    };

    // Set to your own file (e.g. 'audio/lofi.mp3') to stop depending on Pixabay.
    const AUDIO_SRC = 'https://cdn.pixabay.com/audio/2022/10/30/audio_f52c9faa72.mp3';

    document.documentElement.classList.add('js');
    if (store.get('theme') === 'light') document.documentElement.dataset.theme = 'light';

    // Clock + year
    const clock = $('#clock');
    const tick = () => { if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB'); };
    tick(); setInterval(tick, 1000);
    const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

    // Music
    const btn = $('#music-toggle');
    let audio = null;
    const label = state => {
        if (!btn) return;
        btn.textContent = `♫ lofi_radio_v1.mp3 [${state}]`;
        btn.classList.toggle('on', state === 'playing');
        btn.setAttribute('aria-pressed', String(state === 'playing'));
    };
    async function toggleMusic() {
        if (!audio) { audio = new Audio(AUDIO_SRC); audio.loop = true; audio.volume = 0.6; }
        try {
            if (audio.paused) { await audio.play(); label('playing'); return 'playing'; }
            audio.pause(); label('paused'); return 'paused';
        } catch { label('tap to retry'); return 'unavailable (check the audio file)'; }
    }
    if (btn) btn.addEventListener('click', toggleMusic);

    // Reveal on scroll
    const reveals = $$('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('in'));
    } else {
        const io = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        }), { threshold: 0.1 });
        reveals.forEach(el => io.observe(el));
    }

    // Typing: full text always stays in the DOM (hidden letters, not removed), so
    // screen readers, search engines and layout all see the finished sentence.
    if (!reduce && 'IntersectionObserver' in window) {
        const tio = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) { type(e.target); tio.unobserve(e.target); }
        }), { threshold: 0.2 });
        $$('.type').forEach(p => {
            const text = p.textContent;
            const on = document.createElement('span');
            const off = document.createElement('span');
            off.className = 't-off'; off.textContent = text;
            p.textContent = ''; p.append(on, off);
            tio.observe(p);
        });
    }
    function type(p) {
        const [on, off] = p.children;
        const text = on.textContent + off.textContent;
        let i = 0;
        (function step() {
            if (i >= text.length) { off.remove(); return; }
            i++;
            on.textContent = text.slice(0, i);
            off.textContent = text.slice(i);
            setTimeout(step, 28 + Math.random() * 25);
        })();
    }

    // Terminal
    const out = $('#term-out'), input = $('#cmd-input'), term = $('#term');
    if (out && input) {
        const history = []; let pos = 0;
        const print = (text, cls = '') => {
            const p = document.createElement('p');
            p.textContent = text; if (cls) p.className = cls;
            out.append(p);
            while (out.children.length > 40) out.firstChild.remove();
            out.scrollTop = out.scrollHeight;
        };
        const jump = id => { const el = document.getElementById(id); if (el) el.scrollIntoView(); };
        const sections = ['about', 'projects', 'now', 'entry', 'hobbies', 'contact'];

        const cmds = {
            help: () => print('commands: ' + Object.keys(cmds).join(', ')),
            about: () => jump('about'),
            projects: () => jump('projects'),
            now: () => jump('now'),
            poem: () => jump('entry'),
            hobbies: () => jump('hobbies'),
            contact: () => jump('contact'),
            photos: () => { print('opening /photos ...'); location.href = 'Photos.html'; },
            whoami: () => print('inknsyntax: poet, coder, chess player, collector of quiet moments'),
            ls: () => print(sections.join('/  ') + '/  Photos.html'),
            cat: args => {
                if (args[0] === 'now.txt') print('learning: human consciousness | working_on: poetry | thinking_about: life');
                else print(`cat: ${args[0] || ''}: No such file`, 'err');
            },
            music: async () => print('lofi_radio_v1.mp3 is ' + await toggleMusic()),
            theme: () => {
                const light = document.documentElement.dataset.theme !== 'light';
                document.documentElement.dataset.theme = light ? 'light' : '';
                store.set('theme', light ? 'light' : 'dark');
                print('theme: ' + (light ? 'light' : 'dark'));
            },
            history: () => history.forEach((h, i) => print(`${i + 1}  ${h}`)),
            clear: () => { out.textContent = ''; },
            sudo: () => print('nice try. permission denied, but you are welcome here.', 'err')
        };

        function run(line) {
            const [name, ...args] = line.split(/\s+/);
            print('$ ' + line, 'echo');
            if (cmds[name]) cmds[name](args);
            else print(`bash: ${name}: command not found. try help`, 'err');
        }

        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const line = input.value.trim().toLowerCase();
                input.value = '';
                if (!line) return;
                history.push(line); pos = history.length;
                run(line);
            } else if (e.key === 'ArrowUp' && history.length) {
                e.preventDefault(); pos = Math.max(0, pos - 1); input.value = history[pos];
            } else if (e.key === 'ArrowDown' && history.length) {
                e.preventDefault(); pos = Math.min(history.length, pos + 1); input.value = history[pos] || '';
            }
        });
        term.addEventListener('click', () => input.focus());
    }
})();
