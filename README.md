# Dev Studio — landing page

A minimal, dark one-page site for a freelance web development studio. Built with Vite and React.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Where things live

```
src/
  App.jsx                 page assembly
  config/site.js          phone numbers, emails, form endpoint
  styles.css              all styling (design tokens at the top)
  hooks/useReveal.js      scroll-in animation
  components/
    Nav.jsx               sticky pill nav + mobile menu
    Hero.jsx              headline and primary calls to action
    ToolStrip.jsx         tools/stack strip
    Services.jsx          bento feature cards + CSS-only previews
    Process.jsx           three steps and key stats
    PromiseSection.jsx    fixed-price promise block
    Pricing.jsx           three project packages
    ContactCTA.jsx        contact details + lead form
    Footer.jsx            links, contact details, status, copyright
    SectionHead.jsx       shared eyebrow/heading/subcopy
    icons.jsx             inline SVG icons
```

## Contact details and the lead form

All phone numbers and email addresses live in **`src/config/site.js`**. Edit that one file:

```js
phones: [
  { label: "New projects", display: "+91 98765 43210", href: "+919876543210" },
  { label: "Support", display: "+91 98765 43211", href: "+919876543211" },
],
emails: [
  { label: "New projects", address: "hello@yourdomain.com" },
  { label: "General enquiries", address: "studio@yourdomain.com" },
],
```

- `href` must be digits with a leading `+` and no spaces or dashes, because it becomes a `tel:` link.
- `display` is exactly what visitors see.
- The **first phone** is what every “Book a call” button dials.
- The **first email** receives form submissions; the second is CC’d.

The form posts to [FormSubmit.co](https://formsubmit.co) using the AJAX endpoint in `site.js`. No account is required, but **the first submission triggers a confirmation email** to the destination address. Open it and click the activation link once, then all later submissions are delivered normally.

If you change the destination email later, FormSubmit will send a fresh activation email the next time someone submits.

## Make it yours

- **Brand name** — search for `Dev Studio` across `src/`.
- **Pricing** — edit the `plans` array in `src/components/Pricing.jsx`.
- **Copy** — each section's text lives in its own component.
- **Colors and type** — edit the tokens in `:root` at the top of `src/styles.css`.
- **Phone & email** — edit `src/config/site.js` (see above).
- **Client logos** — the strip under the hero currently lists the tools you build with. Swap `ToolStrip.jsx` for real client logos once you have permission to show them.
- **Social links** — update the placeholder URLs in `src/components/Footer.jsx`.
- **Reveal animations** — handled by `useReveal`; it respects `prefers-reduced-motion`.

## Content notes

The prices, timelines, and promises are ready-to-edit placeholders for your own offer. Keep them accurate before publishing.
