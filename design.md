# Algofort Global Design System & UI Architecture (`design.md`)

This document is the **definitive Single Source of Truth (SSOT)** for the Algofort design system, visual identity, layout architecture, typography, color tokens, animations, and reusable UI components.

It was created after a comprehensive, element-by-element inspection of the **completed Home Page** (`src/app/page.jsx`). **The Home Page is the primary visual and architectural reference for the entire website.**

Every future internal page (e.g., Services, About, Projects, Case Studies, Contact, Blog, 404) must strictly conform to the exact design rules documented in this file. **No new internal page is permitted to create its own different versions of headings, subtitles, paragraphs, buttons, cards, spacing, radius, or typography.**

---

## 1. Overall Design Style & Brand Aesthetics

### 1.1 Visual Identity & Aesthetic Direction
* **Aesthetic**: Premium futuristic cyber-agency design blended with clean Scandinavian editorial minimalism.
* **Palette Contrast**: Deep high-contrast juxtaposition between a soft warm paper-canvas background (`#f4f4f2`) and dark obsidian architectural containers (`#05080c` / `#0b0c10`), accented with high-voltage brand orange (`#f47a1f`).
* **Frame Language**: Distinctive floating inset frame architecture. Key banner and card components feature an inset gap (`padding: 20px;` or `margin: 10px;`) with large rounded corners (`border-radius: 28px` to `32px`), creating the sensation of an elevated digital cockpit floating over the light canvas.
* **Rhythmic Alternation**: The Home page alternates deliberately between dark immersive modules and light editorial sections:
  1. **Header / Hero Banner**: Dark obsidian card (`#05080c`) with ambient video & GSAP cursor trail
  2. **About Section**: Warm paper white (`#f4f4f2`) with slot-machine rolling stat cards
  3. **Services Section**: Deep dark (`#000000` / `#05080c`) with dual-tone headings & cursor image previews
  4. **Process Section**: Light canvas (`#f4f4f2`) with DotLottie vector animations
  5. **Showreel Section**: Sticky expandable video lightbox (dark)
  6. **Avexa Works Section**: Dark showcase cards (`#05080c`)
  7. **Testimonials Section**: Light canvas (`#f4f4f2`) with dual-tone header
  8. **FAQ Section**: Light canvas (`#f4f4f2`) with interactive physics string divider
  9. **CTA Section**: Deep dark container (`#05080c`) with glassmorphism contact form
  10. **Footer**: Deep dark foundation (`#05080c`) with brand watermark

### 1.2 Layout & Container Constraints
* **Primary Container Max-Width**: `1600px` (`--site-container-max-w: 1600px;`)
* **Editorial / Dense Max-Width**: `1360px` (`--container-max-w: 1360px;`)
* **Webflow Standard Max-Width**: `100rem` (`1600px` in `.container-large`)
* **Horizontal Padding System**:
  * **Desktop (`>= 992px`)**: `2rem` (`32px`) (`--site-container-padding-x: 2rem;`)
  * **Tablet (`768px - 991px`)**: `1.5rem` (`24px`) (`--site-container-padding-tablet: 1.5rem;`)
  * **Mobile (`<= 767px`)**: `1.25rem` (`20px`) (`--site-container-padding-mobile: 1.25rem;`)

### 1.3 Standard Section Hierarchy & Symmetrical JSX
Every section created on any page must strictly follow this semantic structure:
```jsx
<section id="sec-[identifier]" className="site-section sec-[identifier]">
  <div className="site-container sec-[identifier]__container container-large padding-global">
    <div className="padding-section-large">
      
      {/* Unified Section Header */}
      <div className="section-header sec-[identifier]__header">
        <div className="section-badge sec-[identifier]__badge">
          <SubtitleMarquee text="Section Name ✦ " variant="dark" />
        </div>
        <h2 className="heading-style-h2 section-title sec-[identifier]__title">
          Primary <span className="text-color-secondary">Accent</span>
        </h2>
        <p className="section-description sec-[identifier]__desc alg-text">
          Supporting copy or section description.
        </p>
      </div>

      {/* Component core elements / grids / cards */}
      <div className="section-content sec-[identifier]__content">
        ...
      </div>

    </div>
  </div>
</section>
```

### 1.4 CSS Class Architecture & Dual-Class System (Mandatory Rules)

To maintain absolute architectural symmetry across all pages and prevent CSS namespace collisions or style leakage, Algofort enforces a **Dual-Class Architecture (Global Framework Class + Scoped BEM Modifier Class)**.

