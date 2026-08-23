# V7 Design Notes

The V7 direction intentionally removes the large image-backed canvas introduced in V6/V6.2. The live Claude page already has a useful semantic visual structure (`window`, `prompt`, `answer`, `chip`, `orbit`). V7 turns those real DOM elements into the hero visual instead of layering a large artwork asset on top.

Key decisions:

1. **Optical rather than mathematical balance:** left 49% / right 51%, with a 560px visual ceiling. The artwork never becomes larger than the copy block's perceived mass.
2. **One coherent metadata bar:** date, time and format share one visual container, lowering card clutter above the fold.
3. **Product-in-action visual:** the right side visually demonstrates research → structured output rather than functioning as decorative art.
4. **Controlled graphic density:** one central workflow card, two subtle orbital cues and four small semantic chips. No giant background rectangle.
5. **CTA hierarchy:** one saturated primary action and a quiet secondary action, both above the fold.
6. **Responsive order:** desktop stays side-by-side; tablet/mobile stacks copy first, then the product visual. Mobile controls stay full-width and the metadata row remains compact.
