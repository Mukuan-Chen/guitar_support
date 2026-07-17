const fs = require("fs");
const path = require("path");
const vm = require("vm");

const engine = require("./scale-engine.js");
const workspace = __dirname;
const scaleDataContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(workspace, "scale-shapes.js"), "utf8"),
  scaleDataContext,
);

const { types, windows } = scaleDataContext.window.SCALE_DATA;
const sourceOpenNotes = [4, 11, 7, 2, 9, 4]; // high E to low E
const localTuning = [
  { string: "E", note: 4 },
  { string: "A", note: 9 },
  { string: "D", note: 2 },
  { string: "G", note: 7 },
  { string: "B", note: 11 },
  { string: "E", note: 4 },
];
const fretCount = Math.max(...windows.map((windowRange) => windowRange.endFret)) + 1;

function mod(value, base = 12) {
  return ((value % base) + base) % base;
}

function sourceNoteAt(stringNo, fret) {
  return mod(sourceOpenNotes[stringNo] + fret);
}

// Independent transcription of the reference site's setVerticalScale method,
// retaining its original high-E-to-low-E internal string numbering.
function referenceVerticalShape(rootValue, steps, requestedStartFret) {
  const noteValues = steps.map((step) => mod(rootValue + step));
  let startFret = requestedStartFret;
  const span = 4;
  if (startFret >= fretCount - span) startFret = fretCount - span - 1;
  const endFret = startFret + span;
  const sourceStrings = sourceOpenNotes.map(() => []);
  let nextNote = null;

  for (let stringNo = sourceStrings.length - 1; stringNo >= 0; stringNo -= 1) {
    for (let fret = startFret; fret <= endFret; fret += 1) {
      const noteValue = sourceNoteAt(stringNo, fret);
      if (nextNote === null) {
        if (!noteValues.includes(noteValue)) continue;
      } else if (noteValue !== nextNote) {
        continue;
      }

      if (stringNo !== 0) {
        if (sourceNoteAt(stringNo - 1, startFret) === nextNote) continue;
      } else if (fret - startFret >= 5) {
        continue;
      }

      sourceStrings[stringNo].push({
        fret,
        noteValue,
        interval: mod(noteValue - rootValue),
        root: noteValue === mod(rootValue),
      });
      let nextIndex = noteValues.indexOf(noteValue) + 1;
      if (nextIndex >= noteValues.length) nextIndex = 0;
      nextNote = noteValues[nextIndex];
    }
  }

  return sourceStrings;
}

// Independent transcription of the reference site's TablatureData.setScale.
function referenceTabEvents(sourceStrings) {
  const events = [];

  for (let stringNo = sourceStrings.length - 1; stringNo >= 0; stringNo -= 1) {
    for (const item of sourceStrings[stringNo]) {
      if (events.length >= 48) return events;
      events.push({ stringIndex: sourceStrings.length - 1 - stringNo, fret: item.fret });
    }
  }

  let skipTopNote = true;
  for (let stringNo = 0; stringNo < sourceStrings.length; stringNo += 1) {
    for (let index = sourceStrings[stringNo].length - 1; index >= 0; index -= 1) {
      if (events.length >= 48) return events;
      if (skipTopNote) {
        skipTopNote = false;
        continue;
      }
      events.push({ stringIndex: sourceStrings.length - 1 - stringNo, fret: sourceStrings[stringNo][index].fret });
    }
  }

  return events;
}

function comparableStrings(strings) {
  return strings.map((string) => string.map((item) => [
    item.fret,
    item.noteValue,
    item.interval,
    item.root,
  ]));
}

function assertEqual(actual, expected, context) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`${context}\nExpected: ${expectedJson}\nActual:   ${actualJson}`);
  }
}

function extractReferenceScaleTypes(source) {
  const marker = "this.types=[{id:0";
  const assignmentStart = source.indexOf(marker);
  if (assignmentStart < 0) throw new Error("Could not find scale types in app.site.js");
  const start = assignmentStart + "this.types=".length;
  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === "[") depth += 1;
    if (source[index] === "]") {
      depth -= 1;
      if (depth === 0) return Function(`return ${source.slice(start, index + 1)}`)();
    }
  }
  throw new Error("Could not finish parsing scale types in app.site.js");
}

const referenceBundlePath = path.join(workspace, "app.site.js");
if (fs.existsSync(referenceBundlePath)) {
  const referenceTypes = extractReferenceScaleTypes(fs.readFileSync(referenceBundlePath, "utf8"))
    .filter((type) => type.category === 0)
    .map((type) => ({
      label: type.name,
      intervals: type.interval.split(", "),
      steps: type.steps,
    }));
  assertEqual(types, referenceTypes, "Scale names, intervals, or steps differ from the reference bundle");
}

let shapeCount = 0;
let tabEventCount = 0;

for (let rootValue = 0; rootValue < 12; rootValue += 1) {
  for (const type of types) {
    for (const windowRange of windows) {
      const sourceStrings = referenceVerticalShape(rootValue, type.steps, windowRange.startFret);
      const expectedLocalStrings = sourceStrings.slice().reverse();
      const actualShape = engine.createVerticalShape({
        rootValue,
        steps: type.steps,
        tuning: localTuning,
        startFret: windowRange.startFret,
        number: windowRange.number,
        fretCount,
      });
      const context = `${rootValue} ${type.label}, shape ${windowRange.number}`;

      assertEqual(
        comparableStrings(actualShape.strings.map((string) => string.frets)),
        comparableStrings(expectedLocalStrings),
        `Fret positions differ for ${context}`,
      );

      const expectedTab = referenceTabEvents(sourceStrings);
      const actualTab = engine.tabEventsForShape(actualShape);
      assertEqual(actualTab, expectedTab, `Tab order differs for ${context}`);

      shapeCount += 1;
      tabEventCount += actualTab.length;
    }
  }
}

console.log(
  `Verified ${shapeCount.toLocaleString("en-US")} vertical shapes and `
  + `${tabEventCount.toLocaleString("en-US")} tab events across `
  + `${12} roots x ${types.length} scales x ${windows.length} positions.`,
);
