document.addEventListener('DOMContentLoaded', () => {
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
        const speed = 50; // typing speed in ms

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed + (Math.random() * 50)); // Add randomness
            } else {
                element.classList.add('typed');
            }
        }
        type();
    }


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
                alert('Commands: help, about, projects, contact, clear, matrix');
                break;
            case 'about':
                const about = document.getElementById('about');
                if(about) about.scrollIntoView({ behavior: 'smooth' });
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
                // Fake clear - actually just reloading or clearing the input visually?
                // Let's just make it cool by reloading the page for now or clearing console
                console.clear();
                window.location.reload();
                break;
            case 'matrix':
                 document.body.style.filter = 'contrast(200%) brightness(150%) hue-rotate(90deg)';
                 break;
            default:
                // Simulate "command not found" 
                const originalPlaceholder = cmdInput.placeholder;
                cmdInput.placeholder = `bash: ${cmd}: command not found`;
                cmdInput.classList.add('error');
                setTimeout(() => {
                    cmdInput.placeholder = originalPlaceholder;
                    cmdInput.classList.remove('error');
                }, 2000);
        }
    }

    // Glitch Randomizer
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            const skew = Math.random() * 10 - 5;
            glitchElement.style.transform = `skew(${skew}deg)`;
            setTimeout(() => {
               glitchElement.style.transform = 'skew(0deg)'; 
            }, 100);
        }, 3000);
    }
});
