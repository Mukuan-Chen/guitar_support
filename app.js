const roots = [
  { label: "C", value: 0 },
  { label: "C#/Db", value: 1 },
  { label: "D", value: 2 },
  { label: "D#/Eb", value: 3 },
  { label: "E", value: 4 },
  { label: "F", value: 5 },
  { label: "F#/Gb", value: 6 },
  { label: "G", value: 7 },
  { label: "G#/Ab", value: 8 },
  { label: "A", value: 9 },
  { label: "A#/Bb", value: 10 },
  { label: "B", value: 11 }
];

const noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
const shortNoteNames = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const tuning = [
  { string: "E", note: 4 },
  { string: "A", note: 9 },
  { string: "D", note: 2 },
  { string: "G", note: 7 },
  { string: "B", note: 11 },
  { string: "E", note: 4 }
];

const chordTypeSpecs = [
  { label: "Major", suffix: "", formula: ["1", "3", "5"] },
  { label: "Minor", suffix: "m", formula: ["1", "b3", "5"] },
  { label: "7", suffix: "7", formula: ["1", "3", "5", "b7"] },
  { label: "5", suffix: "5", formula: ["1", "5"], minPlayed: 2 },
  { label: "dim", suffix: "dim", formula: ["1", "b3", "b5"] },
  { label: "dim7", suffix: "dim7", formula: ["1", "b3", "b5", "6"] },
  { label: "aug", suffix: "aug", formula: ["1", "3", "#5"] },
  { label: "sus2", suffix: "sus2", formula: ["1", "2", "5"] },
  { label: "sus4", suffix: "sus4", formula: ["1", "4", "5"] },
  { label: "maj7", suffix: "maj7", formula: ["1", "3", "5", "7"] },
  { label: "m7", suffix: "m7", formula: ["1", "b3", "5", "b7"] },
  { label: "7sus4", suffix: "7sus4", formula: ["1", "4", "5", "b7"] },
  { label: "maj9", suffix: "maj9", formula: ["1", "3", "5", "7", "9"] },
  { label: "maj11", suffix: "maj11", formula: ["1", "3", "5", "7", "9", "11"] },
  { label: "maj13", suffix: "maj13", formula: ["1", "3", "5", "7", "9", "13"] },
  { label: "maj9(#11)", suffix: "maj9(#11)", formula: ["1", "3", "5", "7", "9", "#11"] },
  { label: "maj13(#11)", suffix: "maj13(#11)", formula: ["1", "3", "5", "7", "9", "#11", "13"] },
  { label: "add9", suffix: "add9", formula: ["1", "3", "5", "9"] },
  { label: "6add9", suffix: "6add9", formula: ["1", "3", "5", "6", "9"] },
  { label: "maj7(b5)", suffix: "maj7(b5)", formula: ["1", "3", "b5", "7"] },
  { label: "maj7(#5)", suffix: "maj7(#5)", formula: ["1", "3", "#5", "7"] },
  { label: "m6", suffix: "m6", formula: ["1", "b3", "5", "6"] },
  { label: "m9", suffix: "m9", formula: ["1", "b3", "5", "b7", "9"] },
  { label: "m11", suffix: "m11", formula: ["1", "b3", "5", "b7", "9", "11"] },
  { label: "m13", suffix: "m13", formula: ["1", "b3", "5", "b7", "9", "11", "13"] },
  { label: "m(add9)", suffix: "m(add9)", formula: ["1", "b3", "5", "9"] },
  { label: "m6add9", suffix: "m6add9", formula: ["1", "b3", "5", "6", "9"] },
  { label: "mmaj7", suffix: "mmaj7", formula: ["1", "b3", "5", "7"] },
  { label: "mmaj9", suffix: "mmaj9", formula: ["1", "b3", "5", "7", "9"] },
  { label: "m7b5", suffix: "m7b5", formula: ["1", "b3", "b5", "b7"] },
  { label: "m7#5", suffix: "m7#5", formula: ["1", "b3", "#5", "b7"] },
  { label: "6", suffix: "6", formula: ["1", "3", "5", "6"] },
  { label: "9", suffix: "9", formula: ["1", "3", "5", "b7", "9"] },
  { label: "11", suffix: "11", formula: ["1", "3", "5", "b7", "9", "11"] },
  { label: "13", suffix: "13", formula: ["1", "3", "5", "b7", "9", "13"] },
  { label: "7b5", suffix: "7b5", formula: ["1", "3", "b5", "b7"] },
  { label: "7#5", suffix: "7#5", formula: ["1", "3", "#5", "b7"] },
  { label: "7b9", suffix: "7b9", formula: ["1", "3", "5", "b7", "b9"] },
  { label: "7#9", suffix: "7#9", formula: ["1", "3", "5", "b7", "#9"] },
  { label: "7(b5,b9)", suffix: "7(b5,b9)", formula: ["1", "3", "b5", "b7", "b9"] },
  { label: "7(b5,#9)", suffix: "7(b5,#9)", formula: ["1", "3", "b5", "b7", "#9"] },
  { label: "7(#5,b9)", suffix: "7(#5,b9)", formula: ["1", "3", "#5", "b7", "b9"] },
  { label: "7(#5,#9)", suffix: "7(#5,#9)", formula: ["1", "3", "#5", "b7", "#9"] },
  { label: "9b5", suffix: "9b5", formula: ["1", "3", "b5", "b7", "9"] },
  { label: "9#5", suffix: "9#5", formula: ["1", "3", "#5", "b7", "9"] },
  { label: "13#11", suffix: "13#11", formula: ["1", "3", "5", "b7", "9", "#11", "13"] },
  { label: "13b9", suffix: "13b9", formula: ["1", "3", "5", "b7", "b9", "13"] },
  { label: "11b9", suffix: "11b9", formula: ["1", "5", "b7", "b9", "11"] },
  { label: "sus2sus4", suffix: "sus2sus4", formula: ["1", "2", "4", "5"] },
  { label: "-5", suffix: "-5", formula: ["1", "5"], minPlayed: 2 }
];

