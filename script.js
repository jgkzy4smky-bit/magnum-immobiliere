document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const interactiveElements = document.querySelectorAll('[data-target]');
    const sections = document.querySelectorAll('.page-section');

    // 1. Déploiement du volet plein écran (Hamburger)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. Gestion de l'accordéon tactile pour le sous-menu mobile
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            dropdownToggle.classList.toggle('mobile-expanded');
        }
    });

    // 3. Moteur de routage interne et animations de sections
    interactiveElements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite les interférences tactiles multiples
            
            const targetSectionId = element.getAttribute('data-target');
            
            if (targetSectionId) {
                // Dissimulation des sections actives
                sections.forEach(section => {
                    section.classList.remove('active');
                });

                // Activation ciblée de la vue demandée
                const targetedSection = document.getElementById(targetSectionId);
                if (targetedSection) {
                    targetedSection.classList.add('active');
                    // Ancrage fluide automatique en haut d'écran
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                // Réinitialisation automatique des états du menu mobile
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                dropdownToggle.classList.remove('mobile-expanded');
            }
        });
    });
});