#### 1. Why the Dual-Class System is Mandatory:
* **Global Shared Class (Symmetry & Inheritance)**: Links the element directly to global stylesheet rules (`src/index.css`), responsive fluid font clamps, uppercase typography transforms, CSS variable color tokens, and universal layout resets.
* **Scoped BEM Modifier Class (Isolation & Animation Targeting)**: Provides an isolated scope for page-specific layout, grid columns, unique spacing tweaks, and safe GSAP selector targeting (`gsap.to('.sec-about__card', ...)`), ensuring component rules never leak into other sections.

```html
<!-- MANDATORY DUAL-CLASS PATTERN -->
<div class="[global-symmetrical-class] [scoped-section-modifier] [utility-classes]">
```

#### 2. Class Prefix Conventions:
| Prefix | Type | Purpose | Examples |
| :--- | :--- | :--- | :--- |
| `sec-[name]` | Scoped Block | Primary identifier for a section wrapper | `.sec-services`, `.sec-projects`, `.sec-about`, `.sec-contact`, `.sec-faq`, `.sec-cta` |
| `sec-[name]__[elem]` | Scoped Element | BEM child element within a section | `.sec-services__header`, `.sec-about__card`, `.sec-contact__form` |
| `sec-[name]--[mod]` | Scoped Modifier | Variant or theme state of a section | `.sec-banner--subpage`, `.sec-services--dark` |
| `alg-[component]` | Bespoke Component | Reusable Algofort custom UI components | `.alg-text`, `.alg-cta-badge`, `.alg-cta-title`, `.alg-testimonials-header`, `.alg-faq-header`, `.alg-contact-grid` |
| `heading-style-[level]` | Global Typography | Standardized fluid typography scale | `.heading-style-h1`, `.heading-style-h2`, `.heading-style-h3` |
| `text-color-[token]` | Global Color Utility | Brand token color override | `.text-color-secondary`, `.text-color-accent`, `.text-color-alternate` |
| `bg-color-[token]` | Global Background | Brand token background override | `.bg-color-secondary`, `.bg-color-accent` |
| `padding-[scope]` | Global Spacing | Standardized responsive section padding | `.padding-section-large`, `.padding-section-medium`, `.padding-global` |
| `is-[state]` / `open` | State Classes | Interactive JS/DOM active states | `.is-active`, `.open`, `.w--open`, `.is-disabled` |

#### 3. Complete Class Taxonomy & Element Mapping:
Every section and internal page element must map to this exact dual-class taxonomy:

| Element Role | Global Symmetrical Class | Section-Scoped BEM Class | Full Mandatory JSX / HTML Example |
| :--- | :--- | :--- | :--- |
| **Section Root** | `.site-section` | `.sec-[name]` + `id="sec-[name]"` | `<section id="sec-about" className="site-section sec-about">` |
| **Outer Container** | `.site-container.container-large.padding-global` | `.sec-[name]__container` | `<div className="site-container sec-about__container container-large padding-global">` |
| **Section Padding Wrapper** | `.padding-section-large` (or `-medium`) | `.sec-[name]__padding` | `<div className="padding-section-large sec-about__padding">` |
| **Section Header Group** | `.section-header` | `.sec-[name]__header` | `<div className="section-header sec-about__header">` |
| **Subtitle Eyebrow Badge** | `.section-badge` | `.sec-[name]__badge` | `<div className="section-badge sec-about__badge">` |
| **Main Section Heading** | `.heading-style-h2.section-title` | `.sec-[name]__title` | `<h2 className="heading-style-h2 section-title sec-about__title">` |
| **Subheading H3** | `.heading-style-h3` | `.sec-[name]__subtitle` | `<h3 className="heading-style-h3 sec-about__subtitle">` |
| **Body Paragraph** | `.alg-text.section-description` | `.sec-[name]__desc` | `<p className="alg-text section-description sec-about__desc">` |
| **Content Grid / Wrapper** | `.section-content` | `.sec-[name]__content` / `__grid` | `<div className="section-content sec-about__grid">` |
| **Content Card** | `.content-card` | `.sec-[name]__card` | `<div className="content-card sec-about__card">` |
| **Card Inner Body** | `.content-card__inner` | `.sec-[name]__card-inner` | `<div className="content-card__inner sec-about__card-inner">` |
| **Primary Rolling CTA Button** | `.main-button.alternate-button.w-inline-block` | `.sec-[name]__btn` | `<Link className="main-button alternate-button sec-about__btn w-inline-block">` |
| **Button Text Block** | `.main-button-block` | — | `<div className="main-button-block">` |
| **Button Dual Rolling Text** | `.button-text.alternate-text` | — | `<div className="button-text alternate-text">Learn More</div>` |
| **Button Star Icon** | `.button-icon` | — | `<img className="button-icon" ... />` |

