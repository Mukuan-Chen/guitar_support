# Guitar Support - Chord Finder

Guitar Support 是一個靜態網頁工具，用來查詢吉他和弦、組成音、公式，以及對應的吉他指法圖。

這個專案目前專注在 Chord Finder。使用者可以選擇根音和和弦種類，頁面會顯示該和弦的 notes、formula，以及多個可用的 guitar voicing。

## 功能

- 支援 12 個根音：
  C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B
- 支援 50 種和弦類型，包含 Major、Minor、7、maj7、m7、sus、add9、extended chords、altered chords 等
- 內建 600 個 root/chord 組合
- 內建 2867 個吉他指法圖
- 顯示 selected chord、notes、formula
- 可切換指法標籤顯示：
  - Fingers
  - Notes
- 支援 left-handed 顯示模式
- Chord 選擇區可上下滑動，避免新增和弦後版面被撐開

## 專案結構

```text
guitar-support/
  index.html
  styles.css
  app.js
  chord-shapes.js
  README.md
  assets/
    guitar-support-logo.png
```

## 檔案說明

`index.html`

網頁主結構，包含 header、root note 選擇區、chord 選擇區、結果區與指法圖區。

`styles.css`

控制整個網站的視覺設計、排版、響應式版面，以及 chord 選擇區的捲動樣式。

`app.js`

網站主要互動邏輯。負責 root note、chord type、notes、formula、指法圖顯示，以及 left-handed / label mode 切換。

`chord-shapes.js`

和弦指法資料。裡面包含 12 個根音、50 種 chord type，共 600 個組合與 2867 個指法。

`assets/guitar-support-logo.png`

網站 Logo 圖片。
