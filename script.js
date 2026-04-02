document.addEventListener('DOMContentLoaded', () => {
    // Lofi audio toggle
    const musicToggle = document.getElementById('music-toggle');
    const lofiAudio = new Audio('https://cdn.pixabay.com/audio/2022/10/30/audio_f52c9faa72.mp3');
    lofiAudio.loop = true;
    lofiAudio.preload = 'none';

    function setMusicLabel(isPlaying) {
        if (!musicToggle) return;
        musicToggle.textContent = `♫ lofi_radio_v1.mp3 [${isPlaying ? 'playing' : 'paused'}]`;
        musicToggle.classList.toggle('playing', isPlaying);
    }

    if (musicToggle) {
        setMusicLabel(false);
        musicToggle.addEventListener('click', async () => {
            try {
                if (lofiAudio.paused) {
                    await lofiAudio.play();
                    setMusicLabel(true);
                } else {
                    lofiAudio.pause();
                    setMusicLabel(false);
                }
            } catch (error) {
                setMusicLabel(false);
                musicToggle.textContent = '♫ lofi_radio_v1.mp3 [tap to retry]';
            }
        });
    }

    lofiAudio.addEventListener('ended', () => setMusicLabel(false));

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Typing Effect for About Section
    const typeWriterElements = document.querySelectorAll('.terminal-body p');
    
    // Simple intersection observer to trigger typing when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeEffect(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typeWriterElements.forEach(el => {
        if (!el.classList.contains('typed')) {
            el.dataset.text = el.innerText;
            el.innerText = '';
            // Only observe if it has text
            if(el.dataset.text.trim().length > 0) {
                 observer.observe(el);
            }
        }
    });

    function typeEffect(element) {
        const text = element.dataset.text;
        let i = 0;
        const speed = 40; // typing speed in ms

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed + (Math.random() * 30));
            } else {
                element.classList.add('typed');
            }
        }
        type();
    }

    // Hobby cards animation on scroll
    const hobbyCards = document.querySelectorAll('.hobby-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    hobbyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });

    // Clock
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const clockEl = document.getElementById('clock');
        if (clockEl) {
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    
    // Update immediately, then every second
    updateClock();
    setInterval(updateClock, 1000);

    // Command Input
    const cmdInput = document.getElementById('cmd-input');
    if (cmdInput) {
        cmdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = cmdInput.value.trim().toLowerCase();
                handleCommand(cmd);
                cmdInput.value = '';
            }
        });
    }

    function handleCommand(cmd) {
        if (!cmd) return;
        
        // Simple command parsing
        switch(cmd) {
            case 'help':
                alert('Commands: help, about, hobbies, projects, contact, clear');
                break;
            case 'about':
                const about = document.getElementById('about');
                if(about) about.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'hobbies':
                const hobbies = document.getElementById('hobbies');
                if(hobbies) hobbies.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'projects':
                const projects = document.getElementById('projects');
                if(projects) projects.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                const contact = document.getElementById('contact');
                if(contact) contact.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'clear':
                window.location.reload();
                break;
            default:
                // Simulate "command not found" 
                const originalPlaceholder = cmdInput ? cmdInput.placeholder : '';
                if (cmdInput) {
                    cmdInput.placeholder = `bash: ${cmd}: command not found`;
                    cmdInput.classList.add('error');
                    setTimeout(() => {
                        cmdInput.placeholder = originalPlaceholder;
                        cmdInput.classList.remove('error');
                    }, 2000);
                }
        }
    }

    // Content blocks fade-in on scroll
    const contentBlocks = document.querySelectorAll('.content-block');
    const blockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                blockObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    contentBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        blockObserver.observe(block);
    });

    // Gentle title animation on page load
    const titleElement = document.querySelector('.glitch');
    if (titleElement) {
        titleElement.style.opacity = '0';
        titleElement.style.transform = 'translateY(10px)';
        setTimeout(() => {
            titleElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            titleElement.style.opacity = '1';
            titleElement.style.transform = 'translateY(0)';
        }, 100);
    }
});