#### 4. Global Utility Classes Reference:
* **Color Overrides**:
  * `.text-color-secondary` / `.text-color-accent` -> `color: var(--brand-orange) !important;` (`#f47a1f`)
  * `.text-color-alternate` -> `color: #ffffff !important;` (Pure white text on dark sections)
  * `.bg-color-secondary` / `.bg-color-accent` -> `background-color: var(--brand-orange) !important;`
* **Spacing Utilities**:
  * `.padding-section-large` -> `padding-top: 8rem; padding-bottom: 8rem;` (Desktop), `5rem` (Tablet), `4rem` (Mobile)
  * `.padding-section-medium` -> `padding-top: 5rem; padding-bottom: 5rem;` (Desktop), `3rem` (Mobile)
  * `.padding-global` -> `padding-left: 2rem; padding-right: 2rem;` (Desktop), `1.5rem` (Tablet), `1.25rem` (Mobile)
  * Spacer series: `.spacer-tiny` (2px), `.spacer-xxsmall` (4px), `.spacer-xsmall` (8px), `.spacer-small` (16px), `.spacer-medium` (32px), `.spacer-large` (48px), `.spacer-xlarge` (64px), `.spacer-xxlarge` (80px), `.spacer-huge` (96px), `.spacer-xhuge` (128px)
* **Containers & Layouts**:
  * `.container-large` -> `max-width: 100rem; margin-left: auto; margin-right: auto;`
  * `.w-layout-grid` -> `display: grid; grid-auto-columns: 1fr;`

#### 5. Strict Class Rules & Anti-Patterns (Do's & Don'ts):
* [x] **DO**: Always provide both the global symmetrical class AND the scoped section BEM class.
* [x] **DO**: Always maintain `text-transform: uppercase !important;` on all classes referencing `Mona Sans Narrow` (e.g. `.heading-style-h2`, `.section-title`, `.heading-style-h3`).
* [x] **DO**: Always scope custom component CSS rules under their parent `.sec-[name]` in dedicated section stylesheets inside `src/styles/`.
* [!] **DO NOT**: Never invent arbitrary un-scoped class names (e.g., `.my-wrapper`, `.box-item-3`, `.custom-title`, `.about-col`).
* [!] **DO NOT**: Never omit `.heading-style-h2.section-title` from an H2 tag. Omitting it breaks fluid typography clamping, letter spacing, uppercase transformation, and GSAP stagger splitting.
* [!] **DO NOT**: Never omit `.main-button.alternate-button` from CTA links/buttons or replace with flat buttons.
* [!] **DO NOT**: Never write raw, un-scoped CSS rules in global stylesheets that target generic tags (`h2 { ... }`, `p { ... }`, `.card { ... }`).
* [!] **DO NOT**: Never use Tailwind arbitrary colors (e.g., `text-blue-500`, `bg-red-600`, `border-emerald-400`) that conflict with brand tokens. Always use CSS variable-driven classes (`.text-color-secondary`, `.bg-color-secondary`, etc.).

---

## 2. Color Palette & Global Tokens

All colors are established as reusable CSS variables in `:root` inside `src/index.css`. **Never use arbitrary hex values in component inline styles.**

| Token / Usage | Exact Hex / RGBA Value | CSS Variable Name |
| :--- | :--- | :--- |
| **Primary Brand Orange** | `#f47a1f` | `--brand-orange`, `--brand-secondary`, `--brand-accent` |
| **Brand Orange RGB** | `244, 122, 31` | `--brand-orange-rgb` |
| **Brand Orange Hover** | `#e0680f` | Hover state for scrollbar, tags, buttons |
| **Brand Orange Active** | `#cb5908` | Active click state |
| **Primary Light Canvas** | `#f4f4f2` | Primary body background (`body`, About, Process, FAQ) |
| **Alternate Light Canvas** | `#f4f4f4` | `--background-color--primary-background` |
| **Deep Dark Obsidian** | `#05080c` | Primary dark background (`.page-wrapper`, CTA, Footer) |
| **Dark Theme Card Surface** | `#0b0c10` | `--forteve-primary`, Floating hero & 404 card |
| **Dark Theme Alt Surface** | `#0e0e0e` | `--background-color--secondary-background`, `--primary-color--black` |
| **Dark Surface Elevated** | `#181920` | `--forteve-surface` |
| **Pure White** | `#ffffff` | `--primary-color--white`, card backgrounds in light sections |
| **Dark Obsidian Text** | `#05080c` / `#111111` | Primary text in light mode |
| **Pure White Text** | `#ffffff` | `--forteve-text`, `.text-color-alternate` |
| **Muted Dark Text** | `#71717a` / `#555555` | Subtitles, label text, secondary copy in light mode |
| **Muted Light Text** | `rgba(255, 255, 255, 0.72)` / `#9CA3AF` | `--forteve-text-muted`, descriptions in dark mode |
| **Ghost / Watermark Text** | `rgba(255, 255, 255, 0.08)` / `#e6e6e6` | Stat card ghosts, watermark lettering |
| **Dark Border (Subtle)** | `rgba(255, 255, 255, 0.08)` | `--forteve-border`, `--border-color--primary-border: #ffffff1a` |
| **Dark Border (Medium)** | `rgba(255, 255, 255, 0.15)` | Input borders, glassmorphic card boundaries |
| **Light Border (Subtle)** | `rgba(0, 0, 0, 0.06)` | About stat cards, process dividers, why-us cards |
| **Accent Orange Border** | `rgba(244, 122, 31, 0.35)` to `0.55` | Active focus, pill outline, glowing cards |
| **Glassmorphism Overlay** | `rgba(255, 255, 255, 0.05)` | Glass container backgrounds with `backdrop-filter: blur(20px)` |

