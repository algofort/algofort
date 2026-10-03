# Algofort Design System & UI Architecture (`design.md`)

This document is the **definitive Single Source of Truth (SSOT)** for the Algofort design system, visual identity, layout architecture, typography, colors, animations, and reusable UI components.

It was created after a comprehensive, element-by-element inspection of the complete Algofort codebase. Every future page (e.g., Services, About, Projects, Case Studies, Contact, 404) must strictly conform to these rules to maintain pixel-perfect consistency without altering the existing Home page.

---

## 1. Overall Design Style

### 1.1 Visual Identity & Aesthetic Direction
* **Aesthetic**: Premium futuristic cyber-agency design blended with clean Scandinavian minimalism.
* **Palette Contrast**: Deep high-contrast juxtaposition between a soft warm paper-canvas background (`#f4f4f2`) and dark obsidian architectural containers (`#05080c` / `#0b0c10`), accented with high-voltage brand orange (`#f47a1f`).
* **Frame Language**: Distinctive floating inset frame architecture. Key banner and error components feature a uniform **20px inset gap** (`padding: 20px;`) with large rounded corners (`border-radius: 28px` to `32px`), creating the sensation of an elevated digital cockpit floating over the light canvas.
* **Rhythmic Alternation**: The Home page alternates deliberately between dark immersive modules and light editorial sections:
  1. **Header / Hero Banner**: Dark obsidian card with ambient video & GSAP cursor trail
  2. **About Section**: Warm paper white (`#f4f4f2`) with slot-machine rolling stat cards
  3. **Services Section**: Deep dark (`#0e0e0e` / `#05080c`) with dual-tone headings & cursor image previews
  4. **Process Section**: Light canvas (`#f4f4f2`) with DotLottie vector animations
  5. **Showreel Section**: Sticky expandable video lightbox (dark)
  6. **Avexa Works Section**: Dark showcase cards (`#05080c`)
  7. **Testimonials Section**: Light canvas (`#f4f4f2`)
  8. **FAQ Section**: Light canvas (`#f4f4f2`) with physics interactive line pull
  9. **CTA Section**: Deep dark container (`#05080c`) with glassmorphism contact form
  10. **Footer**: Deep dark foundation (`#05080c`) with brand watermark

### 1.2 Layout & Container System
* **Primary Container Max-Width**: `1600px` (`--site-container-max-w: 1600px;`)
* **Editorial / Dense Max-Width**: `1360px` (`--container-max-w: 1360px;`)
* **Webflow Standard Max-Width**: `100rem` (`1600px` in `.container-large`)
* **Horizontal Padding System**:
  * **Desktop (`>= 992px`)**: `2rem` (`32px`) (`--site-container-padding-x: 2rem;`)
  * **Tablet (`768px - 991px`)**: `1.5rem` (`24px`) (`--site-container-padding-tablet: 1.5rem;`)
  * **Mobile (`<= 767px`)**: `1.25rem` (`20px`) (`--site-container-padding-mobile: 1.25rem;`)
* **Standard Section Hierarchy**:
  ```html
  <section id="sec-[name]" className="site-section sec-[name] [legacy-class]">
    <div className="site-container sec-[name]__container container-large padding-global">
      <div className="padding-section-large">
        <!-- Section Header -->
        <div className="section-header sec-[name]__header">
          <div className="section-badge sec-[name]__badge">
            <SubtitleMarquee text="Section Name ✦" />
          </div>
          <h2 className="heading-style-h2 section-title sec-[name]__title text-color-alternate">
            Primary <span className="text-color-secondary">Accent</span>
          </h2>
        </div>
        <!-- Section Content Grid / Cards -->
        ...
      </div>
    </div>
  </section>
  ```

---

## 2. Color Palette & Tokens

All colors are established as reusable CSS variables in `:root` inside `src/index.css` and `src/styles/style.css`. Always reference existing variables.

