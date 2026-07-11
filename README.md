# Personal Developer Portfolio

My personal developer portfolio website showcasing mobile and full-stack development projects, experience, education, and technical stack. Built with Eleventy, vanilla CSS, and vanilla JavaScript.

## Tech Stack & Keywords

eleventy portfolio web-development developer html css javascript mobile-developer

## Features

- **Dynamic Accent Colors**: Accents are randomized on page load from a curated theme palette, including a random accent color on nav/footer logo hover.
- **Bilingual Support**: Instant locale toggling between English (EN) and Portuguese (PT-BR) without page reloads.
- **Custom Particles Canvas**: Interactive background particle grid responding to theme selection and mouse click repelling.
- **Dynamic Theme Toggling**: Seamless switching between light and dark modes with custom cursor adjustments and matching favicons.
- **Interactive Project Showcase**: Dynamic borders, hover glows, direct links to repository assets, and an overflow-aware marquee for long project names/URLs on mobile.
- **Bilingual CV Download**: A "Download CV" button next to the About section title serves locale-specific PDF résumés (EN/PT), built from LaTeX sources.
- **Collapsible About (Mobile)**: On narrow viewports, the About section shows only the first paragraph behind a "Read more" toggle, with a typewriter/erase text animation on expand/collapse.
- **Nav Hover Underline**: Nav links reveal an animated underline on hover/focus.

## Project Structure

- `src/_data/`: Dynamic JSON files for site info, projects, tech stack, experience, and education.
- `src/_includes/`: Reusable layouts and base templates.
- `src/assets/`: Media assets, brand logos, dark/light favicons, and compiled CV PDFs (`assets/pdf/`).
- `src/css/`: Custom styling rules.
- `src/js/`: Client-side logic and canvas rendering.
- `src/index.njk`: Main page template.
- `cv/`: LaTeX source files (`kevin-castro-cv-en.tex`, `kevin-castro-cv-pt.tex`) for the downloadable résumés.

## Development

```bash
# Install dependencies
npm install

# Run the local development server (live reloading)
npm run dev

# Build the production output
npm run build
```

## Rebuilding the CV PDFs

The downloadable résumés are compiled locally from the LaTeX sources in `cv/` and committed as static assets in `src/assets/pdf/` — they are not rebuilt as part of `npm run build` or CI.

```bash
# One-time setup: install the tectonic LaTeX engine
brew install tectonic

# Compile both CVs
cd cv
tectonic kevin-castro-cv-en.tex
tectonic kevin-castro-cv-pt.tex

# Copy the output into the site's static assets
cp kevin-castro-cv-en.pdf kevin-castro-cv-pt.pdf ../src/assets/pdf/
```
