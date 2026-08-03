document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');

    if (menuBtn && navOverlay) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('open');
        });
    }
});