| Token / Usage | Exact Hex / RGBA Value | CSS Variable Name |
| :--- | :--- | :--- |
| **Primary Brand Orange** | `#f47a1f` | `--brand-orange`, `--brand-secondary`, `--brand-accent` |
| **Brand Orange RGB** | `244, 122, 31` | `--brand-orange-rgb` |
| **Brand Orange Hover** | `#e0680f` | Hover state for scrollbar, tags, buttons |
| **Brand Orange Active** | `#cb5908` | Active state |
| **Primary Light Canvas** | `#f4f4f2` | Primary body background (`body`, About, Process, FAQ) |
| **Alternate Light Canvas** | `#f4f4f4` | `--background-color--primary-background` |
| **Deep Dark Obsidian** | `#05080c` | Primary dark background (`.page-wrapper`, CTA, Footer) |
| **Dark Theme Card Surface** | `#0b0c10` | `--forteve-primary`, Floating hero & 404 card |
| **Dark Theme Alt Surface** | `#0e0e0e` | `--background-color--secondary-background`, `--primary-color--black` |
| **Dark Surface Elevated** | `#181920` | `--forteve-surface` |
| **Pure White** | `#ffffff` | `--primary-color--white`, card backgrounds in light sections |
| **Dark Obsidian Text** | `#05080c` / `#111111` | Primary text in light mode |
| **Pure White Text** | `#ffffff` | `--forteve-text`, `.text-color-alternate` |
| **Muted Dark Text** | `#71717a` / `#646464` | Subtitles, label text, secondary copy in light mode |
| **Muted Light Text** | `rgba(255, 255, 255, 0.72)` / `#9CA3AF` | `--forteve-text-muted`, descriptions in dark mode |
| **Ghost / Watermark Text** | `rgba(255, 255, 255, 0.08)` / `#e6e6e6` | Stat card ghosts, watermark lettering |
| **Dark Border (Subtle)** | `rgba(255, 255, 255, 0.08)` | `--forteve-border`, `--border-color--primary-border: #ffffff1a` |
| **Dark Border (Medium)** | `rgba(255, 255, 255, 0.15)` | Input borders, glassmorphic card boundaries |
| **Light Border (Subtle)** | `rgba(0, 0, 0, 0.06)` | About stat cards, process dividers |
| **Accent Orange Border** | `rgba(244, 122, 31, 0.35)` to `0.55` | 404 stroke, pill outline, glowing cards |
| **Glassmorphism Overlay** | `rgba(255, 255, 255, 0.05)` | Glass container backgrounds with `backdrop-filter: blur(20px)` |

### Global Color Utility Classes
* `.text-color-alternate` -> `color: #ffffff !important;` (White text on dark sections)
* `.text-color-secondary` -> `color: var(--brand-orange) !important;` (`#f47a1f` Brand Orange)
* `.text-color-accent` -> `color: var(--brand-orange) !important;`
* `.bg-color-secondary` -> `background-color: var(--brand-orange) !important;`

---

## 3. Typography System

### 3.1 Font Families & Roles
1. **Headings & Display Font**:
   * **Primary Family**: `'Mona Sans Narrow', Impact, sans-serif`
   * **Secondary Display**: `'Clash Display', 'Clashdisplay', sans-serif`
   * **MANDATORY RULE (from `AGENTS.md`)**: Whenever `Mona Sans Narrow` font is used, text **MUST** be transformed to uppercase (`text-transform: uppercase`).
2. **Body & Paragraph Font**:
   * **Family**: `'Mona Sans', system-ui, -apple-system, sans-serif` (`--font-family-primary`)
   * Clean, contemporary geometric sans with high legibility.
3. **Serif Script / Editorial Accent**:
   * **Family**: `'Instrument Serif', Georgia, serif`
   * **Usage**: Used strictly with `font-style: italic; text-transform: uppercase; color: var(--brand-orange);` for special editorial words (e.g., in the Process section heading: *"Our WAY OF WORKING Process"*).
