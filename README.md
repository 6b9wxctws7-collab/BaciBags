# Baci Bags 💋

Elegante One-Page-Website für **Baci Bags** – eine kleine italienische Manufaktur
für handgemachte Chunky-Knit-Taschen. Reines HTML, CSS und Vanilla-JavaScript,
voll responsive (Handy, Tablet, Desktop).

## Dateistruktur

```
index.html      – Startseite (Hero, Kollektion, Über uns, Kontakt …)
produkt.html    – Vorlage für die einzelnen Produktseiten (?id=…)
products.js     – Zentrale Produktdaten (Name, Preis, Bilder, Texte)
produkt.js      – Rendert die Produktseite + Galerie/Lightbox
style.css       – Styling, Farben, Responsive-Layout, Animationen
script.js       – Burger-Menü, Scroll-Effekte, Formular, Reveal-Animation
images/         – Produktfotos & Logo
```

## Abschnitte (Startseite)

Header/Navigation · Hero · Kollektion (4 Taschen) · Über uns ·
Highlights · Kontakt (Formular + Instagram) · Footer

## Produktseiten

Jede Tasche hat eine eigene, vollständige Detailseite. Ein Klick auf eine
Produktkarte in der Kollektion öffnet `produkt.html?id=<slug>` mit großer
Bildergalerie (Thumbnails + Lightbox zum Vergrößern), Beschreibung, Details,
Materialangaben und einem „Jetzt anfragen“-Button. Dieser springt zurück zum
Kontaktformular auf der Startseite und füllt die Nachricht passend vor.

| Produkt        | Slug (`?id=`)  | Farbe       | Bilder                                  |
|----------------|----------------|-------------|-----------------------------------------|
| Bianco Amore   | `bianco-amore` | Creme-Weiß  | IMG_1885, IMG_1895, IMG_1896, IMG_1897  |
| Nero Notte     | `nero-notte`   | Schwarz     | IMG_1888, IMG_1891                      |
| Grigio Perla   | `grigio-perla` | Perlgrau    | IMG_1894, IMG_1889, IMG_1890            |
| Rosa Bacio     | `rosa-bacio`   | Zartes Rosa | IMG_1887, IMG_1892                      |

Zusätzlich verwendet: `IMG_1885` im Hero-Bereich und `IMG_1897` (Detailaufnahme)
im „Über uns“-Abschnitt.

> Produkte/Texte/Bilder ändern: Alles steht zentral in **`products.js`**
> (Preis, Farbe, Beschreibung, `images`-Liste …). Neue Tasche = einfach einen
> Eintrag ergänzen und in `index.html` eine Karte mit `href="produkt.html?id=<slug>"`
> hinzufügen.

## Lokal ansehen

Einfach `index.html` im Browser öffnen – kein Build-Schritt nötig.

---

*Fatto a mano in Italia, con amore.*
