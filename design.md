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

### 4.3 Element Margins & Gaps
* **Section Badge Bottom Margin**: `1.25rem` (`20px`) (`margin-bottom: 1.25rem !important;`) on Desktop, `1rem` on Mobile.
* **H2 Heading Bottom Margin**: `3.5rem` (`56px`) (`margin-bottom: 3.5rem !important;`).
* **Section Header to H2**: When directly preceded by `.section-badge`, `.heading-style-h2` has `margin-top: 0 !important;`.
* **Grid Gaps**:
  * Primary 2-column & 3-column content grids: `2rem` (`32px`)
  * Stat cards / why-us cards: `1.5rem` (`24px`) or `10px` in tight grids
  * FAQ accordion items: `0` top padding, `4rem` header bottom margin

### 4.4 Border Radius Hierarchy
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
  * Margin-bottom: `1.25rem !important;` (`1rem` on mobile)
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