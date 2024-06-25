// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// 自前の国際化文字列リソースの読み込み
import i18n from "./i18n";
import i18nTexts from "./i18nTexts";










// 拡張機能の設定のセクション名
const CONFIG_SECTION = 'romly-toggle-wordwrap';
// 拡張機能の設定のキー名
const CONFIG_KEY_TOGGLE_VALUE = 'toggleValue';
const CONFIG_KEY_CONFIG_TARGET = 'configurationTarget';

// VSCode の設定のエディターのセクション名。
const VSCODE_CONFIG_SECTION_EDITOR = 'editor';
// VSCode の折り返し設定のキー名。
const VSCODE_CONFIG_KEY_WORDRWAP = 'wordWrap';
// VSCode の折り返し設定の値。
const VSCODE_CONFIG_VALUE_WORDRWAP_OFF = 'off';









function toggleWordwrap(): void
{
	// 現在の設定を取得
	const currentWordWrap = vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR).get(VSCODE_CONFIG_KEY_WORDRWAP);
	const extensionConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
	const vscodeConfig = vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR);

	// 設定の書き込み先
	const target = extensionConfig.get(CONFIG_KEY_CONFIG_TARGET);

	let newValue;
	if (currentWordWrap === VSCODE_CONFIG_VALUE_WORDRWAP_OFF)
	{
		const toggleValue = extensionConfig.get(CONFIG_KEY_TOGGLE_VALUE);
		newValue = toggleValue;
		vscodeConfig.update(VSCODE_CONFIG_KEY_WORDRWAP, toggleValue);
	}
	else
	{
		newValue = VSCODE_CONFIG_VALUE_WORDRWAP_OFF;
	}

	// 設定の書き込み先を決める
	const isWorksspaceOpened = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0;
	let configurationTarget: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Global;
	switch (target)
	{
		case 'workspace':
			if (!isWorksspaceOpened)
			{
				// ワークスペース書き込み設定でワークスペースを開いていない場合はエラー
				vscode.window.showErrorMessage(i18n(i18nTexts, 'error.workspaceNotOpened'));
				return;
			}
			else
			{
				configurationTarget = vscode.ConfigurationTarget.Workspace;
			}
			break;

		case 'workspaceFirst':
			configurationTarget = isWorksspaceOpened ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
			break;
	}

	Promise.resolve(vscodeConfig.update(VSCODE_CONFIG_KEY_WORDRWAP, newValue, configurationTarget))
		.catch((error) =>
		{
			console.log(error);
			vscode.window.showErrorMessage(i18n(i18nTexts, 'error.updateFail'));
		});
}










// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('romly-toggle-wordwrap.execute', () =>
	{
		toggleWordwrap();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
