/* ============================================================
   Baci Bags – produkt.js
   Rendert die einzelne Produktseite anhand von ?id= und
   steuert Galerie-Thumbnails + Lightbox.
   ============================================================ */
(function () {
    'use strict';

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var product = (typeof BACI_PRODUCTS !== 'undefined') ? BACI_PRODUCTS[id] : null;
    var container = document.getElementById('productDetail');
    var bc = document.getElementById('breadcrumbName');

    /* ---- Produkt nicht gefunden ---- */
    if (!product) {
        document.title = 'Produkt nicht gefunden – Baci Bags';
        if (bc) bc.textContent = 'Nicht gefunden';
        container.innerHTML =
            '<div class="pd-missing">' +
            '<h1>Tasche nicht gefunden</h1>' +
            '<p>Diese Tasche existiert leider nicht (mehr).</p>' +
            '<a class="btn btn-gold" href="index.html#kollektion">Zur Kollektion</a>' +
            '</div>';
        return;
    }

    /* ---- Kopf-Daten setzen ---- */
    document.title = product.name + ' – Baci Bags';
    if (bc) bc.textContent = product.name;

    /* ---- Markup zusammenbauen ---- */
    var thumbs = product.images.map(function (src, i) {
        return '<button class="pd-thumb' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Ansicht ' + (i + 1) + '">' +
            '<img src="' + esc(src) + '" alt="' + esc(product.name) + ' – Ansicht ' + (i + 1) + '" loading="lazy">' +
            '</button>';
    }).join('');

    var descHtml = product.description.map(function (p) {
        return '<p>' + esc(p) + '</p>';
    }).join('');

    var detailItems = product.details.map(function (d) {
        return '<li>' + esc(d) + '</li>';
    }).join('');

    var specs = '';
    if (typeof BACI_COMMON !== 'undefined') {
        var rows = [
            ['Material', BACI_COMMON.material],
            ['Maße', BACI_COMMON.size],
            ['Herkunft', BACI_COMMON.origin],
            ['Edition', BACI_COMMON.edition],
            ['Pflege', BACI_COMMON.care]
        ];
        specs = '<dl class="pd-specs">' + rows.map(function (r) {
            return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
        }).join('') + '</dl>';
    }

    container.innerHTML =
        '<div class="pd-gallery">' +
            '<div class="pd-main">' +
                '<img id="pdMain" src="' + esc(product.images[0]) + '" alt="' + esc(product.name) + '">' +
                '<button class="pd-zoom" id="pdZoom" aria-label="Bild vergrößern">⤢ Vergrößern</button>' +
            '</div>' +
            '<div class="pd-thumbs">' + thumbs + '</div>' +
        '</div>' +
        '<div class="pd-info">' +
            '<p class="eyecatch">Baci Bags · Kollektion</p>' +
            '<h1>' + esc(product.name) + '</h1>' +
            '<p class="pd-color"><span class="dot" style="--dot:' + esc(product.colorDot) + '"></span> ' +
                esc(product.color) + ' · ' + esc(product.accents) + '</p>' +
            '<p class="pd-price">' + esc(product.price) + '</p>' +
            '<p class="pd-tagline">' + esc(product.tagline) + '</p>' +
            '<div class="pd-desc">' + descHtml + '</div>' +
            '<h2 class="pd-subhead">Details</h2>' +
            '<ul class="pd-details">' + detailItems + '</ul>' +
            '<div class="pd-actions">' +
                '<a class="btn btn-gold" href="index.html?produkt=' + encodeURIComponent(product.name) + '#kontakt">Jetzt anfragen</a>' +
                '<a class="btn btn-outline" href="index.html#kollektion">Zurück zur Kollektion</a>' +
            '</div>' +
            specs +
        '</div>';

    /* ---- Galerie: Thumbnails ---- */
    var mainImg = document.getElementById('pdMain');
    var thumbBtns = container.querySelectorAll('.pd-thumb');
    var currentIndex = 0;

    function showImage(i) {
        currentIndex = (i + product.images.length) % product.images.length;
        mainImg.style.opacity = '0';
        var pre = new Image();
        pre.onload = function () {
            mainImg.src = product.images[currentIndex];
            mainImg.alt = product.name + ' – Ansicht ' + (currentIndex + 1);
            mainImg.style.opacity = '1';
        };
        pre.src = product.images[currentIndex];
        thumbBtns.forEach(function (b, bi) {
            b.classList.toggle('active', bi === currentIndex);
        });
    }

    thumbBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            showImage(parseInt(btn.getAttribute('data-index'), 10));
        });
    });

    /* ---- Lightbox ---- */
    var lightbox = document.getElementById('lightbox');
    var lbImage = document.getElementById('lbImage');
    var lbCaption = document.getElementById('lbCaption');
    var lbClose = document.getElementById('lbClose');
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    var hasMany = product.images.length > 1;

    function renderLb() {
        lbImage.style.opacity = '0';
        var src = product.images[currentIndex];
        var pre = new Image();
        pre.onload = function () {
            lbImage.src = src;
            lbImage.alt = product.name + ' – Ansicht ' + (currentIndex + 1);
            lbCaption.textContent = product.name + '  ·  ' + (currentIndex + 1) + ' / ' + product.images.length;
            lbImage.style.opacity = '1';
        };
        pre.src = src;
    }

    function openLb() {
        renderLb();
        lbPrev.style.display = hasMany ? '' : 'none';
        lbNext.style.display = hasMany ? '' : 'none';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLb() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function step(dir) {
        showImage(currentIndex + dir);
        renderLb();
    }

    document.getElementById('pdZoom').addEventListener('click', openLb);
    mainImg.addEventListener('click', openLb);
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function () { step(-1); });
    lbNext.addEventListener('click', function () { step(1); });
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLb();
    });
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLb();
        else if (e.key === 'ArrowLeft') step(-1);
        else if (e.key === 'ArrowRight') step(1);
    });

})();
