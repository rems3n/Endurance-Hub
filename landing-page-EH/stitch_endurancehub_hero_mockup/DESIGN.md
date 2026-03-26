# Design System Strategy: High-Performance Endurance

## 1. Overview & Creative North Star
**Creative North Star: The Precision Chronometer**

This design system is engineered for the elite endurance athlete. It moves away from the "loud" neon aesthetics of consumer fitness apps and instead adopts the quiet, disciplined authority of high-end Swiss timing instrumentation and editorial sports journals. 

To achieve a "High-End" feel, we break the standard grid through **Intentional Asymmetry** and **Tonal Depth**. Instead of boxing data into rigid containers, we use white space as a structural element. Content should feel like it is "set" onto a gallery wall—spacious, breathable, and mathematically precise. We avoid the "template" look by layering surfaces rather than drawing lines, creating a UI that feels carved from a single block of marble rather than assembled from parts.

---

## 2. Colors & Surface Logic
The palette is a sophisticated study in desaturated cool tones. By removing "highlighter" colors, we force the user’s focus onto the data and the typography.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. We define boundaries through **Background Shifts**. 
*   **Action:** Place a `surface-container-low` (#f0f4f7) sidebar against a `surface` (#f7f9fb) main stage. The human eye perceives the change in luminosity as a boundary more elegantly than a stroke.

### Surface Hierarchy & Nesting
Treat the interface as a physical stack of premium materials.
*   **Base Level:** `surface` (#f7f9fb)
*   **Sub-Sectioning:** `surface-container-low` (#f0f4f7)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) to provide "pop" against the gray base.
*   **Overlays/Modals:** `surface-bright` (#f7f9fb) with high-end glassmorphism.

### The Glass & Gradient Rule
To prevent the UI from feeling "flat" or "dead," main CTAs and Hero sections should utilize a **Subtle Tonal Gradient**.
*   **Signature Gradient:** `primary` (#545f73) to `primary-dim` (#485367) at a 135-degree angle. This adds a metallic, machined quality to buttons that flat colors lack.
*   **Glassmorphism:** For floating navigation or weather overlays, use `surface` at 80% opacity with a `24px` backdrop-blur.

---

## 3. Typography: Athletic Editorial
We use **Plus Jakarta Sans** not as a standard sans-serif, but as a geometric tool. It provides the "modern, athletic" feel through its wide stance and open counters.

*   **Display (Large Data Points):** `display-lg` (3.5rem) should be used for primary metrics (e.g., Heart Rate, Pace). Use a `tight` letter-spacing (-0.02em) to give it a "pro" look.
*   **Headlines:** `headline-md` (1.75rem) serves as the editorial voice. Ensure generous `16` (4rem) spacing above headlines to let the topic breathe.
*   **The Contrast Rule:** Pair `label-sm` (all-caps, 0.5px tracking) with `title-lg`. The tension between the tiny, technical label and the large title creates an authoritative hierarchy found in premium watch interfaces.

---

## 4. Elevation & Depth
In this system, elevation is a whisper, not a shout.

*   **The Layering Principle:** Depth is achieved by stacking. A card (`surface-container-lowest`) sitting on a section (`surface-container-low`) creates an immediate 3D relationship without a single drop shadow.
*   **Ambient Shadows:** For floating elements, use an ultra-diffused shadow:
    *   `box-shadow: 0 20px 40px rgba(42, 52, 57, 0.04);`
    *   The shadow color is derived from `on-surface` (#2a3439), making it feel like a natural occlusion of light rather than a "glow."
*   **The Ghost Border:** If a border is required for accessibility on inputs, use `outline-variant` (#a9b4b9) at **15% opacity**. It should be barely perceptible—felt rather than seen.

---

## 5. Components

### Buttons: The Machined Input
*   **Primary:** Gradient of `primary` to `primary-dim`. Corner radius `md` (0.375rem). Text is `on-primary` (#f6f7ff) in `label-md` weight.
*   **Tertiary (Ghost):** No background, no border. Use `primary` text. Interaction state: `surface-container-high` background on hover.

### Cards: The Data Vessel
*   **Rules:** No borders. No dividers.
*   **Styling:** Use `surface-container-lowest` (#FFFFFF). Use vertical spacing `8` (2rem) between internal content blocks. 
*   **Data Visualization:** Graphs should use `primary` for the main trend line and `outline-variant` for grid lines at 10% opacity.

### Input Fields: Minimalist Precision
*   **State:** Flat background of `surface-container-highest`. No border in default state. 
*   **Focus:** A 1px "Ghost Border" of `primary` appears only on focus. Helper text should be in `label-sm`.

### Performance Chips
*   **Style:** `surface-container-high` background with `on-surface-variant` text. 
*   **Shape:** `full` (9999px) for a "capsule" look that mimics sports equipment.

---

## 6. Do’s and Don’ts

### Do
*   **Use Asymmetry:** Align primary metrics to the left and secondary metadata to the far right to create dynamic tension.
*   **Embrace the Gray:** Use the full spectrum of the `surface-container` tokens to create "rooms" within the app.
*   **Prioritize Typography:** Let the size of the numbers communicate the importance, not the color.

### Don’t
*   **Don't use 100% Black:** It is too heavy for this "High-End" vibe. Stick to `on-background` (#2a3439) for maximum "slate" sophistication.
*   **Don't use Dividers:** Avoid horizontal rules `<hr>`. Use a `spacing-12` (3rem) gap instead. If you must separate, use a subtle background color shift.
*   **Don't use High-Saturation Colors:** Even for "Success" states, use the `tertiary` (#526073) or a muted forest green that fits the slate palette. No "highlighter" greens or reds.

---

## 7. Spacing & Rhythm
Rhythm is dictated by the **Spacing Scale**.
*   **Container Padding:** Always use `spacing-8` (2rem) or `spacing-10` (2.5rem). High-end design requires "wasted" space to feel premium.
*   **Component Gap:** Use `spacing-2` (0.5rem) for related elements (Label + Input). Use `spacing-6` (1.5rem) for unrelated elements.

This system is not a collection of components; it is a philosophy of **restraint**. By limiting the color and structural noise, we allow the athlete's data to become the hero.