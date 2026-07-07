# BWRCI.ORG — GitHub Pages Site

Static site for [bwrci.org](https://bwrci.org) — hosted on GitHub Pages.

## File Structure

```
bwrci/
├── index.html          ← Homepage
├── qsafp.html          ← QSAFP protocol page (with QVN demo placeholder)
├── aeges.html          ← AEGES protocol page (with live demo placeholder)
├── media.html          ← Full video library (9 YouTube embeds)
├── press.html          ← Press releases + PDF downloads
├── recommend.html      ← Recommend a Testbed Nation form
├── appointments.html   ← Online appointments (Calendly placeholder)
├── contact.html        ← Contact form
├── privacy.html        ← Privacy policy
├── CNAME               ← Custom domain: bwrci.org
├── css/
│   └── style.css       ← Full site styles (sovereign international aesthetic)
└── js/
    └── main.js         ← Nav injection, form handling, scroll reveals
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `bwrci-site`)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages**, set Source to `main` branch, root `/`
4. Custom domain auto-activates via CNAME file

## DNS (GoDaddy → GitHub Pages)

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | YOUR-USERNAME.github.io |

## Installing Your Interactive Demos

### QVN Validator Network Demo (qsafp.html)

Find the placeholder block with class `demo-placeholder` containing "QVN Interactive Demo".
Replace with your HTML artifact inline, or embed as iframe:

```html
<!-- Option A: Inline embed -->
<div id="qvn-demo">
  <!-- paste your QVN demo HTML here -->
</div>

<!-- Option B: Iframe from another GitHub Pages deployment -->
<iframe
  src="https://YOUR-USERNAME.github.io/qvn-demo/"
  width="100%"
  height="700"
  frameborder="0"
  style="border-radius:6px;border:1px solid rgba(201,168,76,0.2);"
></iframe>
```

### AEGES Live Demo (aeges.html)

Same approach — find the `demo-placeholder` block with "AEGES Live Demo" and replace.

### Auto Shutdown & Reauth Rhythm Demo (qsafp.html)

Second placeholder on the QSAFP page — swap in your Reauth Rhythm HTML artifact.

## Activate Calendly (appointments.html)

1. Create free account at [calendly.com](https://calendly.com)
2. Set up your appointment types (QSAFP Demo, AEGES Briefing, PAE Consultation, Partnership)
3. In appointments.html, find the `calendly-placeholder` div and replace with:

```html
<!-- Calendly inline widget -->
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/YOUR-USERNAME"
  style="min-width:320px;height:700px;"
></div>
<script
  src="https://assets.calendly.com/assets/external/widget.js"
  async
></script>
```

## Forms

All contact/signup forms use Formspree endpoint: `https://formspree.io/f/xaqjddlp`
Log in at formspree.io to manage submissions.

To add a dedicated BWRCI contact form endpoint, create a new Formspree form and
update the `action` attribute in `contact.html` and `recommend.html`.

## Design Notes

- **Typefaces:** Cormorant Garamond (display) + Inter (body) + Space Mono (labels/data)
- **Palette:** Midnight navy (#07090f) + sovereign cobalt (#1a3a6e) + gold (#c9a84c) + parchment
- **Signature element:** Gold meridian line running full viewport height on left side (CSS `body::before`)
- **Tone:** International institution — UN General Assembly meets sovereign infrastructure
