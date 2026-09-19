# CAGED data and teaching notes

## Scope

Four scales (major, natural minor, major pentatonic, minor pentatonic), nine seventh-chord arpeggios, twelve roots and five named families. The new engine is independent of the existing Scale Finder's twelve vertical windows.

`caged-patterns.js` stores C-root arpeggio fret positions, ordered from low E to high E. `caged-engine.js` transposes the whole fingering and shifts it by an octave when possible to keep it accessible. It never wraps individual notes independently. Shapes containing open strings show those notes outside the nut.

## Letter convention

C/A/G/E/D refer to the selected tonic's chord/root family. Root anchors in standard tuning are:

| Family | Characteristic root strings |
|---|---|
| C | 5 and 2 |
| A | 5 and 3 |
| G | 6, 3 and 1 |
| E | 6, 4 and 1 |
| D | 4 and 2 |

Minor scales are derived from relative-major pitch collections, then relabeled by the **minor tonic's** family: minor C/A/G/E/D correspond to relative-major D/C/A/G/E. Pentatonic shapes retain the matching full scale's note locations. Boundaries overlap; these are suggested fingerings, not the only way to play the notes.

## References

The arpeggio fret positions were checked against the five-position diagrams on these public pages. Images are not bundled or hotlinked in the app. Original diagram order varies: most run A/G/E/D/C, while m7(b5) runs C/A/G/E/D. Chart order is not used as the letter label.

- [maj7](https://jenslarsen.nl/maj7-arpeggios-caged/)
- [m7](https://jenslarsen.nl/min7-arpeggios-caged/)
- [7](https://jenslarsen.nl/dom7-arpeggios-caged/)
- [m7(b5)](https://jenslarsen.nl/min7b5-arpeggios-caged/)
- [maj7(#5)](https://jenslarsen.nl/maj75-arpeggios-caged/)
- [m(maj7)](https://jenslarsen.nl/minmaj7-arpeggios-caged/)
- [dim7](https://jenslarsen.nl/dim-arpeggios-caged/)
- [maj7(b5)](https://jenslarsen.nl/maj7b5-arpeggios-caged/)
- [7(b5)](https://jenslarsen.nl/dom7b5-arpeggios-caged/)

The symmetric dim7 source includes overlapping root regions. Its E, D and C fingerings are adapted here to include the corresponding root anchors consistently; they are not presented as exact copies. The dim7 section states this visibly. The major and minor scale templates are authored for this application; they are not claimed as Jens Larsen charts.

Teaching text is original bilingual copy. The three exercises use one C-major E-family position: find roots, identify intervals, and compare Cmaj7 with the surrounding major scale. Further reading is linked to Jens Larsen's public lessons. The site does not imply that these exercises are an official Jens Larsen curriculum.

## TAB and spelling

TAB traverses actual pitches from low to high and returns, without repeating the top note. Unison duplicates use one available string location. Long lines wrap into six-string systems with up to sixteen events, without truncating the return. One-octave mode starts on an available root and includes the root one octave above before returning. Diagram notes and TAB come from the same shape.

Note names follow the interval formula rather than a pitch-class-only lookup. For example, Cdim7 is C–E♭–G♭–B♭♭. The root menu currently uses the flat names for the five enharmonic black-key roots.

## Checks

```text
node verify-caged.js
node verify-scale-tabs.js
```

The first check covers all 780 combinations, interval membership, note spelling, root markers, valid fret ranges, distinct shapes, complete ascending/descending TAB, single-octave completeness and scale/arpeggio alignment. The second check preserves the existing Scale Finder behavior.

Language and CAGED selections are saved locally. Storage failures (such as restricted file/private browsing) are handled; the page still works without persistence. No account or network request is needed for the tool itself.
