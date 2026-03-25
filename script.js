// --- Modal System ---
const modal = document.getElementById('hobby-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Command input override
function handleCommand(cmd) {
    if (!cmd) return;

    switch(cmd.toLowerCase()) {
        case 'help':
            alert('Commands: help, about, projects, photography, gaming, cooking, tv, lofi, clear, matrix');
            break;
        case 'about':
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            break;
        case 'projects':
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            break;

        // Hobbies commands
        case 'photography':
            openHobbyModal('Photography', ['assets/images/photo1.jpg','assets/images/photo2.jpg']);
            break;
        case 'gaming':
            openHobbyModal('Gaming', ['assets/images/game1.jpg','assets/images/game2.jpg']);
            break;
        case 'cooking':
            openHobbyModal('Cooking', ['assets/images/cook1.jpg','assets/images/cook2.jpg']);
            break;
        case 'tv':
            openHobbyModal('TV / Movies', ['assets/images/tv1.jpg','assets/images/tv2.jpg']);
            break;
        case 'lofi':
            openHobbyModal('LoFi', ['assets/images/lofi1.jpg','assets/images/lofi2.jpg']);
            break;

        case 'clear':
            console.clear();
            window.location.reload();
            break;
        case 'matrix':
            document.body.style.filter = 'contrast(200%) brightness(150%) hue-rotate(90deg)';
            break;

        default:
            const originalPlaceholder = cmdInput.placeholder;
            cmdInput.placeholder = `bash: ${cmd}: command not found`;
            cmdInput.classList.add('error');
            setTimeout(() => {
                cmdInput.placeholder = originalPlaceholder;
                cmdInput.classList.remove('error');
            }, 2000);
    }
}

// Function to open modal
function openHobbyModal(title, images) {
    modalContent.innerHTML = `<h2>${title}</h2>` + images.map(img => `<img src="${img}" alt="${title}">`).join('');
    modal.style.display = 'block';
}
