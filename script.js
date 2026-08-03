document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const menuLinks = document.querySelectorAll('.nav-links a');

    if (menuBtn && navOverlay) {
        // Gestion de l'ouverture et fermeture via le bouton
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navOverlay.classList.toggle('open');
        });

        // Fermeture automatique du menu lors d'un clic sur un lien (navigation fluide)
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navOverlay.classList.remove('open');
            });
        });
    }
});
