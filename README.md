# Baci Bags 💋

Elegante One-Page-Website für **Baci Bags** – eine kleine italienische Manufaktur
für handgemachte Chunky-Knit-Taschen. Reines HTML, CSS und Vanilla-JavaScript,
voll responsive (Handy, Tablet, Desktop).

## Dateistruktur

```
index.html      – Seitenstruktur & Inhalte (Deutsch)
style.css       – Styling, Farben, Responsive-Layout, Animationen
script.js       – Burger-Menü, Scroll-Effekte, Formular, Reveal-Animation
images/         – Platzhalterbilder (SVG) – einfach ersetzen
```

## Abschnitte

Header/Navigation · Hero · Kollektion (4 Taschen) · Über uns ·
Highlights · Kontakt (Formular + Instagram) · Footer

## Produkte & Bilder

Die echten Produktfotos liegen im Ordner `images/`. Jede Tasche ist als
**Produkt** mit eigener Bildergalerie hinterlegt – ein Klick auf ein Produktbild
oder den „Details“-Button öffnet eine Lightbox, in der man durch alle Ansichten
blättern kann (Pfeiltasten / Wischen / Klick).

| Produkt        | Farbe       | Bilder                                       |
|----------------|-------------|----------------------------------------------|
| Bianco Amore   | Creme-Weiß  | IMG_1885, IMG_1895, IMG_1896, IMG_1897       |
| Nero Notte     | Schwarz     | IMG_1888, IMG_1891                           |
| Grigio Perla   | Perlgrau    | IMG_1894, IMG_1889, IMG_1890                 |
| Rosa Bacio     | Zartes Rosa | IMG_1887, IMG_1892                           |

Zusätzlich verwendet: `IMG_1885` im Hero-Bereich und `IMG_1897` (Detailaufnahme)
im „Über uns“-Abschnitt.

> Produkte/Bilder ändern: Die Galerie jeder Tasche steht im `data-gallery`-Attribut
> der jeweiligen `.card` in `index.html` (Pfade mit `|` getrennt). Einfach
> Dateinamen austauschen oder ergänzen – die Anzahl der „Ansichten“ aktualisiert
> sich entsprechend.

## Lokal ansehen

Einfach `index.html` im Browser öffnen – kein Build-Schritt nötig.

---

*Fatto a mano in Italia, con amore.*