const intervalByStep = {
  "1": 0,
  "b2": 1,
  "b9": 1,
  "2": 2,
  "9": 2,
  "#9": 3,
  "b3": 3,
  "3": 4,
  "4": 5,
  "11": 5,
  "b5": 6,
  "#11": 6,
  "5": 7,
  "#5": 8,
  "6": 9,
  "13": 9,
  "b7": 10,
  "7": 11
};

function intervalForStep(step) {
  return intervalByStep[step];
}

function requiredIntervals(formula) {
  const requiredSteps = formula.filter((step) => (
    step === "1" ||
    step === "3" ||
    step === "b3" ||
    step === "4" ||
    step === "b5" ||
    step === "#5" ||
    step === "6" ||
    step === "b7" ||
    step === "7" ||
    step === "b9" ||
    step === "#9" ||
    step === "#11"
  ));
  return [...new Set(requiredSteps.map(intervalForStep))];
}

const chordTypes = chordTypeSpecs.map((type) => ({
  ...type,
  intervals: [...new Set(type.formula.map(intervalForStep))],
  required: requiredIntervals(type.formula)
}));

const state = {
  root: roots[0],
  type: chordTypes[0],
  labelMode: "finger",
  leftHanded: false
};

const rootButtons = document.querySelector("#rootButtons");
const typeButtons = document.querySelector("#typeButtons");
const selectedChord = document.querySelector("#selectedChord");
const chordNotes = document.querySelector("#chordNotes");
const chordFormula = document.querySelector("#chordFormula");
const voicingGrid = document.querySelector("#voicingGrid");
const leftHanded = document.querySelector("#leftHanded");
const labelModeButtons = [...document.querySelectorAll("[data-label-mode]")];

function mod(value, base) {
  return ((value % base) + base) % base;
}