### Global Color Utility Classes
* `.text-color-alternate` -> `color: #ffffff !important;` (White text on dark sections)
* `.text-color-secondary` -> `color: var(--brand-orange) !important;` (`#f47a1f` Brand Orange)
* `.text-color-accent` -> `color: var(--brand-orange) !important;`
* `.bg-color-secondary` -> `background-color: var(--brand-orange) !important;`

---

## 3. Typography System & Rules

### 3.1 Font Families & Strict Rules
1. **Headings & Display Font**:
   * **Primary Family**: `'Mona Sans Narrow', Impact, sans-serif` (`--font-family-heading`)
   * **Secondary Hero Display**: `'Clash Display', 'Clashdisplay', sans-serif`
   * **CRITICAL MANDATORY RULE (from `AGENTS.md`)**: Whenever `Mona Sans Narrow` font is used, text **MUST** be transformed to uppercase (`text-transform: uppercase`).
2. **Body & Paragraph Font**:
   * **Family**: `'Mona Sans', system-ui, -apple-system, sans-serif` (`--font-family-primary`)
   * Clean, contemporary geometric sans with high legibility.
3. **Serif Script / Editorial Accent**:
   * **Family**: `'Instrument Serif', Georgia, serif`
   * **Usage**: Used strictly with `font-style: italic; text-transform: uppercase; color: var(--brand-orange);` for special editorial words (e.g., in the Process section heading: *"into Brand"*).
4. **Technical / Monospace Font**:
   * **Family**: `'DM Mono', monospace`
   * **Usage**: Badges, telemetry chips, code blocks, numeric indices `(01)`, `(02)`.
5. **Subtitle & Marquee Badge Font**:
   * **Family**: `'Mona Sans', 'Suisse Intl', Arial, sans-serif`
   * **Usage**: Section badges, marquee ticker labels.

### 3.2 Heading Hierarchy & Scaling
All section headings use `.heading-style-h2` and `.section-title` with uppercase letter spacing and line-height:

| Element / Class | Desktop (`>= 1440px`) | Laptop (`992px - 1439px`) | Tablet (`768px - 991px`) | Mobile (`<= 767px`) | Line Height | Weight | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`.sec-banner__title`)** | `13rem` | `12rem` (Laptops) / `9.5rem` | `7.5rem` | `3.75rem` - `5.25rem` | `0.95` | `700` | Uppercase |
| **Section H2 (`.heading-style-h2`)** | `8rem` (Major) / `clamp(2.5rem, 4.5vw, 4.5rem)` | `clamp(2.5rem, 4.5vw, 4.5rem)` | `clamp(2rem, 4vw, 3rem)` | `clamp(1.75rem, 6vw, 2.35rem)` | `1.05 - 1.15` | `700` | Uppercase |
| **Subheading H3 (`.heading-style-h3`)**| `clamp(1.75rem, 2.5vw, 2.25rem)` | `1.85rem` | `1.5rem` | `1.35rem` | `1.15 - 1.2` | `600 - 700` | Uppercase |
| **Lead Text (About Scrub)** | `clamp(1.75rem, 2.65vw, 2.8rem)` | `clamp(1.75rem, 2.65vw, 2.8rem)` | `clamp(1.4rem, 2.4vw, 1.85rem)`| `1.25rem` | `1.25` | `700` | Uppercase |
| **Standard Paragraph (`.alg-text`)** | `16px` (`1rem`) | `16px` (`1rem`) | `15px` | `14px` | `1.55 - 1.6` | `400` | Normal |
| **Badge / Subtitle (`.subtitle`)** | `0.95rem` (`15px`) | `0.95rem` (`15px`) | `0.875rem` (`14px`) | `0.875rem` (`14px`) | `1.0` | `600` | Uppercase |
| **Meta / Small Text** | `14px` (`0.875rem`) | `14px` (`0.875rem`) | `13px` | `12px` | `1.4` | `400` | Normal |

