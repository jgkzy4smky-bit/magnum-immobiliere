document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EXPULSION DU PRÉCHARGEUR PRESTIGE ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.transform = 'translateY(-100%)';
        }, 2000); 
    });

    // --- 2. LOGIQUE DU CURSEUR CINÉTIQUE ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        
        cursorDot.style.left = `${targetX}px`;
        cursorDot.style.top = `${targetY}px`;
    });

    // Interpolation linéaire pour fluidifier le mouvement de l'anneau externe
    function updateCursorPosition() {
        let diffX = targetX - currentX;
        let diffY = targetY - currentY;
        
        currentX += diffX * 0.12;
        currentY += diffY * 0.12;
        
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
        
        requestAnimationFrame(updateCursorPosition);
    }
    updateCursorPosition();

    // Activation des interactions visuelles au survol des zones tactiques
    const interactiveElements = document.querySelectorAll('.magnetic, .menu-link, .submenu-link, .showcase-item, input, textarea, button');
    interactiveElements.forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('active-hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active-hover'));
    });

    // --- 3. MOTEUR D'INCLINAISON ET PARALLAXE 3D ---
    const cards3D = document.querySelectorAll('.card-3d-engine');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const boundary = card.getBoundingClientRect();
            const mouseInsideX = e.clientX - boundary.left;
            const mouseInsideY = e.clientY - boundary.top;
            
            const centerPointX = boundary.width / 2;
            const centerPointY = boundary.height / 2;
            
            // Angulation de distorsion 3D proportionnelle
            const rotationX = (centerPointY - mouseInsideY) / 25; 
            const rotationY = (mouseInsideX - centerPointX) / 25; 
            
            card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // --- 4. GESTION DU ROUTAGE INTERNE SYNCHRONE SANS RECHARGEMENT ---
    const menuTrigger = document.querySelector('.menu-trigger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const hasSubmenu = document.querySelector('.has-submenu');
    const routingLinks = document.querySelectorAll('[data-target]');
    const allSections = document.querySelectorAll('.view-section');

    // Ouverture / Fermeture Menu Rideau
    menuTrigger.addEventListener('click', () => {
        menuTrigger.classList.toggle('active');
        fullscreenMenu.classList.toggle('open');
    });

    // Déploiement du sous-menu sur terminaux tactiles et clics
    if(hasSubmenu) {
        hasSubmenu.addEventListener('click', (e) => {
            e.stopPropagation();
            hasSubmenu.classList.toggle('expanded');
        });
    }

    // Gestion de l'affichage sélectif des sections
    routingLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const targetSectionId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetSectionId);
            
            if (targetSection) {
                // Extinction globale des sections actives
                allSections.forEach(sec => sec.classList.remove('active'));
                
                // Activation de la section demandée
                targetSection.classList.add('active');
                
                // Relance automatique des animations internes d'apparition (Reset CSS trigger)
                const elementsToAnimate = targetSection.querySelectorAll('.reveal-element');
                elementsToAnimate.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Déclenchement forcé du reflow pour réinitialiser le cycle
                    el.style.animation = null;
                });

                // Activation spécifique du module de compteurs numériques
                if (targetSectionId === 'club-investisseurs') {
                    executeDigitalCounters(targetSection);
                }

                // Retour immédiat et fluide au sommet de la nouvelle vue
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Fermeture systématique des structures de navigation suite au clic
            menuTrigger.classList.remove('active');
            fullscreenMenu.classList.remove('open');
            if(hasSubmenu) hasSubmenu.classList.remove('expanded');
        });
    });

    // --- 5. MODULE DE PROGRESSION COMPTEUR NUMÉRIQUE SANS COMPRESSION ---
    function executeDigitalCounters(sectionParent) {
        const counters = sectionParent.querySelectorAll('.animate-digits');
        counters.forEach(counter => {
            counter.innerText = '0.0';
            const endValue = parseFloat(counter.getAttribute('data-target-value'));
            let activeValue = 0.0;
            const steps = 50; 
            const stepIncrement = endValue / steps;
            
            const runCounterAnimation = () => {
                if (activeValue < endValue) {
                    activeValue += stepIncrement;
                    if (activeValue > endValue) activeValue = endValue;
                    counter.innerText = activeValue.toFixed(1);
                    setTimeout(runCounterAnimation, 30);
                }
            };
            runCounterAnimation();
        });
    }
});
