// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';










// VSCode の設定のエディターのセクション名。
const CONFIG_SECTION_EDITOR = 'editor';
// VSCode の折り返し設定のキー名。
const CONFIG_KEY_WORDRWAP = 'wordWrap';
// VSCode の折り返し設定の値。
const CONFIG_VALUE_WORDRWAP_ON = 'on';
const CONFIG_VALUE_WORDRWAP_OFF = 'off';









function toggleWordwrap(): void
{
	// 現在の設定を取得
	const currentWordWrap = vscode.workspace.getConfiguration(CONFIG_SECTION_EDITOR).get(CONFIG_KEY_WORDRWAP);
	if (currentWordWrap === CONFIG_VALUE_WORDRWAP_ON)
	{
		vscode.workspace.getConfiguration(CONFIG_SECTION_EDITOR).update(CONFIG_KEY_WORDRWAP, CONFIG_VALUE_WORDRWAP_OFF);
	}
	else
	{
		vscode.workspace.getConfiguration(CONFIG_SECTION_EDITOR).update(CONFIG_KEY_WORDRWAP, CONFIG_VALUE_WORDRWAP_ON);
	}
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
