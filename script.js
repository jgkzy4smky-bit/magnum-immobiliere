document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (menuBtn && navOverlay) {
        // Ouverture et fermeture via le bouton hamburger
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('open');
        });

        // Fermeture automatique lors du clic sur un lien du menu
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navOverlay.classList.remove('open');
            });
        });
    }
});
