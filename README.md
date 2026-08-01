### KB727 Group — Logistics Investment, Planning & Supply Chain Finance

Static bilingual (EN/ZH) website deployed on GitHub Pages.

#### Structure
```
index.html              English homepage
default.html            Chinese homepage
404.html                Error page
sitemap.xml / robots.txt  SEO
site.webmanifest / browserconfig.xml  PWA & tile config
static/css/             page-header.css, main.css, bootstrap.css, animations.css, wechat-modal.css
static/js/main.js       All site JS (IntersectionObserver, sidebar, sharing)
static/fonts/           Open Sans + Font Awesome
static/images/          Background images, portfolio icons, favicon set
static/docs/terms.pdf   Legal terms
```

#### Local Preview
Open `index.html` directly in a browser, or serve the directory:
```
python -m http.server 8000
```

#### Conventions
- Primary color: `#669900`
- Icon versioning: `?v20260801`
- CSP enforced via `<meta http-equiv>` (GitHub Pages does not support .htaccess)
- `script-src 'self' 'unsafe-inline'` — external main.js + inline fallback for file:// local testing
