/* ============================================================
   Baci Bags – script.js
   Vanilla JS: Burger-Menü, Header-Scroll, Formular, Reveal
   ============================================================ */
(function () {
    'use strict';

    /* ---- Mobiles Burger-Menü ---- */
    var burger = document.getElementById('burger');
    var nav = document.getElementById('mainNav');

    function closeMenu() {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }

    if (burger && nav) {
        burger.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            burger.classList.toggle('open', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
        });

        // Menü schließen, wenn ein Link geklickt wird
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ---- Header-Schatten beim Scrollen ---- */
    var header = document.getElementById('siteHeader');
    function onScroll() {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Produkt "Details"-Buttons ---- */
    document.querySelectorAll('[data-bag]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var name = btn.getAttribute('data-bag');
            var note = document.getElementById('formNote');
            // Smooth zum Kontakt scrollen und Nachricht vorbereiten
            var msg = document.getElementById('message');
            if (msg) {
                msg.value = 'Ich interessiere mich für die Tasche „' + name + '“. Bitte sendet mir weitere Informationen.';
            }
            document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
            if (note) {
                note.textContent = 'Schön, dass dir „' + name + '“ gefällt! 💋 Hinterlasse uns einfach deine Daten.';
                note.className = 'form-note success';
            }
        });
    });

    /* ---- Kontaktformular (Demo, ohne Backend) ---- */
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var note = document.getElementById('formNote');
            var name = form.name.value.trim();
            var email = form.email.value.trim();
            var message = form.message.value.trim();
            var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!name || !emailOk || !message) {
                note.textContent = 'Bitte fülle alle Felder mit einer gültigen E-Mail aus.';
                note.className = 'form-note error';
                return;
            }

            note.textContent = 'Grazie, ' + name + '! Deine Nachricht ist unterwegs zu uns. 💋';
            note.className = 'form-note success';
            form.reset();
        });
    }

    /* ---- Sanftes Einblenden beim Scrollen ---- */
    var revealEls = document.querySelectorAll('.card, .feature, .about-inner, .contact-form, .section-head');
    if ('IntersectionObserver' in window) {
        revealEls.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity .7s ease, transform .7s ease';
        });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(function (el) { io.observe(el); });
    }

    /* ---- Jahr im Footer ---- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
