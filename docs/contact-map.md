# Contact Us studio map

Verified on 5 November 2026.

## Location and provenance

- Exact marker position: **24.8731622 latitude, 67.054048 longitude**. MapLibre receives `[67.054048, 24.8731622]`.
- The user's [confirmed map pin](https://maps.app.goo.gl/FgY71o4sqBrt1FQs6) resolves to `84j Ghazali Rd, P.E.C.H.S Block 2 Block 2 PECHS, Karachi, 75300, Pakistan`, with `!3d24.8731622!4d67.054048` in the resolved location URL.
- [OpenStreetMap Nominatim reverse geocoding](https://nominatim.openstreetmap.org/reverse?lat=24.8731622&lon=67.054048&format=jsonv2&zoom=18&addressdetails=1) independently matches the same property: **house 84J**, PECHS Block 2, [OSM building way 516073520](https://www.openstreetmap.org/way/516073520). The supplied pin lies inside that property's bounding box: latitude `24.8729828–24.8732043`, longitude `67.0539841–67.0542555`.
- Nominatim returns the building centroid at `24.8730936, 67.0541198`. The marker deliberately uses the user's exact pin instead of moving it to that centroid.
- OSM lists postcode `75100`; the supplied address lists `75300`. The address text is preserved as requested.
- The removed Google embed's viewport center was different from its address pin. Its viewport center was not used to place the new marker.

Google's public listing was used only to read the user's supplied pin during development. The replacement map makes no Google Maps or paid mapping requests. Existing reCAPTCHA is unrelated and is unchanged.

## Renderer and free map services

- Added package: `maplibre-gl` **6.16.0**, with its normal transitive dependencies.
- [Official OpenFreeMap dark style](https://tiles.openfreemap.org/styles/dark), recolored inside the map to navy, with its original road geometry, street labels and attribution.
- [Official OpenFreeMap vector source](https://tiles.openfreemap.org/planet). The TileJSON endpoint selects the current public OSM/OpenMapTiles tile release; the application does not pin an obsolete dated tile URL.
- Fonts and sprites use the official `tiles.openfreemap.org` endpoints declared by the style. The MapLibre worker is bundled locally by Next.js.
- [OpenFreeMap documentation](https://openfreemap.org/quick_start/) describes the public service and supported styles. No API keys, paid tiles or subscriptions are used.

## Actual 3D geometry and data limits

`algofort-3d-buildings` is a MapLibre `fill-extrusion` layer reading the vector source's **building** layer. It uses `render_height` and `render_min_height`, with support for `height` and `min_height` if supplied. Missing or invalid positive heights fall back to **9 m**. Minimum heights are clamped between zero and the building top. Features marked `hide_3d: true` are excluded.

The official style's interleaved labels are drawn after the buildings so street names remain visible. Actual POIs from the same vector source supply the landmark dots and labels. Lighting and vertical gradients shade the extrusions; these are not photogrammetric buildings or a simulation of cast shadows.

Inspection of the current zoom-14 vector tiles found **1,868 footprint polygons** within approximately 0.006 degrees of longitude and 0.005 degrees of latitude of the studio. Most nearby tile heights were **5, 8 or 11 m**; other values ranged from **4 to 55 m**. Tile features group many polygons, so a count of vector features is not a count of buildings.

OpenMapTiles can derive its height values from building levels or defaults. Neither those values nor the application's missing-height fallback should be represented as surveyed measurements. The immediate neighborhood is mostly low-rise. Its actual geometry differs from the Manhattan reference; no artificial towers, randomized footprints or inflated heights are added. Parks and water are shown where they exist in the geographic data, including when navigating away from the initial street view.

## Scope and behavior

- Only the Contact Us map embed is replaced. Its wrapper, existing `alg-contact-map-iframe` sizing class, spacing, breakpoints and rounded corners are retained.
- New appearance rules live in `ContactMap.module.css`; no existing global stylesheet is edited.
- The initial view uses zoom `17.2`, pitch `62°` and bearing `-28°`.
- Standard navigation provides zoom, compass rotation/reset, mouse drag, keyboard navigation and touch gestures. Extra buttons toggle the 3D perspective and return to the exact studio pin.
- A native accessible marker button opens the complete address and an OpenStreetMap link. The popup adapts to narrow screens.
- Cooperative gestures preserve ordinary page scrolling; MapLibre is isolated from Lenis inside its own fixed-size box. No existing GSAP/ScrollTrigger behavior changes.
- The renderer and remote style load near the viewport. Device pixel ratio is capped at 2. ResizeObserver keeps the canvas aligned with the existing container.
- Component cleanup aborts pending style requests and removes the map, marker, popup, listeners, observer, animation frame and timeout. React Strict Mode and repeated viewport changes retain one map canvas.
- Tile errors display a retry notice. Style/network/WebGL failures display an address, location link and retry action in the same map box.

## Verification

- Browser rendering confirmed real navy building extrusions and readable street/landmark labels at the verified Karachi pin.
- Mouse zoom and drag, keyboard rotation and pitch, marker activation by mouse and keyboard, popup close, 3D toggle and recenter were exercised.
- Desktop baseline comparison: the map wrapper, map surface, contact grid, heading, description, contact cards and form retained exactly the same geometry and fonts. Existing text outside the map was identical.
- Responsive checks: desktop `1440 × 900`, tablet `820 × 1180`, mobile `390 × 844` and narrow mobile `320 × 740`. Map heights remain `450 px` above the existing mobile breakpoint and `350 px` below it, with `28 px` / `20 px` wrapper corner radii. No horizontal page overflow; the mobile popup fits within the map. The temporary browser size override was reset after testing.
- No new browser console errors or warnings during the final interaction checks. An initial warning from the official style's missing `wood-pattern` sprite was resolved by using the map's solid vegetation colors.
- Touch gesture support is configured through MapLibre. Physical-device pinch/rotate gestures and simulated network outages were not exercised by the available browser controls.
- The final style passed MapLibre's official style validator, including free source URLs, extrusion layer placement and the exact supplied coordinates.
- Scoped lint and whitespace checks passed. Repository lint reported existing warnings in unrelated components; the new map files had none.
- All four landing-page production builds passed. The Next.js production build passed, generating all 40 pages. The first restricted build attempt could not create a Windows dependency junction; rerunning with the required filesystem access succeeded.
- A separate local production preview confirmed the bundled worker and map tiles load, the address popup opens, and exactly one canvas is created. The preview was stopped after testing; the existing development server at `localhost:3000` was retained.
- Hash comparison confirmed all 16 pre-existing generated landing-page files were unchanged by the build. Their existing uncommitted changes were preserved.

Files added or changed: `src/components/common/ContactMap.jsx`, `src/components/common/ContactMap.module.css`, `src/components/common/contactMapStyle.js`, the map import/embed in `src/components/sections/ContactSection.jsx`, `package.json`, `package-lock.json`, and this report.