### 3.3 GSAP Split-Text Title Animation Standard
All major section titles must feature character-by-character entrance stagger:
* **Trigger utility**: `initTitleAnimation(titleElement, { start: 'top 85%', stagger: 0.02 })` from `src/utils/titleAnimation.js`.
* Automatically breaks words into `.word-wrap` spans and characters into `.char` spans (`yPercent: 110, opacity: 0` -> `yPercent: 0, opacity: 1`).
* Preserves nested spans like `<span className="text-color-secondary">` for colored highlight words.

---

## 4. Spacing System & Border Radii

### 4.1 Section Padding
* **Standard Large Section (`.padding-section-large`)**:
  * Desktop (`>= 992px`): `padding-top: 8rem; padding-bottom: 8rem;` (`128px`)
  * Tablet (`768px - 991px`): `padding-top: 5rem; padding-bottom: 5rem;` (`80px`)
  * Mobile (`<= 767px`): `padding-top: 4rem; padding-bottom: 4rem;` (`64px`)
* **Medium Section (`.padding-section-medium`)**:
  * Desktop: `padding-top: 5rem; padding-bottom: 5rem;` (`80px`)
  * Mobile: `padding-top: 3rem; padding-bottom: 3rem;` (`48px`)
* **Single-Direction Gap Rule**: Maintain an exact `10rem` (`160px`) total visual gap between adjacent major section headers and content blocks.

### 4.2 Spacer Utilities
```css
.spacer-tiny     { padding-top: 0.125rem; } /* 2px */
.spacer-xxsmall  { padding-top: 0.25rem; }  /* 4px */
.spacer-xsmall   { padding-top: 0.5rem; }   /* 8px */
.spacer-small    { padding-top: 1rem; }     /* 16px */
.spacer-medium   { padding-top: 2rem; }     /* 32px */
.spacer-large    { padding-top: 3rem; }     /* 48px */
.spacer-xlarge   { padding-top: 4rem; }     /* 64px */
.spacer-xxlarge  { padding-top: 5rem; }     /* 80px */
.spacer-huge     { padding-top: 6rem; }     /* 96px */
.spacer-xhuge    { padding-top: 8rem; }     /* 128px */
```

### 4.3 Section Subtitle to Heading Spacing (Mandatory Site-Wide Rule)

> [!IMPORTANT]
> **Strict Site-Wide Spacing Constraint**: The vertical space between each **section subtitle (badge)** and the **heading directly beneath it** must strictly remain **between 1rem (16px) and 1.25rem (20px maximum)** across all sections and pages on the entire website.
>
> Under no circumstances should any section allow a larger gap (such as 30px, 40px, or 50px) between its subtitle and heading.

#### Exact Spacing Specifications:
* **Desktop (`>= 992px`)**: Exactly `1.25rem` (`20px`) maximum:
  * `.section-badge { margin-bottom: 1.25rem !important; }` (or `gap: 1.25rem;` in flex-column headers)
  * `.section-header > .section-badge + .heading-style-h2 { margin-top: 0 !important; }`
* **Tablet / Mobile (`<= 991px`)**: Exactly `1rem` (`16px`):
  * `.section-badge { margin-bottom: 1rem !important; }` (or `gap: 1rem;` in flex-column headers)
  * `.heading-style-h2 { margin-top: 0 !important; }`

#### Home Page Baseline Audit (Verified Across All Sections):
1. **Services Section (`#sec-services`)**:
   - Structure: `.section-badge.sec-services__badge` followed by `h2.heading-style-h2`
   - Spacing: Badge `margin-bottom: 1.25rem` (20px) -> Heading `margin-top: 0`. Net gap = **20px** (Desktop) / **16px** (Mobile).
2. **Avexa Works Section (`#sec-projects`)**:
   - Structure: `.section-badge.sec-projects__badge` followed by `h2.heading-style-h2.works-intro-title`
   - Spacing: Badge `margin-bottom: 1.25rem` (20px) -> Heading `margin-top: 0`. Net gap = **20px** (Desktop) / **16px** (Mobile).
3. **Testimonials Section (`#sec-testimonials`)**:
   - Structure: `.alg-testimonials-header` (flex-column) with `gap: 1rem` (16px) and badge `margin-bottom: 0`.
   - Spacing: Net gap = **16px** (1rem).
