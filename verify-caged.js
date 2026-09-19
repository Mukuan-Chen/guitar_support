const assert=require('node:assert/strict');
const engine=require('./caged-engine.js');
const patterns=require('./caged-patterns.js');
const tuning=[40,45,50,55,59,64];
const mod=n=>((n%12)+12)%12;
const pitch={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const value=name=>mod(pitch[name[0]]+[...name.slice(1)].reduce((n,c)=>n+(c==='♯'?1:c==='♭'?-1:0),0));
let checked=0, events=0;
assert.equal(engine.scales.length,4);assert.equal(engine.arpeggios.length,9);
for(const type of engine.arpeggios)for(const letter of engine.letters){
  for(const [i,row] of patterns[type.id][letter].entries())for(const fret of row){
    assert(type.steps.includes(mod(tuning[i]+fret)),`Invalid reference tone: ${type.id}/${letter}/${i}/${fret}`);
  }
}
for(let root=0;root<12;root++)for(const type of [...engine.scales,...engine.arpeggios]){
  const signatures=[];
  for(const letter of engine.letters){
    const context=`${root}/${type.id}/${letter}`, shape=engine.makeShape(root,type,letter);
    assert.equal(shape.strings.length,6,context);
    const notes=shape.strings.flatMap(s=>s.notes);
    assert(notes.length>0,context);
    assert(notes.every(n=>Number.isInteger(n.fret)&&n.fret>=0&&n.fret<=24),context);
    assert(shape.endFret-shape.startFret<=6,`${context}: excessive stretch`);
    for(const s of shape.strings){
      assert(s.notes.length>0,`${context}: empty string`);
      for(const n of s.notes){
        const actual=mod(tuning[s.stringIndex]+n.fret);
        assert.equal(n.noteValue,actual,context);
        assert.equal(value(n.note),actual,`${context}: misspelled ${n.note}`);
        assert.equal(n.root,actual===root,context);
        assert(type.steps.includes(mod(actual-root)),`${context}: non-chord/scale tone`);
      }
    }
    for(const step of type.steps)assert(notes.some(n=>n.interval===step),`${context}: missing degree ${step}`);
    signatures.push(JSON.stringify(shape.strings.map(s=>s.notes.map(n=>n.fret))));
    for(const octave of [false,true]){
      const tab=engine.tabEvents(shape,octave), mid=(tab.length-1)/2;
      assert(Number.isInteger(mid),context);
      for(const [i,n]of tab.entries()){
        assert(shape.strings[n.stringIndex].notes.some(x=>x.fret===n.fret),`${context}: TAB outside diagram`);
        if(i>0 && i<=mid)assert(n.midi>tab[i-1].midi,`${context}: not ascending`);
        if(i>mid)assert(n.midi<tab[i-1].midi,`${context}: not descending`);
        assert.equal(n.midi,tab[tab.length-1-i].midi,`${context}: incomplete return`);
      }
      if(octave){
        assert.equal(mod(tab[0].midi),root,`${context}: octave must begin on root`);
        assert.equal(tab[mid].midi-tab[0].midi,12,`${context}: incomplete octave`);
        assert.equal(mid,type.steps.length,`${context}: missing note inside octave`);
      }else{
        assert.equal(tab[0].midi,Math.min(...notes.map(n=>n.midi)),context);
        assert.equal(tab[mid].midi,Math.max(...notes.map(n=>n.midi)),context);
      }
      const rendered=engine.tabText(shape,octave);
      assert(!rendered.includes('\n\n'),`${context}: TAB must remain one horizontally scrollable staff`);
      const rows=rendered.split('\n');assert.equal(rows.length,6,context);
      assert(rows.every(r=>r.length===rows[0].length),`${context}: misaligned TAB`);
      events+=tab.length;
    }
    checked++;
  }
  assert.equal(new Set(signatures).size,5,`${root}/${type.id}: repeated shape`);
}
assert.deepEqual(engine.makeShape(0,engine.scales[3],'E').strings.map(s=>s.notes.map(n=>n.fret)),[[8,11],[8,10],[8,10],[8,10],[8,11],[8,11]],'Canonical C minor pentatonic E-family box');
assert.deepEqual(engine.arpeggios.find(t=>t.id==='dim').intervals.map(i=>engine.spell(0,i)),['C','E♭','G♭','B♭♭']);
const scale=engine.makeShape(0,engine.scales[0],'E');
const arp=engine.makeShape(0,engine.arpeggios[0],'E');
arp.strings.forEach((s,i)=>s.notes.forEach(n=>assert(scale.strings[i].notes.some(x=>x.fret===n.fret),'Guided comparison must share coordinates')));
console.log(`Verified ${checked} CAGED shapes, ${events} TAB events, note spelling, one-octave routes, root markers and scale/arpeggio alignment.`);
