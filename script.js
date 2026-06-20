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

    /* ---- Produkt-Galerie / Lightbox ---- */
    var lightbox = document.getElementById('lightbox');
    var lbImage = document.getElementById('lbImage');
    var lbCaption = document.getElementById('lbCaption');
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');

    var currentImages = [];
    var currentName = '';
    var currentIndex = 0;

    function renderLb() {
        if (!currentImages.length) return;
        lbImage.style.opacity = '0';
        var src = currentImages[currentIndex];
        var img = new Image();
        img.onload = function () {
            lbImage.src = src;
            lbImage.alt = currentName + ' – Ansicht ' + (currentIndex + 1);
            lbCaption.textContent = currentName + '  ·  ' + (currentIndex + 1) + ' / ' + currentImages.length;
            lbImage.style.opacity = '1';
        };
        img.src = src;
    }

    function openGallery(card, startIndex) {
        var gallery = card.getAttribute('data-gallery') || '';
        currentImages = gallery.split('|').filter(Boolean);
        currentName = card.getAttribute('data-name') || '';
        currentIndex = startIndex || 0;
        var hasMany = currentImages.length > 1;
        lbPrev.style.display = hasMany ? '' : 'none';
        lbNext.style.display = hasMany ? '' : 'none';
        renderLb();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function step(dir) {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
        renderLb();
    }

    document.querySelectorAll('.products .card').forEach(function (card) {
        // Klick auf Bild oder "Details" öffnet die Galerie
        var imgWrap = card.querySelector('.card-img');
        if (imgWrap) imgWrap.addEventListener('click', function () { openGallery(card, 0); });
        var detailsBtn = card.querySelector('[data-details]');
        if (detailsBtn) detailsBtn.addEventListener('click', function () { openGallery(card, 0); });
    });

    lbClose.addEventListener('click', closeGallery);
    lbPrev.addEventListener('click', function () { step(-1); });
    lbNext.addEventListener('click', function () { step(1); });
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeGallery();
    });
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeGallery();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
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
