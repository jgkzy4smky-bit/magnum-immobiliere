document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (menuBtn && navOverlay) {
        // Bascule de l'état ouvert/fermé du menu
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('open');
        });

        // Fermeture automatique du menu lors d'un clic sur un lien
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navOverlay.classList.remove('open');
            });
        });
    }
});
