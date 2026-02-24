/* ==========================================================
   AMAN AGRAWAL — RESEARCH SCIENTIST PORTFOLIO
   Typed effect, scroll reveals, navigation
   ========================================================== */

(function () {
    'use strict';

    /* --------------------------------------------------
       1. (Hero tags — pure CSS, no JS needed)
    -------------------------------------------------- */

    /* --------------------------------------------------
       2. SCROLL REVEAL (IntersectionObserver)
    -------------------------------------------------- */
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        reveals.forEach((el) => observer.observe(el));
    }

    /* --------------------------------------------------
       3. NAVIGATION
    -------------------------------------------------- */
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll state
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && navLinks) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.querySelectorAll('a').forEach((a) => {
                            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    /* --------------------------------------------------
       4. SMOOTH SCROLL
    -------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();
