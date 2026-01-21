# Romly Toggle Wordwrap

## 日本語(Japanese)

[English is here](#english英語)

行の折り返し設定を on/off で切り替える拡張機能です。いちいち設定画面に行かずとも、コマンドパレットから呼び出してサクッと切り替えられるようになります。

### 使い方

コマンドパレットから `toggle wordwrap` などとタイプして検索し、実行して下さい。ショートカットを割り当てて使うのも便利かもしれませんね！

![使っている様子](images/screencast.webp)

### 拡張機能の設定

* `romly-toggle-wordwrap.toggleValue`: 折り返しを有効にした時の値を`on`, `wordWrapColumn`, `bounded`から選択できます。

* `romly-toggle-wordwrap.configurationTarget`: 折り返し設定の書き込み先を選択します。`auto` **(推奨)** は現在有効な設定スコープに、`workspace`はできるだけワークスペース設定に書き込みます。ワークスペース設定より優先される設定がある場合はそちらを上書きします。

* `romly-toggle-wordwrap.limitToLanguageScope`: 有効にすると言語固有の設定に書き込みます。テキストドキュメント編集中に切り替えた場合にのみ有効です。

### リリースノート

変更ログ [CHANGELOG.md](CHANGELOG.md) をご覧下さい。










-----










## English(英語)

[日本語(Japanese)はこちら](#日本語japanese)

This extension lets you toggle the word wrap setting on/off. No need to dig through settings anymore, just call it up from the command palette.

### How to Use

Just type `toggle wordwrap` or somethin in the command palette and execute it. Setting a shortcut for this also might also be handy.

![Extension in action](images/screencast.webp)

### Extension Settings

* `romly-toggle-wordwrap.toggleValue`: Allows selection of the value for enabling word wrap from `on`, `wordWrapColumn`, and `bounded`.

* `romly-toggle-wordwrap.configurationTarget`: Select where to save the word wrap setting. `auto` **(Recommended)** writes to the current active scope, while `workspace` writes to workspace settings when possible. If a higher-priority setting exists, it will be overwritten instead.

* `romly-toggle-wordwrap.limitToLanguageScope`: When enabled, writes to language-specific settings. Only effective when toggled while editing a text document.

### Release Notes

Please check [CHANGELOG.md](CHANGELOG.md) for the details.