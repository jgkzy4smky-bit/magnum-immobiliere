/* -------------------------------------------------------------
   MAGNUM IMMOBILIÈRE - INTERACTIVE CONTROLLER ARCHITECTURE
   ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Gestion du Curseur Liquide Personnalisé
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateFollower() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        
        follower.style.left = `${posX}px`;
        follower.style.top = `${posY}px`;
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Effet au survol des éléments interactifs
    const interactiveElements = document.querySelectorAll("a, button, .menu-trigger, .property-card");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hovering-link"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hovering-link"));
    });

    // 2. Gestion Numérique du Préchargeur Cinématique
    const preloader = document.getElementById("preloader");
    const counterElement = document.getElementById("preloader-counter");
    const barElement = document.getElementById("preloader-bar");
    
    let count = 0;
    const updateCounter = () => {
        count += Math.floor(Math.random() * 4) + 1;
        if (count > 100) count = 100;
        
        counterElement.innerText = `${count.toString().padStart(2, '0')}%`;
        barElement.style.width = `${count}%`;
        
        if (count < 100) {
            setTimeout(updateCounter, 40);
        } else {
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                triggerHeroAnimations();
            }, 400);
        }
    };
    updateCounter();

    // 3. Logique d'Ouverture du Menu Plein Écran
    const menuToggle = document.getElementById("menu-toggle");
    const fullscreenMenu = document.getElementById("fullscreen-menu");
    const menuLinks = document.querySelectorAll(".menu-link");

    const toggleMenu = () => {
        const isOpen = document.body.classList.contains("menu-open");
        if (isOpen) {
            document.body.classList.remove("menu-open");
            fullscreenMenu.classList.remove("active");
        } else {
            document.body.classList.add("menu-open");
            fullscreenMenu.classList.add("active");
        }
    };

    menuToggle.addEventListener("click", toggleMenu);
    
    menuLinks.forEach((link, idx) => {
        link.style.setProperty('--i', idx + 1);
        link.addEventListener("click", () => {
            menuLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            toggleMenu();
        });
    });

    // 4. Séquence d'Animations Scroll GSAP Avançée
    function triggerHeroAnimations() {
        if (typeof gsap !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // Révélation élégante des textes du Hero
            gsap.fromTo(".reveal-text", 
                { y: 40, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
            );

            gsap.fromTo(".reveal-text-delayed", 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.4 }
            );

            // Dézoom en fondu du visuel architectural principal
            gsap.to(".parallax-img", {
                scale: 1.0,
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Révélation asymétrique séquentielle des cartes du portfolio
            gsap.utils.toArray(".property-card").forEach((card) => {
                const speed = card.getAttribute("data-speed") || 1;
                gsap.from(card, {
                    opacity: 0,
                    y: 80 * speed,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Parallaxe horizontal subtil du grand texte decoratif
            gsap.to(".vision-bg-text", {
                x: "-10%",
                scrollTrigger: {
                    trigger: ".vision-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }
    }

    // 5. Physique d'Attraction Magnétique des Boutons
    const magneticElements = document.querySelectorAll(".magnetic-element");
    magneticElements.forEach((element) => {
        element.addEventListener("mousemove", (e) => {
            const bound = element.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = `translate(0px, 0px)`;
        });
    });
});