4. **FAQ Section (`#sec-faq`)**:
   - Structure: `.alg-faq-header` with `.section-badge` followed by `h2.heading-style-h2.alg-faq-title`
   - Spacing: Badge `margin-bottom: 1.25rem` (20px) -> Heading `margin-top: 0`. Net gap = **20px** (Desktop) / **16px** (Mobile).
5. **CTA Section (`#sec-cta`)**:
   - Structure: `.alg-cta-badge.section-badge` followed by `h2.heading-style-h2.alg-cta-title`
   - Spacing: Badge `margin-bottom: 1.25rem` (20px) -> Heading `margin-top: 0`. Net gap = **20px** (Desktop) / **16px** (Mobile).
6. **Process Section (`#sec-process`)**:
   - Structure: `.alg-process-wrap` flex-column with badge header followed by sticky titles
   - Spacing: Net gap = **12px to 16px**.

#### Implementation Rules for Future Pages:
* Always ensure `.heading-style-h2` resets any top margin (`margin-top: 0 !important;`) when positioned beneath `.section-badge`.
* Do not apply ad-hoc padding or spacers (e.g. `.spacer-small`, `.spacer-medium`) between a section badge and its heading.
* If a flex container is used for the header (`display: flex; flex-direction: column;`), set `gap: 1rem` (16px) to `1.25rem` (20px) and set `.section-badge { margin-bottom: 0; }`.

### 4.4 Element Margins & Gaps
* **Section Badge Bottom Margin**: `1.25rem` (`20px`) (`margin-bottom: 1.25rem !important;`) on Desktop, `1rem` (`16px`) on Mobile.
* **H2 Heading Bottom Margin**: `3.5rem` (`56px`) (`margin-bottom: 3.5rem !important;`).
* **Section Header to H2**: When directly preceded by `.section-badge`, `.heading-style-h2` has `margin-top: 0 !important;`.
* **Grid Gaps**:
  * Primary 2-column & 3-column content grids: `2rem` (`32px`)
  * Stat cards / why-us cards: `1.5rem` (`24px`) or `10px` in tight grids
  * FAQ accordion items: `0` top padding, `4rem` header bottom margin

### 4.5 Border Radius Hierarchy
* **Small**: `0.5rem` (`8px`) (`--_sizes---border-radius--small`)
* **Medium**: `0.75rem` (`12px`) (`--_sizes---border-radius--medium`) - Input fields, tags
* **Large**: `1rem` (`16px`) (`--_sizes---border-radius--large`) - Card internal items
* **XLarge**: `1.25rem` (`20px`) (`--_sizes---border-radius--xlarge`) - Image wrappers
* **XXLarge / Standard Cards**: `1.5rem` (`24px`) (`--_sizes---border-radius--xxlarge`) - Content cards
* **Huge / Outer Frame**: `1.75rem` (`28px`) (`--_sizes---border-radius--huge`) - Outer card wrappers
* **XHuge / Major Container Frame**: `2rem` (`32px`) (`--_sizes---border-radius--xhuge`) - Hero banner, process dark container
* **Full Pill**: `100px` / `9999px` - Buttons, badges, search pills, floating back-to-top

---

## 5. Global Reusable Components (Mandatory Reuse)

Future pages **must** reuse the following existing components. Never create custom one-off duplicates.

### 5.1 Global Header & Navigation (`Header.jsx`)
* **File**: `src/components/common/Header.jsx`
* **Position**: Floating absolute bar positioned directly over the hero/page banner:
  ```css
  .site-header, .sec-header, .navbar {
    position: absolute !important;
    top: 1.25rem !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 99999 !important;
    pointer-events: auto !important;
  }
  ```
* **Logo**: `/assets/logo.png`, height `1.65rem` (`26.4px`), auto width, white on dark.
* **Quick Nav Links**: Pill-shaped wrapper with subtle backdrop blur, white text, and vertical text-swipe on hover.
* **Drawer Menu (Burger Trigger)**:
  * Fullscreen sliding navigation drawer (`.alg-header-drawer.navigation`).
  * Giant links (`.navigation-link-text`) scaled via `font-size: clamp(2.25rem, 4vw, 3.8rem); line-height: 1.1;`.
  * Smooth animated hamburger icon that morphs into a centered "X" close icon:
    ```css
    .menu-button.w--open .menu-line.top, .menu-line.top.open {
      transform: translateY(4px) rotate(45deg) !important;
    }
    .menu-button.w--open .menu-line.bottom, .menu-line.bottom.open {
      transform: translateY(-4px) rotate(-45deg) !important;
    }
    ```

