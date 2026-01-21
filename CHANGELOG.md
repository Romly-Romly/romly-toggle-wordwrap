# Change Log

## 日本語(Japanese)

[English version below](#english英語)

### [1.2.0] - 2026/01/22

- 言語固有の設定に書き込むオプション `limitToLanguageScope` を追加。
- 設定の書き込み先オプション `configurationTarget` を整理し、設定が正しく反映されるスコープに自動的に書き込む `auto` モードを実装。
- 設定の組み合わせによって、優先度の低いターゲット/スコープに書き込んでしまい、正しくトグルされない不具合を修正。
- ライセンスをMPL 2.0に変更。

### [1.1.1] - 2024/06/29

#### 修正
- 拡張機能コマンドのカテゴリを設定
- 拡張機能のアイコンの背景が透過されていなかった問題を修正

### [1.1.0] - 2024/06/25

#### 追加
- 折り返しを有効にするときの値を`on`, `wordWrapColumn`, `bounded`から選択できるようにした。
- 日本語のコマンドタイトルを追加。

#### 修正
- 表示言語がja/en以外の時にエラーになってしまっていた不具合を修正。
- `editor.wordWrap`を意図せず常にワークスペース設定で書き込んでいた不具合を修正 → 書き込み先を設定できるよう変更（ディフォルトはグローバル設定）。

### [1.0.0] - 2024/06/23

- 初回リリース










-----










## English(英語)

[日本語版(Japanese version above)はこちら](#日本語japanese)

### [1.2.0] - 2026/01/22

- Added `limitToLanguageScope` option to write settings to language-specific configuration.
- Reorganized the `configurationTarget` option and implemented `auto` mode that automatically writes to the scope where settings are properly applied.
- Fixed a bug where settings were written to a lower-priority target/scope depending on the configuration combination, causing toggle to not work correctly.
- Changed the license to MPL 2.0.

### [1.1.1] - 2024/06/29

#### Fixed

- Set categories for extension commands
- Fixed an issue the background of the extension icon was not transparent

### [1.1.0] - 2024/06/25

#### Added
- Added the ability to choose the value for enabling word wrap from `on`, `wordWrapColumn`, and `bounded`.
- Added the Japanese command title.

#### Fixed
- Fixed an issue where an error occurred when the display language was set to anything other than ja/en.
- Fixed an issue where `editor.wordWrap` was unintentionally always being written to workspace settings → Changed to allow setting the update target (default is the global setting).

### [1.0.0] - 2024/06/23

- Initial release
