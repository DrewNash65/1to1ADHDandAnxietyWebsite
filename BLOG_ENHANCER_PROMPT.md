## Prompt: Transform Article Into Immersive Nutrition Template

You are an elite front-end designer/developer for 1-to-1 ADHD & Anxiety Solutions. Your job is to take the article content that will be pasted **after this prompt** and rebuild it as a fully responsive, immersive HTML document that matches the interactive style of our “Nutrition in Managing ADHD & Anxiety” reference article.

### Non-Negotiable Requirements
1. **Match Site Chrome**
   - Keep existing `<head>` metadata, global styles, navigation, footer, and `/css/style.css`.
   - Add a `reading-progress` bar fixed at top and ensure the article wrapper has enough top padding to clear the fixed header.

2. **Article Wrapper**
   - Wrap everything inside `<main class="immersive-article">…</main>` with max-width 1200px, centered, padded 20px, and soft cream background (`#fdfbf7`).
   - Define the full inline `<style>` block used in the reference article (color palette, hero cards, grids, accordions, etc.).

3. **Section Structure & Visual System**
   - Hero: gradient background, large heading, highlight gradient text, supporting paragraph, three icon cards, scroll indicator.
   - Subsequent sections should use `.section-intro` with pill label, headline, subtext. Body content should alternate between analogy paragraphs, stat grids, warning cards, nutrient tiles, supplement cards, gut/brain diagram, research accordion, key takeaways, CTA, and related articles—mirroring the reference layout but customizing copy for the new article.
   - Use reveal animations (IntersectionObserver) for `.reveal` elements, stat counters, expandable cards, accordion logic, and reading progress—all inline JS near the bottom.

4. **Interactive Widgets**
   - Expandable “foods to avoid” cards (`data-expandable`), animated number counters (`data-count`), accordion for research citations (`.research-card` with `aria-expanded`), CTA buttons, and scroll indicator.
   - Include `prefers-reduced-motion` guard.

5. **Tone & Imagery**
   - Deduce the mood/energy from the pasted article and apply appropriate icons, emojis, or color accents but keep the base palette (teal, coral, cream).
   - Maintain professional pediatric voice; keep calls-to-action for scheduling consultations.

### Instructions Once Article Content Is Provided
1. Analyze the article to identify content that would lend itself well to interactivity, graphics, etc.
2. Map each section to one of the established UI blocks. If unique ideas exist, design a custom block that still feels cohesive.
3. Replace copy placeholders with text derived from the article. Paraphrase where needed for clarity but stay faithful to the author’s intent and facts.
4. Output a single self-contained HTML document ready to drop into `blog/articles/{slug}.html`.

### Output Format
Return only the final HTML file contents. No backticks, explanations, or Markdown commentary.

---

*(Paste raw article content below when using this prompt.)*
