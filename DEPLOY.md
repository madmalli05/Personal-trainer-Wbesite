# 🚀 Going Live + Contact Form Setup

Two quick one-time setups: **(A)** put the site online with a live link, and
**(B)** make the contact form deliver to your inbox. Each takes a few minutes.

---

## A) Deploy to Vercel (get a live link)

Vercel hosts the site for free and gives you a live URL that **updates
automatically every time changes are pushed** to your branch.

1. Go to **[vercel.com](https://vercel.com)** → **Sign Up** → **Continue with GitHub**
   and authorize Vercel.
2. In the Vercel dashboard click **Add New… → Project**.
3. Find and **Import** the repository **`madmalli05/Personal-trainer-Wbesite`**.
   - If it isn't listed, click **Adjust GitHub App Permissions** and grant Vercel
     access to that repo.
4. Vercel auto-detects **Vite** (Build Command `npm run build`, Output Directory
   `dist`). Leave the defaults and click **Deploy**.
5. Wait ~1 minute. 🎉 Your live URL appears (something like
   `https://personal-trainer-wbesite.vercel.app`).

### Make this branch the live one
Because the project currently lives on the branch
`claude/wonderful-franklin-eiclwi`, point Vercel at it so it becomes your main URL:

- Project → **Settings → Git → Production Branch** → set it to
  `claude/wonderful-franklin-eiclwi` → **Save**.

From now on, every push to that branch redeploys your live site automatically.
(Vercel also posts a unique preview link on every change so you can check it
before it goes live.)

> Want a custom domain (e.g. `www.yourgym.com`)? Project → **Settings → Domains**
> → add your domain and follow the DNS instructions.

---

## B) Contact form → your inbox (Formspree)

Out of the box the form opens the visitor's email app. To receive submissions
directly in your inbox instead:

1. Go to **[formspree.io](https://formspree.io)** → sign up (free).
2. **+ New Form** → name it (e.g. "Coaching enquiries") → set the email you want
   submissions sent to → **Create Form**.
3. Copy the form's endpoint — it looks like `https://formspree.io/f/`**`mwkgabcd`**.
   You only need the part **after `/f/`** (here, `mwkgabcd`).
4. Open **`src/content.js`**, find `formspreeId: ""` in the `contact` section, and
   paste your id between the quotes:
   ```js
   formspreeId: "mwkgabcd",
   ```
5. Commit/push (or just save if running locally). The form now sends to your inbox.
   - The **first** submission triggers a one-time confirmation email from Formspree
     — click the link in it to activate the form.

A hidden honeypot field is already included to reduce spam.

---

## ✅ Test checklist (after deploying)

Open your live URL and confirm:

- [ ] Page loads; the **3D dumbbell** moves as you scroll.
- [ ] **Photos** load. (Tip: temporarily break an image URL in `content.js` to see
      the on-brand fallback — it should never show a broken image.)
- [ ] **Before/After sliders**: drag with mouse, drag on a phone, and tab to one and
      use the **arrow keys**.
- [ ] **FAQ**: clicking a question expands/collapses it.
- [ ] **Journal**: "Read more" opens the article popup; **Esc**, the **✕**, and
      clicking outside all close it.
- [ ] **Contact form**: with a Formspree id set, submit a test message and confirm
      it lands in your inbox and you see the "Thanks" confirmation.
- [ ] Looks good on your **phone** (everything is responsive).

---

## Alternatives (optional)

- **Netlify**: same idea — [app.netlify.com](https://app.netlify.com) → *Add new
  site → Import an existing project* → pick the repo. It reads `netlify.toml` if
  present; build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: works too, but needs a build workflow and a one-time Pages
  enable; Vercel is simpler and gives nicer per-change preview links.