### 5.2 Global Footer (`Footer.jsx`)
* **File**: `src/components/common/Footer.jsx`
* **Background**: Deep dark obsidian `#05080c`.
* **Right Watermark**: Artistic calligraphic SVG watermark (`/assets/footer-watermark.svg`).
* **2-Pane Layout**:
  * **Left Pane**: Newsletter subscription form with focus-within subtle border transition, followed by social links list (Facebook, LinkedIn, X, Instagram) with horizontal arrow indicators and vertical text swipe.
  * **Right Pane**: Main Links column, Get in Touch contact block (`hello@algofort.com`, phone), Offline studio address, and full-width SVG brand wordmark **ALGOFORT** (`Clash Display`, `96px`).
  * **Bottom Bar**: Copyright notice on left (`© 2026 Algofort. All rights reserved`), Privacy Policy & Terms of Service links on right.

### 5.3 Global Page Title Banner (`PageBanner.jsx`)
* **File**: `src/components/common/PageBanner.jsx`
* **Purpose**: Reusable top banner for all internal/subpages (About, Services, Contact, Projects, etc.).
* **Height**: `50vh` (`min-height: 420px;`).
* **Structure**:
  * Outer card with `margin: 10px; border-radius: 2rem; overflow: hidden; position: relative;`.
  * Ambient looped video background (`14471915_3840_2160_30fps_20_281_29-transcode.mp4`) with dark gradient overlay.
  * Centered H1 page title in uppercase `Clash Display`.
  * Breadcrumb component directly beneath title (`Home / [Page Name]`).
  * Sequential GSAP character and container entrance animation.
  * Bottom ticker marquee and social links bar.
* **Usage in Page**:
  ```jsx
  <PageBanner 
    title="About Us" 
    breadcrumbs={[
      { label: 'Home', href: '/' },
      { label: 'About Us', active: true }
    ]} 
  />
  ```

### 5.4 Subtitle Marquee Badge (`SubtitleMarquee.jsx`)
* **File**: `src/components/common/SubtitleMarquee.jsx`
* **Purpose**: Universal pre-heading badge used across every section header.
* **Usage**:
  ```jsx
  <div className="section-badge sec-[name]__badge">
    <SubtitleMarquee text="Our Services ✦ " variant="dark" />
  </div>
  ```
* **Styles**:
  * Width: `17rem` (`15rem` on mobile)
  * Height: `2.25rem` (`2rem` on mobile)
  * Margin-bottom: `1.25rem !important;` (`20px` on desktop, `1rem` / `16px` on mobile)
  * **Spacing to Heading**: Strictly `1rem` (`16px`) to `1.25rem` (`20px maximum`) site-wide. Heading below badge must have `margin-top: 0 !important;` (See Section 4.3).
  * Text: `0.95rem`, uppercase, font-weight `600`, letter-spacing `-0.01em`
  * Horizontal gradient fade mask on left and right edges.
  * Continuous loop marquee animation (`10s` infinite linear).

### 5.5 Signature Dual-Text Rolling Button (`.main-button`)
All call-to-action buttons across the website must strictly follow the Home Page dual-text rolling structure with a rotating star icon:
```jsx
<Link href="/services" className="main-button alternate-button w-inline-block">
  <div className="main-button-block">
    <div className="button-text alternate-text">All Services</div>
    <div className="button-text alternate-text">All Services</div>
  </div>
  <img
    loading="lazy"
    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
    alt="Star Icon"
    className="button-icon"
  />
</Link>
```
* **Styles**:
  * `border-radius: 100px !important;` (Full Pill)
  * `padding: 1.25rem 2.25rem !important;` (Desktop), `0.85rem 1.5rem !important;` (Mobile)
  * `display: inline-flex !important; align-items: center; justify-content: center; gap: 0.75rem;`
* **Variants**:
  * `.main-button.alternate-button`: Pure white background (`#ffffff`), dark text (`#0e0e0e`), black star icon (`68f287b26ff74f4a3003bac0_black-star-icon.svg`).
  * `.main-button`: Dark background (`#0e0e0e` / `#05080c`), pure white text (`#ffffff`), white star icon (`68f287b26ff74f4a3003bac1_white-star-icon.svg`).
* **Interaction**:
  * `.main-button-block`: height `1.15rem`, `overflow: hidden; display: flex; flex-direction: column;`
  * On Hover: Both `.button-text` elements translate `translateY(-100%)` with `cubic-bezier(0.16, 1, 0.3, 1)`.
  * Star Icon: Rotates `90deg` (`transform: rotate(90deg)`).

### 5.6 Cards & Surfaces
1. **Light Content Cards** (About stat cards, values cards, testimonial cards):
   * Background: `#ffffff`
   * Border: `1px solid rgba(0, 0, 0, 0.06)`
   * Border-radius: `24px` (`1.5rem`)
   * Box-shadow: `0 10px 30px rgba(0, 0, 0, 0.02)`
   * Hover: `transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);`
