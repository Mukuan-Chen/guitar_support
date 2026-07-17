(function attachScaleEngine(globalObject, factory) {
  const engine = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = engine;
  }

  if (globalObject) {
    globalObject.GUITAR_SCALE_ENGINE = engine;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createScaleEngine() {
  const STANDARD_VERTICAL_SPAN = 4;
  const TAB_BEAT_COUNT = 48;

  function mod(value, base) {
    return ((value % base) + base) % base;
  }

  function noteAt(tuning, stringIndex, fret) {
    return mod(tuning[stringIndex].note + fret, 12);
  }

  function scaleNoteValues(rootValue, steps) {
    return steps.map((step) => mod(rootValue + step, 12));
  }

  function nextScaleNote(noteValues, noteValue) {
    let index = noteValues.indexOf(mod(noteValue, 12)) + 1;
    if (index >= noteValues.length) index = 0;
    return noteValues[index];
  }

  // Mirrors all-guitar-chords.com's standard-tuning setVerticalScale routine.
  // The local tuning array is ordered low E to high E, the reverse of the
  // reference site's internal string numbering.
  function createVerticalShape({
    rootValue,
    steps,
    tuning,
    startFret,
    number,
    fretCount,
  }) {
    const noteValues = scaleNoteValues(rootValue, steps);
    let effectiveStartFret = startFret;

    if (effectiveStartFret >= fretCount - STANDARD_VERTICAL_SPAN) {
      effectiveStartFret = fretCount - STANDARD_VERTICAL_SPAN - 1;
    }

    const effectiveEndFret = effectiveStartFret + STANDARD_VERTICAL_SPAN;
    const strings = tuning.map((_, stringIndex) => ({ stringIndex, frets: [] }));
    let nextNote = null;

    for (let stringIndex = 0; stringIndex < tuning.length; stringIndex += 1) {
      for (let fret = effectiveStartFret; fret <= effectiveEndFret; fret += 1) {
        const noteValue = noteAt(tuning, stringIndex, fret);

        if (nextNote === null) {
          if (!noteValues.includes(noteValue)) continue;
        } else if (noteValue !== nextNote) {
          continue;
        }

        const isHighestString = stringIndex === tuning.length - 1;
        if (!isHighestString) {
          const nextStringStartNote = noteAt(tuning, stringIndex + 1, effectiveStartFret);
          if (nextStringStartNote === nextNote) continue;
        } else if (fret - effectiveStartFret >= 5) {
          continue;
        }

        strings[stringIndex].frets.push({
          fret,
          noteValue,
          interval: mod(noteValue - rootValue, 12),
          root: noteValue === mod(rootValue, 12),
        });
        nextNote = nextScaleNote(noteValues, noteValue);
      }
    }

    return {
      number,
      startFret,
      endFret: startFret + STANDARD_VERTICAL_SPAN,
      effectiveStartFret,
      effectiveEndFret,
      strings,
    };
  }

  // Mirrors the reference site's TablatureData.setScale traversal: low-to-high
  // ascending, high-to-low descending, with the top note played only once.
  function tabEventsForShape(shape, beatCount = TAB_BEAT_COUNT) {
    const ascending = [];
    const descending = [];

    shape.strings.forEach((string, stringIndex) => {
      string.frets.forEach((item) => {
        ascending.push({ stringIndex, fret: item.fret });
      });
    });

    for (let stringIndex = shape.strings.length - 1; stringIndex >= 0; stringIndex -= 1) {
      const frets = shape.strings[stringIndex].frets;
      for (let index = frets.length - 1; index >= 0; index -= 1) {
        descending.push({ stringIndex, fret: frets[index].fret });
      }
    }

    if (descending.length) descending.shift();
    return [...ascending, ...descending].slice(0, beatCount);
  }

  return {
    STANDARD_VERTICAL_SPAN,
    TAB_BEAT_COUNT,
    createVerticalShape,
    mod,
    noteAt,
    scaleNoteValues,
    tabEventsForShape,
  };
}));
