The real 8th Sutton (TSGG) Group lock-up as supplied artwork — use it anywhere the Group identifies itself, in place of `Logo` with a `personalisation` string.

```jsx
<GroupLogo tone="purple" height={120} />
<GroupLogo tone="white" height={90} />   {/* on purple, black or photography */}
```

- Three tones only: `purple`, `black`, `white` — the artwork is single-colour and must not be recoloured, outlined or placed in a box.
- Keep clear space around it equal to the height of the "u" in Scouts, and don't go below ~110px (30mm) tall.
- Artwork lives in `assets/logo/group/`; paths resolve against the compiled bundle, so pass `src` if you copied the PNGs somewhere else.
- Still use `Logo` for national lock-ups (horizontal, wordmark, fleur) and `Fleur` for the mark alone.