function chordName(root, type) {
  if (type.label === "Major" || type.label === "Minor") {
    return `${root.label} ${type.label}`;
  }
  return `${root.label}${type.suffix}`;
}

function buildButtons() {
  rootButtons.innerHTML = roots.map((root) => (
    `<button class="choice ${root.value === state.root.value ? "active" : ""}" type="button" data-root="${root.value}">${root.label}</button>`
  )).join("");

  typeButtons.innerHTML = chordTypes.map((type) => (
    `<button class="choice ${type.label === state.type.label ? "active" : ""}" type="button" data-type="${type.label}">${type.label}</button>`
  )).join("");
}

function noteAt(stringIndex, fret) {
  return mod(tuning[stringIndex].note + fret, 12);
}

function intervalOf(root, note) {
  return mod(note - root.value, 12);
}

function chordNotesFor(root, type) {
  return type.intervals.map((interval) => shortNoteNames[mod(root.value + interval, 12)]);
}

function optionsForString(root, type, stringIndex, windowStart) {
  const intervalSet = new Set(type.intervals);
  const options = [{ fret: -1, muted: true }];
  const frets = [];

  if (windowStart === 0) {
    frets.push(0, 1, 2, 3, 4);
  } else {
    for (let fret = windowStart; fret <= windowStart + 4; fret += 1) {
      frets.push(fret);
    }
  }

  frets.forEach((fret) => {
    const note = noteAt(stringIndex, fret);
    if (intervalSet.has(intervalOf(root, note))) {
      options.push({ fret, muted: false });
    }
  });

  return options;
}

function combine(optionsByString, index = 0, current = [], out = []) {
  if (index === optionsByString.length) {
    out.push(current.slice());
    return out;
  }

  optionsByString[index].forEach((option) => {
    current.push(option);
    combine(optionsByString, index + 1, current, out);
    current.pop();
  });

  return out;
}

function firstPlayedIndex(shape) {
  return shape.findIndex((item) => !item.muted);
}

function playedFrets(shape) {
  return shape.filter((item) => !item.muted).map((item) => item.fret);
}

function frettedFrets(shape) {
  return playedFrets(shape).filter((fret) => fret > 0);
}

function playedIntervals(shape, root) {
  return shape
    .map((item, stringIndex) => item.muted ? null : intervalOf(root, noteAt(stringIndex, item.fret)))
    .filter((item) => item !== null);
}

function isPlayable(shape, root, type) {
  const played = playedFrets(shape);
  if (played.length < (type.minPlayed || 4)) return false;
  if (played.length > 6) return false;

  const firstIndex = firstPlayedIndex(shape);
  if (firstIndex === -1) return false;

  const intervals = playedIntervals(shape, root);
  const intervalSet = new Set(intervals);
  if (!intervalSet.has(0)) return false;
  if (!type.required.every((interval) => intervalSet.has(interval))) return false;

  const fretted = frettedFrets(shape);
  if (fretted.length > 4) return false;
  if (fretted.length > 0 && Math.max(...fretted) - Math.min(...fretted) > 4) return false;

  const bassInterval = intervalOf(root, noteAt(firstIndex, shape[firstIndex].fret));
  if (![0, 3, 4, 5, 7].includes(bassInterval)) return false;

  return true;
}

function shapeKey(shape) {
  return shape.map((item) => item.muted ? "x" : item.fret).join("-");
}

function estimateFingers(shape) {
  const fretted = frettedFrets(shape);
  if (!fretted.length) return shape.map(() => "");

  const minFret = Math.min(...fretted);
  const uniqueFrets = [...new Set(fretted)].sort((a, b) => a - b);
  const barreFret = uniqueFrets.find((fret) => shape.filter((item) => item.fret === fret).length >= 2);
  const fingerByFret = new Map();

  uniqueFrets.forEach((fret) => {
    if (fret === barreFret) {
      fingerByFret.set(fret, 1);
    } else {
      const suggested = Math.min(4, Math.max(1, fret - minFret + 1));
      fingerByFret.set(fret, suggested);
    }
  });

  let nextFinger = 1;
  uniqueFrets.forEach((fret) => {
    if (!fingerByFret.get(fret)) {
      fingerByFret.set(fret, nextFinger);
      nextFinger = Math.min(4, nextFinger + 1);
    }
  });

  return shape.map((item) => {
    if (item.muted || item.fret === 0) return "";
    return String(fingerByFret.get(item.fret));
  });
}

