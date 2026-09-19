(function () {
  'use strict';
  const translations = {
    'Root note':'根音', 'Chord':'和弦類型', 'Scale':'音階類型',
    'Selected chord':'目前和弦', 'Selected scale':'目前音階',
    'Notes':'音名', 'Formula':'音程公式', 'Intervals':'音程',
    'Fingers':'指法', 'Left-handed':'左手模式', 'Vertical shape':'把位指形',
    'Shape':'指形', 'Tab':'TAB 六線譜', 'Open':'空弦', 'open':'空弦',
    'Open / low position':'空弦／低把位', 'Frets':'品位',
    'No shape':'沒有指形', 'No vertical shape was found.':'找不到對應指形。',
    'No compact voicing was found for this selection.':'目前選擇沒有適合的緊湊指法。',
    'Major':'maj', 'Minor':'min',
    'Major Scale':'大調音階', 'Natural Minor Scale':'自然小調音階',
    'Major Pentatonic':'大調五聲音階', 'Minor Pentatonic':'小調五聲音階',
    'Harmonic Minor':'和聲小調', 'Melodic Minor':'旋律小調',
    'Natural Minor':'自然小調', 'Pentatonic Major':'大調五聲',
    'Pentatonic Minor':'小調五聲', 'Pentatonic Blues':'藍調五聲',
    'Pentatonic Neutral':'中性五聲', 'Ionian':'伊奧尼安', 'Dorian':'多利安',
    'Phrygian':'弗里吉安', 'Lydian':'利底安', 'Mixolydian':'混合利底安',
    'Aeolian':'艾奧利安', 'Locrian':'洛克里安', 'Diatonic':'自然音階',
    'Diminished':'減音階', 'Diminished, Half':'半音起始減音階',
    'Diminished, Whole':'全音起始減音階', 'Diminished Whole Tone':'減全音音階',
    'Dominant 7th':'屬七音階', 'Lydian Augmented':'利底安增音階',
    'Lydian Minor':'利底安小調', 'Lydian Diminished':'利底安減音階',
    'Primary':'主要導覽', 'Chord controls':'和弦設定', 'Scale controls':'音階設定',
    'Voicing display options':'和弦指法顯示設定', 'Label mode':'標示方式',
    'Chord voicings':'和弦指法', 'Scale vertical shape':'音階把位指形',
    'Choose scale shape':'選擇音階指形', 'Scale shape diagram':'音階指板圖',
    'Scale tab':'音階六線譜', 'Guitar Support chord finder':'Guitar Support 和弦查詢'
  };
  const scaleTranslations = {
    'Major':'大調音階',
    'Harmonic Minor':'和聲小調音階',
    'Melodic Minor':'旋律小調音階',
    'Natural Minor':'自然小調音階',
    'Pentatonic Major':'大調五聲音階',
    'Pentatonic Minor':'小調五聲音階',
    'Pentatonic Blues':'藍調音階',
    'Pentatonic Neutral':'中性五聲音階',
    'Ionian':'愛奧尼安調式',
    'Dorian':'多里安調式',
    'Phrygian':'弗利吉安調式',
    'Lydian':'利地安調式',
    'Mixolydian':'米索利地安調式',
    'Aeolian':'伊奧利安調式',
    'Locrian':'洛克里安調式',
    'Diatonic':'自然音階',
    'Diminished':'減音階',
    'Diminished, Half':'半全減音階',
    'Diminished, Whole':'全半減音階',
    'Diminished Whole Tone':'減全音音階',
    'Dominant 7th':'屬七音階',
    'Lydian Augmented':'增利地安音階',
    'Lydian Minor':'小利地安音階',
    'Lydian Diminished':'減利地安音階'
  };
  function read(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* file:// or privacy mode */ } }
  let language = read('guitar-support-language','zh');
  if (!['zh','en'].includes(language)) language='zh';
  const api = {
    get language() { return language; },
    t(text) { return language==='zh' ? (translations[text] || text) : text; },
    pair(en,zh) { return language==='zh' ? zh : en; },
    type(label,scale=false) {
      if(language!=='zh')return label;
      return scale ? (scaleTranslations[label] || label) : (translations[label] || label);
    },
    read, save,
    apply() {
      document.documentElement.lang=language==='zh'?'zh-Hant':'en';
      document.title=api.pair('Guitar Support · Chords, Scales & CAGED','Guitar Support · 和弦、音階與 CAGED');
      document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=api.t(el.dataset.i18n);});
      document.querySelectorAll('[data-i18n-label]').forEach(el=>{el.setAttribute('aria-label',api.t(el.dataset.i18nLabel));});
      document.querySelectorAll('[data-language]').forEach(el=>{
        const active=el.dataset.language===language;
        el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));
      });
    },
    set(value) {
      if(!['zh','en'].includes(value))return;
      language=value;save('guitar-support-language',language);api.apply();
      document.dispatchEvent(new Event('languagechange'));
    }
  };
  window.GUITAR_I18N=api;
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>api.set(button.dataset.language)));
  api.apply();
})();
