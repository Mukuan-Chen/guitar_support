# Guitar Support - Chord Finder & Scale Finder

Guitar Support 是一個靜態網頁工具，用來查詢吉他和弦、音階、組成音、公式，以及對應的吉他指板圖。

目前網站包含兩個主要功能：

- Chords：查詢和弦與多個吉他指法。
- Scales：查詢音階的 vertical 指形，並顯示基本 tab 譜。

## 功能

### Chords

- 支援 12 個根音：
  C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B
- 支援 50 種和弦類型，包含 Major、Minor、7、maj7、m7、sus、add9、extended chords、altered chords 等
- 內建 600 個 root/chord 組合
- 內建 2867 個吉他和弦指法
- 可切換指法標籤顯示：
  - Fingers
  - Notes
- 支援 left-handed 顯示模式

### Scales

- 支援 24 種 common guitar scales
- 每個 root / scale 組合提供 12 個 vertical 指形
- 可用右上角 shape 選單切換指形序號
- 一次只顯示一個 scale 指形，方便練習
- 若指形包含 open string，0 fret 會顯示在指板左側格線外
- 下方附基本 tab 譜

## 專案結構

```text
guitar-support/
  index.html
  styles.css
  app.js
  chord-shapes.js
  scale-shapes.js
  README.md
  assets/
    guitar-support-logo.png
```

## 檔案說明

`index.html`

網頁主結構，包含 Chords / Scales 切換、root note 選擇區、chord / scale 選擇區、結果區、指法圖與 tab 區。

`styles.css`

控制整個網站的視覺設計、排版、響應式版面、chord 選擇區捲動、scale 指板與 tab 樣式。

`app.js`

網站主要互動邏輯。負責 Chords / Scales 切換、root note、chord type、scale type、shape number、notes、formula、指法圖與 tab 顯示。

`chord-shapes.js`

和弦指法資料。包含 12 個根音、50 種 chord type，共 600 個組合與 2867 個指法。

`scale-shapes.js`

音階資料。包含 24 種 scale type 與 12 個 vertical 指形區塊。其他根音會由程式依照 interval 即時計算。

`assets/guitar-support-logo.png`

網站 Logo 圖片。

## 如何在電腦打開

這是一個靜態網站，不需要安裝套件。

最簡單的方式是直接打開：

```text
index.html
```

也可以用本機伺服器開啟。進入專案資料夾後執行：

```powershell
python -m http.server 4173
```

然後在瀏覽器打開：

```text
http://127.0.0.1:4173/
```

## 如何更新到 GitHub

如果你使用 GitHub Desktop，日常流程是：

1. 打開 GitHub Desktop
2. 確認左上角目前的 repository 是 `guitar-support`
3. 修改網站檔案
4. 回到 GitHub Desktop 的 `Changes`
5. 在 `Summary` 輸入這次修改的說明
6. 按 `Commit to main`
7. 按 `Push origin`

如果你使用終端機，日常流程是：

```powershell
git status
git add .
git commit -m "Describe your update"
git push
```

簡單理解：

```text
git add      = 選擇這次要存的修改
git commit   = 在電腦本機存成一個版本
git push     = 上傳到 GitHub
git pull     = 從 GitHub 下載最新版
```

## GitHub Pages 部署

如果要讓網站可以用網址公開瀏覽，可以使用 GitHub Pages：

1. 進入 GitHub repository
2. 打開 `Settings`
3. 找到 `Pages`
4. Source 選擇 `Deploy from a branch`
5. Branch 選擇 `main`
6. Folder 選擇 `/root`
7. 儲存後等待 GitHub 產生網址

網址通常會像這樣：

```text
https://your-user-name.github.io/your-repo-name/
```

## 目前狀態

- Chords 頁面已可使用
- Scales 頁面已可使用
- Tools 目前是預留導覽項目，尚未實作

## 未來可加入的功能

- Arpeggio Finder
- 不同調弦，例如 Drop D、DADGAD
- 收藏常用和弦或音階
- 匯出和弦圖 / 音階圖
- 播放和弦或音階音效
