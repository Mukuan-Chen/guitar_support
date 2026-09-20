(function () {
  'use strict';
  const engine=window.CAGED_ENGINE, lang=window.GUITAR_I18N;
  const say=(en,zh)=>lang.pair(en,zh);
  const panel=document.getElementById('cagedTool');
  const menu=document.getElementById('toolsMenu'), toggle=document.getElementById('toolsToggle');
  const defaults={scales:{root:0,type:'major',shape:'C',labels:'notes',octave:false},arpeggios:{root:0,type:'maj7',shape:'C',labels:'notes',octave:false}};
  let saved={};try{saved=JSON.parse(lang.read('guitar-support-caged-v1','{}'));}catch(_){ /* use defaults */ }
  if(!saved || typeof saved!=='object')saved={};
  const state={};
  for(const key of ['scales','arpeggios']){
    const value=saved[key] || {}, types=engine[key];
    state[key]={...defaults[key],
      root:Number.isInteger(value.root)&&value.root>=0&&value.root<12?value.root:0,
      type:types.some(t=>t.id===value.type)?value.type:defaults[key].type,
      shape:engine.letters.includes(value.shape)?value.shape:'C',
      labels:value.labels==='intervals'?'intervals':'notes',octave:value.octave===true};
  }
  let activeSection=saved.activeSection==='arpeggios'?'arpeggios':'scales';
  const save=()=>lang.save('guitar-support-caged-v1',JSON.stringify({activeSection,scales:state.scales,arpeggios:state.arpeggios}));
  const displayInterval=s=>s.replace(/b/g,'♭').replace(/#/g,'♯');
  const rootMenuNames=['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];
  const rootName=value=>engine.rootNames[value].replace('b','♭');
  const typeName=type=>lang.t(type.label);
  const titleFor=(key,s,type)=>key==='scales'?`${rootName(s.root)} ${typeName(type)}`:`${rootName(s.root)}${type.label}`;
  const selected=(a,b)=>a===b?' selected':'';
  const current=(a,b)=>a===b?' active':'';
  function sources(type){return `https://jenslarsen.nl/${type.id}-arpeggios-caged/`;}
  function readGuide(){
    return `<details class="learn-panel" id="cagedIntroduction">
      <summary><span>${say('How Jens Larsen uses position systems','Jens Larsen 的 CAGED 練習準則')}</span><span class="summary-hint">${say('A concise guide','精簡導讀')}</span></summary>
      <div class="learn-content">
        <div class="guide-columns">
          <article><span class="step-no">01</span><h3>${say('Use the shape as a map','把指形當成地圖')}</h3><p>${say('CAGED divides the neck into five overlapping chord-root families. C, A, G, E and D name the layout, not the key. Gold dots are the selected root; changing the root transposes the same relationship.','CAGED 將指板整理成五個互相重疊的和弦根音區域。C、A、G、E、D 是形狀名稱，不是調名；金色圓點是目前根音，換根音就是把同一組關係移調。')}</p></article>
          <article><span class="step-no">02</span><h3>${say('Learn one area in context','先把一個區域學完整')}</h3><p>${say('Larsen recommends starting with one position: know the note names, then see thirds, triads and seventh-chord arpeggios inside the scale. This connects the diagram to harmony instead of treating every pattern as a separate object.','Larsen 建議先熟悉一個把位：認得音名，再從音階中看見三度、三和弦與七和弦琶音。這樣指形會連到和聲，不會變成一張張互不相關的圖。')}</p></article>
          <article><span class="step-no">03</span><h3>${say('Make music before adding shapes','先造句，再擴張把位')}</h3><p>${say('Begin with a one-octave arpeggio. Play it up and down, start on the 3rd, change the rhythm and leave space. Then aim for a nearby tone in the next chord and gradually connect adjacent positions.','先用單八度琶音練上行、下行、從三度起音、改變節奏並留下空間；接著把旋律導向下一個和弦的鄰近音，最後再逐步連接相鄰把位。')}</p></article>
        </div>
        <div class="guide-note"><strong>${say('The system is only a map','系統只是指板地圖')}</strong><p>${say('CAGED, 3-notes-per-string and the Berklee positions divide the same fretboard and the same notes; they only draw the boundaries and name the areas differently. Changing systems does not change the scale tones, chord tones or where they sit on the neck—it changes only how you group and remember them. That is why the system name is not the goal. The transferable skill is to see chord tones inside a scale, know whether a note is the root, 3rd, 5th or 7th, and use those tones to connect chords and build phrases. This guide uses CAGED because five overlapping areas are easy to visualize. Minor-shape names follow the selected minor tonic instead of borrowing the relative major’s letters.','CAGED、每弦三音與 Berklee 把位整理的都是同一塊指板、同一組音，只是劃分區域與命名的方式不同。換一套系統，不會改變音階音、和弦音或它們在指板上的位置，只會改變你如何分組與記憶。因此，系統名稱本身不是學習目標；真正能帶進演奏的能力，是在音階中看見和弦音，知道目前彈的是根音、三度、五度或七度，再用這些音連接和弦、組成樂句。本站採用 CAGED，是因為五個相連區域容易視覺化；小調 Shape 則依小調主音命名，不借用關係大調的字母。')}</p><div class="guide-links"><a href="https://jenslarsen.nl/scale-positions-for-guitar/" target="_blank" rel="noopener noreferrer">${say('Compare position systems ↗','把位系統比較 ↗')}</a><a href="https://jenslarsen.nl/arpeggios-things-to-get-right-from-the-beginning/" target="_blank" rel="noopener noreferrer">${say('Practice arpeggios in context ↗','琶音如何放回音階與旋律 ↗')}</a></div></div>
      </div>
    </details>`;
  }
  function block(key,index){
    const s=state[key], type=engine[key].find(t=>t.id===s.type), isScale=key==='scales';
    const shape=engine.makeShape(s.root,type,s.shape), title=titleFor(key,s,type);
    shape.title=title;
    const renderedShape={...shape,strings:shape.strings.map(str=>({...str,notes:str.notes.map(n=>({...n,note:s.labels==='intervals'?displayInterval(n.degree):n.note}))}))};
    let diagram=svgForScaleShape(renderedShape,{value:s.root},type);
    const range=shape.startFret===0?say(`Open strings · frets 1–${shape.endFret}`,`空弦・第 1–${shape.endFret} 品`):say(`Frets ${shape.startFret}–${shape.endFret}`,`第 ${shape.startFret}–${shape.endFret} 品`);
    const spelled=type.intervals.map(i=>engine.spell(s.root,i));
    return `<section class="caged-block" id="caged-${key}" tabindex="-1" aria-labelledby="${key}-title">
      <div class="section-heading"><div><p class="eyebrow">${index} / ${isScale?'SCALES':'ARPEGGIOS'}</p><h2 id="${key}-title">${isScale?say('Scales','音階'):say('Chord arpeggios','和弦琶音')}</h2></div><p>${isScale?say('Four scales. Five ways to see the neck.','四種音階，五種指板視角。'):say('Nine chord colors, one connected fretboard.','九種和弦色彩，在指板上串連。')}</p></div>
      <div class="caged-controls">
        <label for="${key}-root"><span>${say('Root note','根音')}</span><select id="${key}-root" data-block="${key}" data-field="root">${rootMenuNames.map((r,i)=>`<option value="${i}"${selected(s.root,i)}>${r}</option>`).join('')}</select></label>
        <label for="${key}-type"><span>${isScale?say('Scale type','音階類型'):say('Chord type','和弦類型')}</span><select id="${key}-type" data-block="${key}" data-field="type">${engine[key].map(t=>`<option value="${t.id}"${selected(s.type,t.id)}>${typeName(t)}</option>`).join('')}</select></label>
      </div>
      <div class="scale-shape-card caged-shape-card">
        <div class="scale-shape-head caged-shape-head"><div><p class="eyebrow">${say('Vertical shape','把位指形')}</p><h3 class="caged-result" id="${key}-result">${title}</h3><p>${range}</p></div>
          <div class="caged-shape-picker"><span class="control-caption">${say('CAGED shape','CAGED 指形')}</span><div class="shape-buttons" role="group" aria-label="${isScale?say('Scale shape','音階指形'):say('Arpeggio shape','琶音指形')}">${engine.letters.map(l=>`<button id="${key}-shape-${l}" class="${current(s.shape,l)}" type="button" data-block="${key}" data-shape="${l}" aria-pressed="${s.shape===l}" aria-label="${l} ${say('shape','型')}">${l}</button>`).join('')}</div></div>
        </div>
        <dl class="caged-formula"><div><dt>${say('Notes','音名')}</dt><dd>${spelled.join(' · ')}</dd></div><div><dt>${say('Intervals','音程')}</dt><dd>${type.intervals.map(displayInterval).join(' · ')}</dd></div></dl>
        <div class="diagram-toolbar"><div class="segmented" role="group" aria-label="${say('Diagram labels','圖譜標示')}">${['notes','intervals'].map(mode=>`<button id="${key}-labels-${mode}" class="${current(s.labels,mode)}" type="button" data-block="${key}" data-labels="${mode}" aria-pressed="${s.labels===mode}">${mode==='notes'?say('Notes','音名'):say('Intervals','音程')}</button>`).join('')}</div><span class="root-legend"><i aria-hidden="true"></i>${say('Root note','根音')}</span></div>
        <div class="scale-layout"><div class="caged-diagram-scroll" tabindex="0" role="region" aria-label="${title} ${s.shape} ${say('shape diagram','指形圖')}"><svg class="scale-diagram" viewBox="0 0 760 310" role="img" aria-label="${title} · ${s.shape} ${say('shape','型')} · ${range}">${diagram}</svg></div>
          <div class="scale-tab"><div class="tab-heading"><div><p class="group-title">TAB</p><p class="tab-explanation">${s.octave?say('From the root, one octave up and back.','從根音出發，單八度上行再下行。'):say('Lowest to highest, then back. The first note may not be the root.','由最低音上行至最高音，再下行；起音不一定是根音。')}</p></div><label class="compact-select" for="${key}-octave"><span>${say('Practice range','練習範圍')}</span><select id="${key}-octave" data-block="${key}" data-field="octave"><option value="full"${selected(s.octave,false)}>${say('Full shape','完整指形')}</option><option value="octave"${selected(s.octave,true)}>${say('One octave','單八度')}</option></select></label></div><pre tabindex="0" aria-label="${title} ${say('tablature','六線譜')}">${engine.tabText(shape,s.octave)}</pre></div>
        </div>
        <details class="shape-help" id="${key}-help"><summary>${say('How to read this shape','這個指形怎麼看？')}</summary><div><p>${say('The top line is the thin high E string (1); the bottom line is the thick low E string (6). Numbers above the grid are frets. A note to the left of the nut is an open string. TAB numbers are frets, not finger numbers.','圖的最上方是最細的第 1 弦，最下方是最粗的第 6 弦。格線上方是品位，琴枕左方的音是空弦。TAB 數字代表品位，不是手指編號。')}</p><p>${isScale?say('Read the intervals relative to the selected root. Natural minor uses ♭3, ♭6 and ♭7. Major pentatonic omits 4 and 7; minor pentatonic omits 2 and ♭6 from natural minor.','音程皆相對於目前根音。自然小調包含 ♭3、♭6、♭7；大調五聲省略大調的 4、7，小調五聲省略自然小調的 2、♭6。'):say('Play the chord tones one at a time. A flat lowers a degree by one semitone and a sharp raises it by one. In dim7, ♭♭7 is a diminished seventh: for Cdim7, B♭♭ sounds the same as A.','將和弦音逐一彈奏。降記號讓該音程降低半音，升記號則升高半音。dim7 的 ♭♭7 是減七度；例如 Cdim7 的 B♭♭ 與 A 同音。')}</p></div></details>
        ${!isScale?`<p class="source-link"><a href="${sources(type)}" target="_blank" rel="noopener noreferrer">${say('Explore Jens Larsen’s reference chart ↗','查看 Jens Larsen 的參考指形 ↗')}</a>${type.id==='dim'?`<span>${say('Some dim7 fingerings are adapted to keep the CAGED root families consistent.','部分 dim7 指法經調整，以維持本站 CAGED 根音家族的一致性。')}</span>`:''}</p>`:''}
      </div>
    </section>`;
  }
  function render(){
    const open=[...panel.querySelectorAll('details[open]')].map(d=>d.id);
    const active=document.activeElement;
    const focus=panel.contains(active)?active.id:null;
    panel.innerHTML=`<div class="intro-panel caged-intro"><div><h1 id="caged-title">CAGED System<span class="title-dot">.</span></h1><p class="intro-copy">${say('Explore the fretboard through five connected shapes and write your own music.','用五種相連的指形認識指板，譜寫自己的音樂')}</p></div></div>
      <div class="caged-jump" role="group" aria-label="${say('Choose content','選擇內容')}"><button id="caged-tab-scales" class="${current(activeSection,'scales')}" type="button" data-caged-section="scales" aria-pressed="${activeSection==='scales'}">01 ${say('Scales','音階')}</button><button id="caged-tab-arpeggios" class="${current(activeSection,'arpeggios')}" type="button" data-caged-section="arpeggios" aria-pressed="${activeSection==='arpeggios'}">02 ${say('Arpeggios','和弦琶音')}</button></div>
      ${readGuide()}${block(activeSection,activeSection==='scales'?'01':'02')}
      <footer class="caged-footer"><p>${say('Keep exploring','延伸閱讀')}</p><a href="https://jenslarsen.nl/arpeggios-things-to-get-right-from-the-beginning/" target="_blank" rel="noopener noreferrer">${say('Jens Larsen · Getting started with arpeggios ↗','Jens Larsen・琶音入門觀念 ↗')}</a><a href="https://jenslarsen.nl/pdf-downloads-charts/" target="_blank" rel="noopener noreferrer">${say('Scales & arpeggio reference charts ↗','音階與琶音參考圖表 ↗')}</a><p class="footer-note">${say('Lessons written for Guitar Support, with further reading from Jens Larsen. Standard tuning: E A D G B E.','本站教學由 Guitar Support 編寫，並提供 Jens Larsen 的延伸閱讀。使用標準調弦：E A D G B E。')}</p></footer>`;
    open.forEach(id=>{const el=document.getElementById(id);if(el)el.open=true;});
    if(focus)document.getElementById(focus)?.focus({preventScroll:true});
    document.getElementById('toolsDescription').textContent=say('Scale & arpeggio shapes','音階與和弦琶音指形');
    save();
  }
  const menuLink=menu.querySelector('a');
  function setMenu(open,returnFocus=false){
    menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));
    toggle.setAttribute('aria-expanded',String(open));menuLink.tabIndex=open?0:-1;
    document.querySelector('.site-header').classList.toggle('tools-open',open);
    if(returnFocus)toggle.focus();
  }
  function closeMenu(returnFocus=false){setMenu(false,returnFocus);}
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  toggle.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();setMenu(true);menuLink.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.tools-menu'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
  document.querySelector('.tools-menu').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget))closeMenu();});
  document.addEventListener('viewchange',()=>{closeMenu();toggle.classList.toggle('active',!panel.hidden);});
  panel.addEventListener('change',e=>{
    const target=e.target;
    const key=target.dataset.block, field=target.dataset.field;
    if(!key||!field)return;
    state[key][field]=field==='root'?Number(target.value):field==='octave'?target.value==='octave':target.value;
    render();
  });
  panel.addEventListener('click',e=>{
    const sectionButton=e.target.closest('[data-caged-section]');
    if(sectionButton){activeSection=sectionButton.dataset.cagedSection;render();return;}
    const button=e.target.closest('[data-block]');if(!button)return;
    if(button.dataset.shape){state[button.dataset.block].shape=button.dataset.shape;render();}
    if(button.dataset.labels){state[button.dataset.block].labels=button.dataset.labels;render();}
  });
  document.addEventListener('languagechange',render);
  render();toggle.classList.toggle('active',!panel.hidden);
})();
