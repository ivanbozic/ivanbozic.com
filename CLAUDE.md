# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for [ivanbozic.com](https://ivanbozic.com/), built with Jekyll 4.4 on Ruby 3.3.4. Single-page static site — no posts/collections, no JS framework, no test suite.

## Commands

- `bundle install` — install gems (first run / after Gemfile changes).
- `bundle exec jekyll serve` — local dev server with live rebuild at http://localhost:4000.
- `bundle exec jekyll build` — produce `_site/` for deploy.

Note: `_config.yml` changes are NOT picked up by the running serve process — restart it after editing.

## Structure

- `index.html` — the only content page; uses YAML front matter and `layout: default`.
- `_layouts/default.html` — single layout wrapping all content; includes header, footer, Plausible analytics, and Mastodon `rel="me"` verification link.
- `_includes/favicon.html` — favicon link tags.
- `site.scss` — top-level stylesheet (must keep the empty YAML front matter `---\n---` so Jekyll processes it); imports partials from `stylesheets/`. Sass output mode is `compressed` (see `_config.yml`).
- `stylesheets/_normalize.scss`, `_breaks.scss` — Sass partials.
- Theme colors live in CSS custom properties on `:root` in `site.scss`, with a `prefers-color-scheme: dark` override. Accent color is `#fd5200`.
- `_data/` exists but is empty; the site has no data files in use.
- `site.js` exists but is empty — loaded from the layout but currently a no-op.

## Conventions

- Content is hand-written HTML with `<p>`, `<h2>`, `<h3>`, `<hr>` — no Markdown body, no Liquid templating beyond the layout/include mechanism.
- External links use full `https://` URLs; in-site links are root-relative (`/site.css`, `/site.js`).
