document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navLinks = document.querySelectorAll('[data-target]');
    const sections = document.querySelectorAll('.page-section');

    // 1. Gestion de l'ouverture / fermeture du menu Hamburger mobile
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. Déploiement du sous-menu "Locaux professionnels" sur plateformes tactiles / mobiles
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            // Empêche la propagation si nécessaire et bascule l'affichage accordéon
            dropdownToggle.classList.toggle('mobile-expanded');
        }
    });

    // 3. Système d'affichage dynamique des pages dédiées
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite les conflits de clic sur mobile
            
            const targetId = link.getAttribute('data-target');
            
            if (targetId) {
                // Désactivation de la section précédemment affichée
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                // Activation de la page ciblée
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    // Retour fluide au sommet de la page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                // Fermeture automatique des volets mobiles après action
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                dropdownToggle.classList.remove('mobile-expanded');
            }
        });
    });
});
