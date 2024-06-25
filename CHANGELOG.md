# Change Log

## 日本語(Japanese)

[English is here](#english英語)

### [1.1.0] - 2024-06-25

#### 追加
- 折り返しを有効にするときの値を`on`, `wordWrapColumn`, `bounded`から選択できるようにした。
- 日本語のコマンドタイトルを追加。

#### 修正
- 表示言語がja/en以外の時にエラーになってしまっていた不具合を修正。
- `editor.wordWrap`を意図せず常にワークスペース設定で書き込んでいた不具合を修正 → 書き込み先を設定できるよう変更（ディフォルトはグローバル設定）。

### [1.0.0] - 2024-06-23

- 初回リリース



-----



## English(英語)

[日本語(Japanese)はこちら](#日本語japanese)

### [1.1.0] - 2024-06-25

#### Added
- Added the ability to choose the value for enabling word wrap from `on`, `wordWrapColumn`, and `bounded`.
- Added the Japanese command title.

#### Fixed
- Fixed an issue where an error occurred when the display language was set to anything other than ja/en.
- Fixed an issue where `editor.wordWrap` was unintentionally always being written to workspace settings → Changed to allow setting the update target (default is the global setting).

### [1.0.0] - 2024-06-23

- Initial release
<!--
Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.
-->
