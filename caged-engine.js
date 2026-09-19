(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./caged-patterns.js') : root.CAGED_PATTERNS);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CAGED_ENGINE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (patterns) {
  'use strict';
  const letters = ['C', 'A', 'G', 'E', 'D'];
  const midi = [40, 45, 50, 55, 59, 64];
  const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
  const mod = n => ((n % 12) + 12) % 12;
  const scales = [
    {id:'major', label:'Major Scale', intervals:['1','2','3','4','5','6','7'], steps:[0,2,4,5,7,9,11]},
    {id:'minor', label:'Natural Minor Scale', intervals:['1','2','b3','4','5','b6','b7'], steps:[0,2,3,5,7,8,10]},
    {id:'major-pent', label:'Major Pentatonic', intervals:['1','2','3','5','6'], steps:[0,2,4,7,9]},
    {id:'minor-pent', label:'Minor Pentatonic', intervals:['1','b3','4','5','b7'], steps:[0,3,5,7,10]}
  ];
  const arpeggios = [
    {id:'maj7', label:'maj7', intervals:['1','3','5','7'], steps:[0,4,7,11]},
    {id:'min7', label:'m7', intervals:['1','b3','5','b7'], steps:[0,3,7,10]},
    {id:'dom7', label:'7', intervals:['1','3','5','b7'], steps:[0,4,7,10]},
    {id:'min7b5', label:'m7(b5)', intervals:['1','b3','b5','b7'], steps:[0,3,6,10]},
    {id:'maj75', label:'maj7(#5)', intervals:['1','3','#5','7'], steps:[0,4,8,11]},
    {id:'minmaj7', label:'m(maj7)', intervals:['1','b3','5','7'], steps:[0,3,7,11]},
    {id:'dim', label:'dim7', intervals:['1','b3','b5','bb7'], steps:[0,3,6,9]},
    {id:'maj7b5', label:'maj7(b5)', intervals:['1','3','b5','7'], steps:[0,4,6,11]},
    {id:'dom7b5', label:'7(b5)', intervals:['1','3','b5','b7'], steps:[0,4,6,10]}
  ];
  // Five overlapping C-major positions. Each list contains actual scale tones,
  // not a rectangular fret window. Pentatonics are subsets of these positions.
  const major = {
    C:[[0,1,3],[0,2,3],[0,2,3],[0,2],[0,1,3],[0,1,3]],
    A:[[3,5],[2,3,5],[2,3,5],[2,4,5],[3,5,6],[3,5]],
    G:[[5,7,8],[5,7,8],[5,7],[4,5,7],[5,6,8],[5,7,8]],
    E:[[7,8,10],[7,8,10],[7,9,10],[7,9,10],[8,10],[7,8,10]],
    D:[[10,12,13],[10,12],[9,10,12],[9,10,12],[10,12,13],[10,12,13]]
  };
  // Minor labels refer to the same tonic's root/chord family, not the relative
  // major's letters: Cm E-family is Eb major G-family, for example.
  const minorFamily = {C:'D', A:'C', G:'A', E:'G', D:'E'};
  const natural = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const rootNames = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
  function spell(rootValue, interval) {
    const rootName = rootNames[rootValue];
    const degree = Number(interval.replace(/[^0-9]/g,''));
    const order = 'CDEFGAB';
    const letter = order[(order.indexOf(rootName[0]) + degree - 1) % 7];
    const base = [0,2,4,5,7,9,11][(degree-1)%7];
    const alteration = [...interval].reduce((n,c)=>n+(c==='b'?-1:c==='#'?1:0),0);
    let delta = mod(rootValue + base + alteration - natural[letter]);
    if(delta>6) delta-=12;
    return letter + (delta<0?'♭'.repeat(-delta):'♯'.repeat(delta));
  }
  function makeShape(rootValue, type, letter) {
    if(!letters.includes(letter)) throw new Error('Unknown CAGED family');
    const arp = arpeggios.includes(type);
    const minor = type.id.startsWith('minor');
    let raw = arp ? patterns[type.id][letter] : major[minor ? minorFamily[letter] : letter];
    let offset = rootValue + (!arp && minor ? 3 : 0);
    let frets = raw.map((row,i)=>row.map(f=>f+offset).filter(f=>type.steps.includes(mod(midi[i]+f-rootValue))));
    // Shift the entire shape by octaves only; never wrap individual notes.
    const octave = Math.floor(Math.min(...frets.flat())/12)*12;
    frets = frets.map(row=>row.map(f=>f-octave));
    const values = frets.flat();
    return {
      number:letter, letter, startFret:Math.min(...values), endFret:Math.max(...values),
      strings:frets.map((row,i)=>{
        const notes=row.map(fret=>{
          const interval=mod(midi[i]+fret-rootValue);
          const degree=type.intervals[type.steps.indexOf(interval)];
          return {fret, interval, noteValue:mod(midi[i]+fret), root:interval===0, degree, note:spell(rootValue,degree), midi:midi[i]+fret};
        });
        return {stringIndex:i,name:`${6-i}:${strings[i]}`,label:strings[i],notes,frets:notes};
      })
    };
  }
  function ascending(shape) {
    return shape.strings.flatMap((s,i)=>s.notes.map(n=>({...n,stringIndex:i})))
      .sort((a,b)=>a.midi-b.midi || a.stringIndex-b.stringIndex)
      .filter((n,i,all)=>i===0 || n.midi!==all[i-1].midi);
  }
  function tabEvents(shape, oneOctave=false) {
    let up=ascending(shape);
    if(oneOctave) {
      const root=up.find(n=>n.root && up.some(top=>top.midi===n.midi+12));
      if(root) up=up.filter(n=>n.midi>=root.midi && n.midi<=root.midi+12);
    }
    return up.concat(up.slice(0,-1).reverse());
  }
  function tabText(shape, oneOctave=false) {
    const events=tabEvents(shape,oneOctave);
    return [5,4,3,2,1,0].map(i=>`${strings[i]}|${events.map(e=>e.stringIndex===i?String(e.fret).padStart(2,'-')+'-':'---').join('')}|`).join('\n');
  }
  return {letters,scales,arpeggios,rootNames,makeShape,spell,tabEvents,tabText,ascending};
});