4. **Technical / Monospace Font**:
   * **Family**: `'DM Mono', monospace` (`--_typography---font-family--tertiary`)
   * **Usage**: Badges, telemetry chips, code blocks, numeric indices.
5. **Secondary Subtitle Font**:
   * **Family**: `'Suisse Intl', 'Mona Sans', Arial, sans-serif`
   * **Usage**: Section badges, marquee ticker labels.

### 3.2 Heading Hierarchy & Scaling
All section headings use `.heading-style-h2` and `.section-title` with uppercase letter spacing and line-height:

| Element / Class | Desktop (`>= 992px`) | Tablet (`768px - 991px`) | Mobile (`<= 767px`) | Line Height | Weight | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`.alg-hero-title`)** | `clamp(3.5rem, 8vw, 8rem)` | `clamp(2.75rem, 6vw, 4.5rem)` | `clamp(2.2rem, 8vw, 3.2rem)` | `0.95 - 1.0` | `700` | Uppercase |
| **Section H2 (`.heading-style-h2`)** | `clamp(2.5rem, 4.5vw, 4.5rem)` | `clamp(2rem, 4vw, 3rem)` | `clamp(1.75rem, 6vw, 2.35rem)` | `1.05 - 1.15` | `700` | Uppercase |
| **Subheading H3** | `clamp(1.75rem, 2.5vw, 2.25rem)` | `1.5rem` | `1.35rem` | `1.2` | `600` | Uppercase |
| **Lead Paragraph (About Scrub)** | `clamp(1.75rem, 2.65vw, 2.8rem)` | `clamp(1.4rem, 2.4vw, 1.85rem)`| `1.25rem` | `1.25` | `700` | Uppercase |
| **Standard Paragraph (`.alg-text`)** | `16px` (`1rem`) | `15px` | `14px` | `1.55 - 1.6` | `400` | Normal |
| **Badge / Subtitle (`.subtitle`)** | `0.95rem` (`15px`) | `0.875rem` (`14px`) | `0.875rem` (`14px`) | `1.0` | `600` | Uppercase |
| **Meta / Small Text** | `14px` (`0.875rem`) | `13px` | `12px` | `1.4` | `400` | Normal |

### 3.3 GSAP Split-Text Title Animation Standard
All major section titles must feature character-by-character entrance stagger:
* **Trigger utility**: `initTitleAnimation(titleElement, { start: 'top 85%', stagger: 0.02 })` from `src/utils/titleAnimation.js`.
* Automatically breaks words into `.word-wrap` spans and characters into `.char` spans (`yPercent: 110, opacity: 0` -> `yPercent: 0, opacity: 1`).
* Preserves nested spans like `<span className="text-color-secondary">` for colored highlight words.

---

## 4. Spacing System

The spacing system relies on consistent vertical rhythm and predefined spacer utilities:

### 4.1 Section Padding
* **Standard Large Section (`.padding-section-large`)**:
  * Desktop: `padding-top: 8rem; padding-bottom: 8rem;` (`128px`)
  * Tablet: `padding-top: 5rem; padding-bottom: 5rem;` (`80px`)
  * Mobile: `padding-top: 4rem; padding-bottom: 4rem;` (`64px`)
* **Medium Section (`.padding-section-medium`)**:
  * Desktop: `padding-top: 5rem; padding-bottom: 5rem;` (`80px`)
  * Mobile: `padding-top: 3rem; padding-bottom: 3rem;` (`48px`)
* **About Section Specifics**:
  * Desktop: `padding: 9rem 0 11rem;`
  * Mobile: `padding: 4.5rem 0 5.5rem;`

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
* **Section Badge Bottom Margin**: `1.25rem` (`20px`) (`margin-bottom: 1.25rem !important;`)
* **Heading to Description Spacing**: `1.25rem` to `1.5rem`
* **Grid Gaps**:
  * Primary content grids: `2rem` (`32px`)
  * About stat cards: `1.5rem` (`24px`)
  * Services row padding: `2.5rem 0;`
  * FAQ accordion spacing: `4rem` header bottom margin