function scoreShape(shape, root, type, windowStart) {
  const firstIndex = firstPlayedIndex(shape);
  const fretted = frettedFrets(shape);
  const intervals = playedIntervals(shape, root);
  const intervalSet = new Set(intervals);
  const bassInterval = intervalOf(root, noteAt(firstIndex, shape[firstIndex].fret));
  let score = 0;

  score += type.required.filter((interval) => intervalSet.has(interval)).length * 32;
  score += intervalSet.size * 12;
  score += intervals.filter((interval) => interval === 0).length * 6;
  if (bassInterval === 0) score += 32;
  if (windowStart === 0 && shape.some((item) => item.fret === 0)) score += 18;
  score += shape.filter((item) => !item.muted).length * 8;
  score -= shape.filter((item) => item.muted).length * 10;
  if (fretted.length) score -= (Math.max(...fretted) - Math.min(...fretted)) * 6;
  score -= fretted.length * 2;
  score -= Math.max(0, windowStart - 7) * 0.5;

  return score;
}

function voicingsFromPdf(root, type) {
  const data = window.CHORD_SHAPES || {};
  const records = data[`${root.label}|${type.label}`] || [];

  return records.map((record) => ({
    name: record.name,
    shape: record.frets.map((fret) => ({
      fret,
      muted: fret < 0
    })),
    fingers: record.fingers || []
  }));
}

function generateVoicings(root, type) {
  const pdfVoicings = voicingsFromPdf(root, type);
  if (pdfVoicings.length) return pdfVoicings;

  const windowStarts = [0, 1, 3, 5, 7, 9, 12];
  const candidates = [];
  const seen = new Set();

  windowStarts.forEach((windowStart) => {
    const optionsByString = tuning.map((_, stringIndex) => optionsForString(root, type, stringIndex, windowStart));
    combine(optionsByString).forEach((shape) => {
      if (!isPlayable(shape, root, type)) return;
      const key = shapeKey(shape);
      if (seen.has(key)) return;
      seen.add(key);

      const fretted = frettedFrets(shape);
      const startFret = fretted.length ? Math.max(1, Math.min(...fretted)) : 1;
      candidates.push({
        shape,
        startFret,
        fingers: estimateFingers(shape),
        score: scoreShape(shape, root, type, windowStart)
      });
    });
  });

  candidates.sort((a, b) => b.score - a.score);

  const selected = [];
  const regions = new Set();

  candidates.forEach((candidate) => {
    const region = Math.floor(candidate.startFret / 3);
    if (selected.length < 6 && (!regions.has(region) || selected.length < 3)) {
      selected.push(candidate);
      regions.add(region);
    }
  });

  return selected.slice(0, 6);
}

