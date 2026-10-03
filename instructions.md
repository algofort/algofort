# Algofort Agency - Architecture & Master Guidelines (`instructions.md`)

Welcome to the **Algofort** development repository. This document serves as the **master system prompt and architectural rulebook** for all AI models and developers building, refactoring, or adding pages and components to the Algofort website.

---

## 1. Prime Directive: Home Page is the Primary Visual Reference

> [!IMPORTANT]
> **The Home Page (`src/app/page.jsx`) is already complete, approved, and frozen.**
> - **Do NOT make any changes to the website, Home Page, or existing approved components.**
> - The Home Page is the **primary visual and architectural benchmark** for the entire website.
> - **`design.md` is the global design Single Source of Truth (SSOT).**
> - Every internal and subpage (e.g., Services, About, Projects, Contact, Blog, 404) **must strictly match the completed Home Page** in typography, colors, spacing, container widths, border radii, card designs, buttons, headings, subtitles, paragraphs, animations, Header, Footer, and PageBanner.

**Do not allow future internal pages to invent their own different versions of headings, subtitles, paragraphs, buttons, cards, spacing, radius, or typography.**

---

## 2. Global Design Consistency Requirements

When creating or modifying any internal page or component:

1. **Exact Typography Symmetry**:
   - **H1 Headings**: Follow the exact `Clash Display` bold uppercase scale documented in `design.md`.
   - **H2 Headings**: Use `.heading-style-h2.section-title` with `Mona Sans Narrow`, font-weight `700`, line-height `1.05 - 1.15`, letter-spacing `0.02em`, and margin-bottom `3.5rem`.
   - **MANDATORY RULE (from `AGENTS.md`)**: Whenever `Mona Sans Narrow` font is used, text **MUST** be transformed to uppercase (`text-transform: uppercase !important;`).
   - **H3 Headings**: Use `.heading-style-h3` with `Mona Sans Narrow` uppercase, font-weight `600 - 700`, line-height `1.15 - 1.2`.
   - **Paragraphs**: Use `p.alg-text.section-description` with `Mona Sans`, font-size `16px` (`1rem`), line-height `1.55 - 1.6`, font-weight `400`.
   - **Accent Highlight Words**: Wrap in `<span className="text-color-secondary">` (`#f47a1f` Brand Orange).
   - **Dual-tone on Dark Sections**: Main word `.text-color-alternate` (`#ffffff`), accent word `.text-color-secondary` (`#f47a1f`).
2. **Universal Subtitle Marquee Badge**:
   - Every section must start with the standard pre-heading badge:
     ```jsx
     <div className="section-badge sec-[name]__badge">
       <SubtitleMarquee text="Section Name ✦ " variant="dark" />
     </div>
     ```
   - Do not invent custom pill badges or static labels; always use `SubtitleMarquee`.
   - **Subtitle-to-Heading Spacing Rule**: The vertical gap between each `.section-badge` and the heading beneath it must strictly remain **between 1rem (16px) and 1.25rem (20px maximum)** site-wide. Ensure `margin-top: 0 !important;` on the following heading, and never insert spacer divs or extra padding between badge and heading.
3. **Signature Dual-Text Rolling Button**:
   - Every CTA button must use the signature rolling button pattern:
     ```jsx
     <Link href="/route" className="main-button alternate-button w-inline-block">
       <div className="main-button-block">
         <div className="button-text alternate-text">Button Text</div>
         <div className="button-text alternate-text">Button Text</div>
       </div>
       <img
         loading="lazy"
         src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
         alt="Star Icon"
         className="button-icon"
       />
     </Link>
     ```
   - Dual variants: `.alternate-button` (white background, dark text, black star) and standard `.main-button` (dark background, white text, white star).
   - Never use standard flat un-animated buttons.
4. **Card & Border Radius Rules**:
   - Content Cards: `border-radius: 24px` (`1.5rem`), padding `2.25rem 2rem`.
   - Outer Container Frames: `border-radius: 32px` (`2rem`).
   - Input Fields: `border-radius: 12px` (`0.75rem`).
   - Buttons & Badges: `border-radius: 100px` (Full Pill).
5. **Color Palette Enforcement**:
   - Primary Canvas: `#f4f4f2` (Warm Paper White).
   - Deep Dark Containers: `#05080c` / `#0b0c10` / `#0e0e0e`.
   - Brand Accent: `#f47a1f` (`--brand-orange`).
   - Dark Text: `#05080c` / `#111111`.
   - Light Text: `#ffffff` / `rgba(255, 255, 255, 0.72)`.
   - Never invent random blue, green, purple, or uncalibrated grey shades.
6. **Spacing & Rhythmic Contrast**:
   - Standard section padding: `8rem` desktop, `5rem` tablet, `4rem` mobile.
   - Container max-width: `1600px` (`--site-container-max-w: 1600px;`) with `2rem` inline padding on desktop (`1.5rem` tablet, `1.25rem` mobile).
   - **Subtitle to Heading Spacing**: Strictly `1rem` (`16px`) to `1.25rem` (`20px maximum`) site-wide.
   - Alternate gracefully between dark containers and light canvas sections.

---

## 3. Mandatory Component Reuse

When developing any internal or subpage, developers and AI agents **MUST REUSE** the existing global components located in `src/components/common/`:

| Component | File Path | Reuse Guideline |
| :--- | :--- | :--- |
| **`Header`** | `src/components/common/Header.jsx` | Mandatory global top navigation bar and sliding mobile drawer. Positioned absolute over top banner. |
| **`Footer`** | `src/components/common/Footer.jsx` | Mandatory global obsidian footer with newsletter, social list, navigation, and SVG brand watermark. |
| **`PageBanner`** | `src/components/common/PageBanner.jsx` | Mandatory 50vh top hero banner for all internal pages with dynamic title and breadcrumbs. |
| **`SubtitleMarquee`** | `src/components/common/SubtitleMarquee.jsx` | Mandatory pre-heading badge ticker for all sections across all pages. |
| **`Cursor`** | `src/components/common/Cursor.jsx` | Mandatory site-wide trailing cursor. |
| **`BackToTop`** | `src/components/common/BackToTop.jsx` | Mandatory floating back-to-top button. |
| **`SmoothScroll`** | `src/components/common/SmoothScroll.jsx` | Mandatory Lenis smooth scrolling provider wrapping the page. |
| **`initTitleAnimation`** | `src/utils/titleAnimation.js` | Mandatory GSAP character split and stagger entrance for section titles. |

---

## 4. Standard Page Template for Future Internal Pages

Every future internal page must follow this standardized template:

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
          
          {/* New Page Sections Built strictly using design.md rules */}
          
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
```

---

## 5. Strict BEM Dual-Class Convention

To preserve global stylesheet symmetry and avoid conflicting style leakage:
1. **Never invent arbitrary ad-hoc class names** (e.g. `.custom-box-3`, `.my-title`).
2. **Dual-class convention is mandatory**:
   - **Global Shared Class (Symmetry)**: Connects to site-wide typography, spacing, and reset rules.
   - **Unique Scoped Class (Modifier)**: Identifies the specific section.

### Class Taxonomy Reference:
| Element | Global Symmetrical Class | Section Scoped Class | Example for "Services" |
| :--- | :--- | :--- | :--- |
| **Parent Section** | `.site-section` | `.sec-[name]` + `id="sec-[name]"` | `class="site-section sec-services" id="sec-services"` |
| **Inner Container** | `.site-container` | `.sec-[name]__container` | `class="site-container sec-services__container container-large padding-global"` |
| **Section Header** | `.section-header` | `.sec-[name]__header` | `class="section-header sec-services__header"` |
| **Section Eyebrow** | `.section-badge` | `.sec-[name]__badge` | `class="section-badge sec-services__badge"` |
| **Section Heading** | `.heading-style-h2.section-title` | `.sec-[name]__title` | `class="heading-style-h2 section-title sec-services__title"` |
| **Description** | `p.alg-text.section-description` | `.sec-[name]__desc` | `class="alg-text section-description sec-services__desc"` |
| **Cards / Grid items** | `.content-card` | `.sec-[name]__card` | `class="content-card sec-services__card"` |
| **Buttons / CTA** | `.main-button.alternate-button` | `.sec-[name]__btn` | `class="main-button alternate-button sec-services__btn"` |

---

## 6. GSAP Animation & Performance Standards

Algofort relies on GSAP for smooth interactive agency animations. To prevent hydration mismatches, memory leaks, and layout jitter:
1. **Use Scoped Timelines**: Scope animations to component container refs (`containerRef.current`).
2. **Animation Properties**: Animate GPU-accelerated transforms (`x`, `y`, `scale`, `rotation`) and `opacity` only. Never animate `top`, `left`, `margin`, or `width/height`.
3. **Accessibility**: Always include a `prefers-reduced-motion` check to respect user accessibility preferences.
4. **ScrollTrigger Lifecycle**: In React `useEffect`, cleanly kill triggers upon unmounting or refresh them after fonts and DOM settle.

---

## 7. Zero-CDN & Security Protocol

1. **100% Local Assets**: Zero external CDN requests. All fonts, SVG icons, videos, and scripts must reside in `/public/` (`/public/fonts/`, `/public/assets/`, `/public/scripts/`).
2. **Safe External Links**: Every external link with `target="_blank"` **must** include `rel="noopener noreferrer"`.
3. **XSS Protection**: Zero unescaped HTML or `dangerouslySetInnerHTML`.

---

## 8. AI Output Verification Checklist

Before delivering or committing any code for Algofort, verify against this checklist:
- [ ] Does the new page use the global `Header`, `Footer`, `PageBanner`, `Cursor`, `BackToTop`, and `SmoothScroll`?
- [ ] Are all headings using `.heading-style-h2.section-title` with `Mona Sans Narrow` uppercase?
- [ ] Are all subtitles using `SubtitleMarquee` inside `.section-badge`?
- [ ] Are all buttons using the dual-text rolling `.main-button` structure with star icon?
- [ ] Are container widths constrained to `1600px` (`--site-container-max-w`) with standard padding?
- [ ] Are card radii set to `24px` (`1.5rem`) and outer container frames set to `32px` (`2rem`)?
- [ ] Are all colors mapped to the existing variables (`--brand-orange`, `#05080c`, `#f4f4f2`, `#ffffff`)?
- [ ] Did you avoid altering any existing code on `src/app/page.jsx` or completed Home sections?
- [ ] Is `npx oxlint` passing with 0 errors?