### 4.4 Border Radius Hierarchy
* Small: `0.5rem` (`8px`) (`--_sizes---border-radius--small`)
* Medium: `0.75rem` (`12px`) (`--_sizes---border-radius--medium`)
* Large: `1rem` (`16px`) (`--_sizes---border-radius--large`)
* XLarge: `1.25rem` (`20px`) (`--_sizes---border-radius--xlarge`)
* XXLarge / Cards: `1.5rem` (`24px`) (`--_sizes---border-radius--xxlarge`)
* Huge / Hero Outer: `1.75rem` (`28px`) (`--_sizes---border-radius--huge`)
* XHuge / Frame Wrap: `2rem` (`32px`) (`--_sizes---border-radius--xhuge`)
* Full Pill: `100px` / `9999px` (Buttons, badges, search pills)

---

## 5. Components Specification

### 5.1 Global Header & Navigation (`Header.jsx`)
* **Position**: Floating absolute bar positioned directly over the hero banner:
  ```css
  .site-header, .sec-header, .navbar {
    position: absolute !important;
    top: 1.25rem !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 99999 !important;
  }
  ```
* **Logo**: `/assets/logo.png`, height `1.65rem` (`26.4px`), auto width, white on dark.
* **Navigation Links**: Pill-shaped wrapper with subtle backdrop blur, white text, hover lift.
* **Drawer Menu (Mobile & Burger Trigger)**:
  * Fullscreen sliding navigation drawer (`.nav-overlay`).
  * Giant links (`.navigation-link-text`) scaled via `font-size: clamp(2.25rem, 4vw, 3.8rem); line-height: 1.1;`.
  * Social links and contact info embedded at the bottom.

### 5.2 Hero & Subpage Banners (`BannerSection.jsx` & `PageBanner.jsx`)
* **Inset Frame Structure**:
  * Outer section on `#f4f4f2` light canvas.
  * Inner `.background-video-wrap`: `margin: 10px; border-radius: 2rem; position: absolute; inset: 0; overflow: hidden;`.
  * Video overlay with subtle opacity gradient ensuring high text contrast.
* **Subpage Banner Standard (`PageBanner.jsx`)**:
  * Height: `50vh` (`min-height: 420px;`).
  * Centered dynamic page title (`h1`).
  * Breadcrumbs component located directly beneath the title (`Home / [Page Name]`).
  * No trademark `®` symbol (strictly reserved for the Home page).
  * Interactive GSAP mouse image trail on desktop.
  * Optional bottom marquee and social icons.

### 5.3 Buttons (`.main-button`)
Algofort uses a signature dual-text rolling pill button with a rotating black star icon:
```html
<Link href="/services" className="main-button alternate-button w-inline-block">
  <div className="main-button-block">
    <div className="button-text alternate-text">All Services</div>
    <div className="button-text alternate-text">All Services</div>
  </div>
  <img
    loading="lazy"
    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
    alt="Icon"
    className="button-icon"
  />
</Link>
```
* **Styles**:
  * `border-radius: 100px !important;`
  * `padding: 1.25rem 2.25rem !important;`
  * `display: inline-flex !important; align-items: center; justify-content: center; gap: 0.75rem;`
* **Variants**:
  * `.main-button.alternate-button`: Pure white background (`#ffffff`), dark text (`#0e0e0e`).
  * `.main-button`: Dark background (`#0e0e0e`), pure white text (`#ffffff`).
* **Interaction**:
  * Inside `.main-button-block` (height: `1rem`, `overflow: hidden;`), two identical `.button-text` lines exist.
  * On mouse enter: Texts translate `yPercent: -100` with `duration: 0.35, ease: 'power2.out'`.
  * Button star icon rotates `90deg`.
  * On mouse leave: Texts return to `yPercent: 0`, icon resets to `0deg`.

