# Guitar Support - Chord Finder

Guitar Support 是一個靜態吉他和弦查找網頁。使用者可以選擇 chord root note 與 chord type，頁面會顯示該和弦的組成音、音程公式，以及多個吉他指板按法。

## 功能

- 選擇 12 個 root note：C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B
- 支援基本和弦類型：
  - Major
  - Minor
  - 7
  - 5
  - dim
  - dim7
  - aug
  - sus2
  - sus4
  - maj7
  - m7
  - 7sus4
- 顯示和弦組成音與音程公式
- 顯示多個 variation 的吉他指板圖
- 可切換顯示手指編號或音名
- 支援 left-handed 顯示模式
- 響應式版面，支援桌機與手機

## 檔案結構

```text
guitar-support/
  index.html
  styles.css
  app.js
  chord-shapes.js
  assets/
    guitar-support-logo.png
```

## 檔案說明

- `index.html`：網站主頁面與基本結構
- `styles.css`：視覺設計、響應式版面與指板圖樣式
- `app.js`：root note、chord type 選擇邏輯與指板圖繪製
- `chord-shapes.js`：和弦按法資料
- `assets/guitar-support-logo.png`：網站 logo 圖片

## 和弦資料

目前的和弦按法資料來自人工整理後的 PDF 參考資料，已整理成 `chord-shapes.js`。

資料共包含：

- 12 個 root note
- 12 種 chord type
- 共 144 組 root/chord 組合

部分和弦會有不同數量的 variation，依照目前資料來源保留，不會強制補滿固定數量。

## 本機預覽

如果電腦有 Python，可以在 `guitar-support` 資料夾中執行：

```bash
python -m http.server 4173
```

然後在瀏覽器打開：

```text
http://127.0.0.1:4173/
```

也可以直接開啟 `index.html`，但用本機伺服器預覽會比較接近 GitHub Pages 上線後的狀態。

## GitHub Pages 部署

1. 建立一個 GitHub repository。
2. 將 `guitar-support` 資料夾中的所有檔案上傳到 repository。
3. 到 GitHub repository 的 Settings。
4. 進入 Pages。
5. Source 選擇 `Deploy from a branch`。
6. Branch 選擇 `main`，資料夾選擇 `/root`。
7. 儲存後等待 GitHub Pages 產生網址。

如果之後要新增子頁面，例如 scales，可以加入：

```text
scales/
  index.html
  scales.js
```

之後網址會類似：

```text
https://your-user-name.github.io/your-repo-name/scales/
```

## 後續可擴充方向

- 新增 scales 查找頁
- 新增 arpeggios 查找頁
- 新增更多 advanced chord types
- 新增 tuning 選擇，例如 Drop D、DADGAD
- 新增播放音效或 MIDI 預聽
- 新增收藏常用和弦功能