function svgForVoicing(voicing, root, type, index) {
  const strings = state.leftHanded ? [5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5];
  const shape = strings.map((stringIndex) => voicing.shape[stringIndex]);
  const fingers = strings.map((stringIndex) => voicing.fingers[stringIndex]);
  const fretted = shape.filter((item) => !item.muted && item.fret > 0).map((item) => item.fret);
  const minFret = fretted.length ? Math.min(...fretted) : 1;
  const hasNut = minFret <= 1;
  const displayStart = hasNut ? 1 : minFret;
  const fretCount = 5;
  const x0 = 42;
  const y0 = 46;
  const width = 220;
  const height = 230;
  const stringGap = width / 5;
  const fretGap = height / fretCount;
  const chordToneLabels = new Map(type.intervals.map((interval) => [mod(root.value + interval, 12), shortNoteNames[mod(root.value + interval, 12)]]));

  const stringLines = strings.map((stringIndex, pos) => {
    const x = x0 + pos * stringGap;
    return `<line class="string" x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + height}"></line>
      <text class="string-label" x="${x}" y="${y0 + height + 21}">${tuning[stringIndex].string}</text>`;
  }).join("");

  const fretLines = Array.from({ length: fretCount + 1 }, (_, fretIndex) => {
    const y = y0 + fretIndex * fretGap;
    const cls = fretIndex === 0 && hasNut ? "nut" : "fret";
    return `<line class="${cls}" x1="${x0}" y1="${y}" x2="${x0 + width}" y2="${y}"></line>`;
  }).join("");

  const topMarks = shape.map((item, pos) => {
    const x = x0 + pos * stringGap;
    if (item.muted) return `<text class="mute-text" x="${x}" y="24">X</text>`;
    if (item.fret === 0) return `<text class="open-text" x="${x}" y="24">O</text>`;
    return "";
  }).join("");

  const markers = shape.map((item, pos) => {
    if (item.muted || item.fret === 0) return "";
    const relativeFret = item.fret - displayStart + 1;
    if (relativeFret < 1 || relativeFret > fretCount) return "";
    const x = x0 + pos * stringGap;
    const y = y0 + (relativeFret - 0.5) * fretGap;
    const note = noteAt(strings[pos], item.fret);
    const label = state.labelMode === "note" ? chordToneLabels.get(note) : fingers[pos];
    return `<circle class="marker" cx="${x}" cy="${y}" r="15"></circle>
      <text class="marker-text" x="${x}" y="${y}">${label || ""}</text>`;
  }).join("");

  const fretLabel = hasNut ? "" : `<text class="fret-text" x="22" y="${y0 + fretGap * 0.5}">${displayStart}fr</text>`;
  const shapeText = voicing.shape.map((item) => item.muted ? "x" : item.fret).join(" ");
  const notes = voicing.shape.map((item, stringIndex) => item.muted ? null : shortNoteNames[noteAt(stringIndex, item.fret)]).filter(Boolean).join(" ");

  return `
    <article class="voicing-card">
      <div class="voicing-head">
        <div>
          <h3>${voicing.name || `Variation ${index + 1}`}</h3>
          <p>${displayStart === 1 ? "Open / low position" : `Around fret ${displayStart}`}</p>
        </div>
        <span class="badge">${displayStart === 1 ? "Open" : `${displayStart}fr`}</span>
      </div>
      <svg class="diagram" viewBox="0 0 304 330" role="img" aria-label="${chordName(root, type)} variation ${index + 1}">
        ${fretLines}
        ${stringLines}
        ${topMarks}
        ${markers}
        ${fretLabel}
      </svg>
      <div class="shape-info">
        <span>Frets: ${shapeText}</span>
        <span>Notes: ${notes}</span>
      </div>
    </article>
  `;
}

function render() {
  buildButtons();
  selectedChord.textContent = chordName(state.root, state.type);
  chordNotes.textContent = chordNotesFor(state.root, state.type).join(" ");
  chordFormula.textContent = state.type.formula.join(" ");
  labelModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.labelMode === state.labelMode);
  });
  leftHanded.checked = state.leftHanded;

  const voicings = generateVoicings(state.root, state.type);
  voicingGrid.innerHTML = voicings.length
    ? voicings.map((voicing, index) => svgForVoicing(voicing, state.root, state.type, index)).join("")
    : `<div class="empty-state">No compact voicing was found for this selection.</div>`;
}

rootButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-root]");
  if (!button) return;
  state.root = roots.find((root) => root.value === Number(button.dataset.root));
  render();
});

typeButtons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-type]");
  if (!button) return;
  state.type = chordTypes.find((type) => type.label === button.dataset.type);
  render();
});

labelModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.labelMode = button.dataset.labelMode;
    render();
  });
});

leftHanded.addEventListener("change", () => {
  state.leftHanded = leftHanded.checked;
  render();
});

render();
