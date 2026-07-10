# The Digital Artisan — Portfolio

A cinematic, interactive portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP-ready structure, Three.js / React Three Fiber, and Lenis smooth scroll.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Where to put your own content

- **Resume**: drop your PDF at `public/resume.pdf` (create the `public` folder if it doesn't exist) — the "Download Resume" buttons already link to `/resume.pdf`.
- **Project screenshots**: put images in `public/projects/` and set the `image` field in `src/data/projects.js` to the path, then swap the placeholder `ImageOff` block in `src/components/Projects.jsx` for an `<img>`.
- **Real project links**: update `github` / `demo` URLs in `src/data/projects.js`.
- **Contact details**: update email, LinkedIn, and GitHub links in `src/components/Contact.jsx`.
- **Contact form**: the form currently only simulates a "sent" state. Wire `handleSubmit` in `src/components/Contact.jsx` up to a real service (Formspree, EmailJS, or your own backend).
- **GitHub stats**: `src/components/GithubStats.jsx` uses placeholder numbers and a randomly generated contribution graph. Swap in real data from the GitHub REST/GraphQL API when ready.
- **Blog, testimonials, certifications, achievements, interests, learning progress**: all editable in `src/data/content.js`.
- **Creative Corner gallery**: replace the gradient placeholder tiles in `src/components/CreativeCorner.jsx` with real images of your sketches/art.
- **Skills galaxy**: add, remove, or edit skills in `src/data/skills.js` — planets and connective lines regenerate automatically based on category groupings.

## Easter eggs

Type `java` anywhere on the page for a small surprise, and type `hello` for a brief background flash.

## Notes on scope

- The "Skills Galaxy" and "Tech Stack Universe" briefs were merged into one 3D scene (`SkillsGalaxy.jsx`) — skills are grouped into rings by category with connective lines, so it reads as one coherent system rather than two overlapping visualizations.
- GSAP is installed and ready to use for any additional scroll-triggered choreography beyond what Framer Motion's `whileInView` already covers here.