### 5.4 Subtitle Marquee Badge (`SubtitleMarquee.jsx`)
Standard pre-heading badge used across every section:
```jsx
<div className="section-badge">
  <SubtitleMarquee text="Our Services ✦" />
</div>
```
* **Dimensions**: Width `17rem`, height `2.25rem`, `margin-bottom: 1.25rem;`.
* **Mask**: Soft horizontal gradient fade on left and right (`mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)`).
* **Typography**: `0.95rem`, uppercase, font-weight `600`, letter-spacing `-0.01em`.

### 5.5 Stat / Feature Cards (About Section)
* **Background**: White `#ffffff` with `border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 1.5rem; padding: 2.5rem 2rem;`.
* **Architectural Corner Marks**: SVG plus/square crosshair icons in corners.
* **Odometer Numbers**: Multi-strip rolling ticker with GSAP `yPercent` animation triggering on scroll.
* **Ghost Numbers**: Large watermark behind digits (`color: rgba(0, 0, 0, 0.04); font-size: 5rem;`).

### 5.6 Service Rows (Services Section)
* Row layout with column grid `(01)` number, title, and description.
* **Hover Interaction**: 3D mouse tracking tilt and cursor-following image reveal (`gsap.quickTo`). Title shifts on hover.

### 5.7 Step Process Cards (Process Section)
* 3-column responsive grid (`1fr 1fr 1fr` -> `1fr`).
* DotLottie vector animation container (`/lottie/process-*.lottie` via local `/scripts/dotlottie-player.js`).
* Step pills `[01]` with dark background, rounded corners.

### 5.8 FAQ Accordion (`FaqSection.jsx`)
* Interactive SVG string-divider (`FaqDivider`) with realistic physics bounce on mouse move.
* Collapsible question row with plus/minus indicator, smooth GSAP auto-height transition.

### 5.9 Glassmorphic Form (CTA Section)
* Two-pane section: Left header with phone pill button, right glassmorphism form card.
* Glass container with specular highlights, blur `20px`, dark translucent background.
* Service selection pills (`.service-pill-btn`) with toggle state (`.active` turns brand orange `#f47a1f`).

### 5.10 Footer (`Footer.jsx`)
* Deep dark `#05080c` background.
* Artistic watermark vector on the right.
* Newsletter subscription form with focus-within border transition.
* Two-pane layout with navigation links column and social media link row.

---

## 6. Responsive Rules & Breakpoints

| Breakpoint Name | Media Query | Key Layout & Sizing Behaviors |
| :--- | :--- | :--- |
| **Desktop Wide** | `@media screen and (min-width: 1440px)` | Max-width `1600px`, full 3-column & 4-column grids, large spacing (`8rem`). |
| **Desktop Standard**| `@media screen and (min-width: 992px) and (max-width: 1439px)` | Standard 2-column & 3-column layouts, padding `2rem`. |
| **Tablet** | `@media screen and (min-width: 768px) and (max-width: 991px)` | Grids collapse to 2 columns or 1 column. Padding `1.5rem`. Section padding `5rem`. Hero & 404 height auto. |
| **Mobile** | `@media screen and (max-width: 767px)` | Single-column stacks (`grid-template-columns: 1fr`). Padding `1.25rem`. Section padding `4rem`. Nav drawer is primary navigation. |
| **Mobile Small** | `@media screen and (max-width: 479px)` | Padding `12px` - `16px`. Title clamp down to `1.75rem`. Stat cards gap `1rem`. |

---

## 7. Class Naming Conventions

Always adhere to these existing class patterns:

1. **Section Wrapper**:
   * Pattern: `.site-section.sec-[section-name]`
   * Examples: `.sec-banner`, `.sec-about`, `.sec-services`, `.sec-process`, `.sec-cta`, `.sec-not-found`
2. **Section Container**:
   * Pattern: `.site-container.sec-[section-name]__container.container-large.padding-global`
3. **Section Header**:
   * Pattern: `.section-header.sec-[section-name]__header`
4. **Section Badge**:
   * Pattern: `.section-badge.sec-[section-name]__badge`
