document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION SUPPRESSION PRELOADER ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.transform = 'translateY(-100%)';
        }, 2200); // Laisse l'animation de barre premium se terminer
    });

    // --- 2. CODE CURSEUR MATRICE HAUTE PRÉCISION ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Effet immédiat pour le point central
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Inertie fluide (lag) sur l'anneau extérieur du curseur pour l'effet Awwwards
    function animateCursor() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;
        
        cursorX = cursorX + (distX * 0.15);
        cursorY = cursorY + (distY * 0.15);
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interaction du curseur sur les éléments "Magnetic" et liens
    const interactives = document.querySelectorAll('.magnetic, .nav-link, .project-card, input, button');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- 3. EFFET INTERACTIF HAUT DE GAMME : 3D CARD PARALLAX ---
    const cards3D = document.querySelectorAll('.3d-effect');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcul de l'inclinaison angulaire
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 20; // Sensibilité verticale
            const angleY = (x - xc) / 20; // Sensibilité horizontale
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // --- 4. ENGINE ROUTING DES SECTIONS ET ANIMATIONS DE TEXTE ---
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const routerLinks = document.querySelectorAll('[data-target]');
    const sections = document.querySelectorAll('.page-section');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navContainer.classList.toggle('active');
    });

    dropdownToggle.addEventListener('click', () => {
        dropdownToggle.classList.toggle('mobile-expanded');
    });

    routerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = link.getAttribute('data-target');
            
            if (targetId) {
                sections.forEach(sec => {
                    sec.classList.remove('active');
                });

                const destination = document.getElementById(targetId);
                if (destination) {
                    destination.classList.add('active');
                    
                    // Relance l'effet d'apparition de texte Apple-style
                    const textElements = destination.querySelectorAll('.reveal-text');
                    textElements.forEach(el => {
                        el.style.animation = 'none';
                        el.offsetHeight; // Trigger reflow CSS
                        el.style.animation = null;
                    });

                    // Si la section contient des compteurs digitaux
                    if(targetId === 'investisseurs') {
                        triggerCounters(destination);
                    }

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                // Fermeture des menus
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                dropdownToggle.classList.remove('mobile-expanded');
            }
        });
    });

    // --- 5. COMPTEUR NUMÉRIQUE PROGRESSIF ACCÉLÉRÉ ---
    function triggerCounters(parentSection) {
        const counters = parentSection.querySelectorAll('.count-up');
        counters.forEach(counter => {
            counter.innerText = '0.0';
            const targetValue = parseFloat(counter.getAttribute('data-value'));
            let currentValue = 0.0;
            const increment = targetValue / 40; // Vitesse de la progression
            
            const updateCounter = () => {
                if(currentValue < targetValue) {
                    currentValue += increment;
                    if(currentValue > targetValue) currentValue = targetValue;
                    counter.innerText = currentValue.toFixed(1);
                    setTimeout(updateCounter, 25);
                }
            };
            updateCounter();
        });
    }
});