2. **Dark Content Cards** (Process steps, services list, Avexa Works showcase):
   * Background: `rgba(255, 255, 255, 0.03)` or `#0b0c10`
   * Border: `1px solid rgba(255, 255, 255, 0.08)`
   * Border-radius: `24px` (`1.5rem`)
   * Hover: `border-color: rgba(244, 122, 31, 0.5); transform: translateY(-4px);`
3. **Glassmorphic Cards** (CTA form):
   * Background: `rgba(255, 255, 255, 0.05)`
   * Backdrop-filter: `blur(20px)`
   * Border: `1px solid rgba(255, 255, 255, 0.15)`
   * Border-radius: `24px`

### 5.7 Inputs, Forms & Interactive Pills
* **Inputs & Textareas**:
  * Dark Surface: `background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff;`
  * Light Surface: `background: #ffffff; border: 1px solid rgba(0, 0, 0, 0.08); color: #05080c;`
  * Border-radius: `12px` (`0.75rem`)
  * Focus state: `border-color: var(--brand-orange) !important; outline: none; box-shadow: 0 0 0 2px rgba(244, 122, 31, 0.2);`
* **Service Pills** (`.service-pill-btn`):
  * Border-radius: `100px` (Full Pill)
  * Border: `1px solid rgba(255, 255, 255, 0.15)`
  * Active state: `background-color: var(--brand-orange) !important; color: #ffffff !important; border-color: var(--brand-orange) !important;`

### 5.8 Utility Components
* **`Cursor`** (`src/components/common/Cursor.jsx`): Site-wide trailing cursor.
* **`BackToTop`** (`src/components/common/BackToTop.jsx`): Floating brand-orange button with arrow up, smoothly revealed on scroll past 400px.
* **`SmoothScroll`** (`src/components/common/SmoothScroll.jsx`): Global Lenis smooth scroll provider wrapping every page.

---

## 6. Responsive Breakpoint Rules

| Breakpoint Name | Media Query | Layout & Sizing Standards |
| :--- | :--- | :--- |
| **Desktop Wide** | `@media screen and (min-width: 1440px)` | Max-width `1600px`, full 3-column / 4-column grids, section padding `8rem`, H2 font-size `8rem`. |
| **Desktop Standard**| `@media screen and (min-width: 992px) and (max-width: 1439px)` | Max-width `1600px`, padding `2rem`, standard 2-column / 3-column grids, H2 font-size `clamp(2.5rem, 4.5vw, 4.5rem)`. |
| **Tablet** | `@media screen and (min-width: 768px) and (max-width: 991px)` | Grids collapse to 2 columns or 1 column. Padding `1.5rem`. Section padding `5rem`. H2 font-size `clamp(2rem, 4vw, 3rem)`. |
| **Mobile** | `@media screen and (max-width: 767px)` | Single-column stacks (`grid-template-columns: 1fr`). Padding `1.25rem`. Section padding `4rem`. H2 font-size `clamp(1.75rem, 6vw, 2.35rem)`. |
| **Mobile Small** | `@media screen and (max-width: 479px)` | Padding `12px` - `16px`. Title clamp down to `1.85rem`. Card gaps `1rem`. Button padding `0.85rem 1.5rem`. |

---

## 7. Rules for Creating New Pages (Template)

Whenever a new page is added to the website, it must use this exact structure to guarantee symmetry with the Home Page:

```jsx
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';

export const metadata = {
  title: 'Page Title | Algofort - Shaping Bold Digital Experiences',
  description: 'Page description here...',
};

export default function SubPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner 
            title="Page Title" 
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Page Title', active: true }
            ]} 
          />
          {/* Alternating Light & Dark Sections adhering to design.md */}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
```

---

## 8. Strict "Do Not Change" Commitments

1. **Do NOT modify the existing Home Page**: `src/app/page.jsx` and all its section components are 100% completed, approved, and frozen.
2. **Do NOT invent arbitrary new styling**: All headings, subtitles, buttons, cards, spacing, and colors must strictly match the rules in this document.
3. **No External CDNs**: All fonts, media, and scripts must remain 100% local inside `/public/`. Zero external Google Fonts, unpkg, or jsdelivr links.
4. **Mandatory Mona Sans Narrow Uppercase**: Whenever `Mona Sans Narrow` is used, `text-transform: uppercase !important;` is mandatory without exception.
5. **Always reuse global components**: `Header`, `Footer`, `PageBanner`, `SubtitleMarquee`, `Cursor`, `BackToTop`, and `SmoothScroll` must be reused.