5. **Headings**:
   * Pattern: `.heading-style-h2.section-title.sec-[section-name]__title.text-color-alternate`
6. **Paragraphs**:
   * Pattern: `p.alg-text.section-description.sec-[section-name]__desc`
7. **Buttons**:
   * Pattern: `.main-button.alternate-button.w-inline-block`
   * Internal wrapper: `.main-button-block`
   * Text: `.button-text.alternate-text`
   * Icon: `.button-icon`
8. **Grids**:
   * Pattern: `.w-layout-grid` or `.[name]-grid`
9. **Utility Classes**:
   * Text: `.text-color-secondary`, `.text-color-alternate`, `.text-color-white`
   * Spacers: `.spacer-[size]`, `.padding-section-[size]`, `.padding-global`

---

## 8. Component Reuse Rules

When building any new subpage, **ALWAYS** reuse these established common components instead of creating custom duplicates:

| Component | Path | Purpose |
| :--- | :--- | :--- |
| **`Header`** | `src/components/common/Header.jsx` | Site-wide navigation bar and mobile drawer |
| **`Footer`** | `src/components/common/Footer.jsx` | Site-wide dark footer with newsletter & links |
| **`PageBanner`** | `src/components/common/PageBanner.jsx` | 50vh subpage hero banner with dynamic title & breadcrumbs |
| **`SubtitleMarquee`**| `src/components/common/SubtitleMarquee.jsx`| Unified pre-heading ticker badge |
| **`Cursor`** | `src/components/common/Cursor.jsx` | Custom trailing cursor |
| **`BackToTop`** | `src/components/common/BackToTop.jsx` | Floating back-to-top button |
| **`SmoothScroll`** | `src/components/common/SmoothScroll.jsx` | Lenis smooth scrolling wrapper |
| **`titleAnimation`**| `src/utils/titleAnimation.js` | Character split & GSAP stagger entrance |

---

## 9. Rules for Creating New Pages

When developing any new page in the `src/app/` router (e.g. `src/app/services/page.jsx`, `src/app/about/page.jsx`):

1. **Page Outer Layout**:
   ```jsx
   import { Header } from '../../components/common/Header';
   import { Footer } from '../../components/common/Footer';
   import { PageBanner } from '../../components/common/PageBanner';
   import { Cursor } from '../../components/common/Cursor';
   import { BackToTop } from '../../components/common/BackToTop';
   import { SmoothScroll } from '../../components/common/SmoothScroll';

   export const metadata = {
     title: 'Page Title | Algofort',
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
             {/* New Page Sections (Alternating Light & Dark) */}
           </main>
           <Footer />
         </div>
       </SmoothScroll>
     );
   }
   ```
2. **Follow Rhythmic Contrast**: Do not create two consecutive dark sections without purpose. Use `#f4f4f2` for editorial content and dark cards for feature highlights.
3. **Use Established Buttons**: Every CTA button must use the `.main-button.alternate-button` structure with rolling text and rotating star icon.

---

## 10. Strict "Do Not Change" Rules

To ensure long-term stability and prevent visual regressions:

1. **Do not change the existing Home page design**: Every section, layout, spacing, and font on `src/app/page.jsx` is finalized and approved.
2. **Do not change existing functionality or dependencies**: Keep existing package versions.
3. **Do not modify animations or effects unless explicitly requested**: GSAP timelines, odometer rolls, cursor trails, and physics dividers are calibrated.
4. **Do not introduce external CDNs**: All fonts, scripts, and media must be served locally from `/public/`. Zero external Google Fonts, unpkg, cdnjs, or cdn.jsdelivr.net URLs are permitted.
5. **Mandatory Mona Sans Narrow Rule**: Whenever `Mona Sans Narrow` font is applied, `text-transform: uppercase` is **mandatory**.
6. **Reuse existing classes & components**: Never write duplicate CSS rules for buttons, titles, or badges.
7. **Preserve responsive behavior**: Ensure all new sections maintain desktop, tablet, and mobile parity.