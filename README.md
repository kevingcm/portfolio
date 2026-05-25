# Personal Developer Portfolio

A personal developer portfolio website showcasing mobile and full-stack development projects, experience, education, and technical stack. Built with Eleventy, vanilla CSS, and vanilla JavaScript.

## Tech Stack & Keywords

eleventy portfolio web-development developer html css javascript mobile-developer

## Features

- **Dynamic Accent Colors**: Accents are randomized on page load from a curated theme palette.
- **Bilingual Support**: Instant locale toggling between English (EN) and Portuguese (PT-BR) without page reloads.
- **Custom Particles Canvas**: Interactive background particle grid responding to theme selection and mouse click repelling.
- **Dynamic Theme Toggling**: Seamless switching between light and dark modes with custom cursor adjustments and matching favicons.
- **Interactive Project Showcase**: Dynamic borders, hover glows, and direct links to repository assets.

## Project Structure

- `src/_data/`: Dynamic JSON files for projects, tech stack, experience, and education.
- `src/_includes/`: Reusable layouts and base templates.
- `src/assets/`: Media assets, brand logos, and dark/light favicons.
- `src/css/`: Custom styling rules.
- `src/js/`: Client-side logic and canvas rendering.
- `src/index.njk`: Main page template.

## Development

```bash
# Install dependencies
npm install

# Run the local development server (live reloading)
npm run dev

# Build the production output
npm run build
```
