// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// 自前の国際化文字列リソースの読み込み
import * as i18n from "./romlylib/i18n";
import { I18NSTR } from "./i18nTexts";










// 拡張機能の設定のセクション名
const CONFIG_SECTION = 'romly-toggle-wordwrap';
// 拡張機能の設定のキー名
const CONFIG_KEY_TOGGLE_VALUE = 'toggleValue';
const CONFIG_KEY_CONFIG_TARGET = 'configurationTarget';
const CONFIG_KEY_LIMIT_TO_LANGUAGE_SCOPE = 'limitToLanguageScope';

// VSCode の設定のエディターのセクション名。
const VSCODE_CONFIG_SECTION_EDITOR = 'editor';
// VSCode の折り返し設定のキー名。
const VSCODE_CONFIG_KEY_WORDRWAP = 'wordWrap';
// VSCode の折り返し設定の値。
const VSCODE_CONFIG_VALUE_WORDRWAP_OFF = 'off';

// デバッグモードフラグ(開発時のみログを出力)
let isDevMode = false;










/**
 * デバッグログを出力する。開発モード時のみ出力される。
 * @param message ログメッセージ
 */
function debugLog(message: string): void
{
	if (isDevMode)
	{
		console.log(`[Romly Toggle Wordwrap] ${message}`);
	}
}










/**
 * 現在アクティブなエディタの言語IDを取得する。アクティブなエディタが無ければ `undefined` を返す。
 * @returns
 */
function getActiveEditorLanguageId(): string | undefined
{
	const editor = vscode.window.activeTextEditor;
	return editor ? editor.document.languageId : undefined;
}










/**
 * 読み取った折り返し設定と、どのスコープから設定値を読み取ったかを表す情報
 */
interface WordWrapInfo
{
	value: string;
	languageId?: string;
	// どのスコープから値を読み取ったか
	scopeType: 'global' | 'workspace' | 'workspaceFolder' | 'globalLanguage' | 'workspaceLanguage' | 'workspaceFolderLanguage' | 'defaultLanguage' | 'default';
}




/**
 * 現在の行の折り返し設定を取得する。
 * 言語固有の設定を最優先として、通常設定、ディフォルト値(on)とフォールバックして取得する。
 * どのスコープから値を読み取ったかの情報も返す。
 * @returns
 */
function getCurrentWordWrap(): WordWrapInfo
{
	const langId = getActiveEditorLanguageId();
	const config = langId
		? vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR, { languageId: langId })
		: vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR);

	const inspection = config.inspect<string>(VSCODE_CONFIG_KEY_WORDRWAP);

	// 優先順位に従って、どのスコープから値を取得しているか判定
	// VSCodeの設定の優先順位(高い方から順に):
	// 	workspaceFolderLanguageValue >
	// 	workspaceLanguageValue >
	// 	globalLanguageValue >
	// 	defaultLanguageValue >
	// 	workspaceFolderValue >
	// 	workspaceValue >
	// 	globalValue >
	// 	defaultValue
	let value: string = VSCODE_CONFIG_VALUE_WORDRWAP_OFF;
	let scopeType: WordWrapInfo['scopeType'] = 'default';

	if (inspection)
	{
		if (langId && inspection.workspaceFolderLanguageValue !== undefined)
		{
			value = inspection.workspaceFolderLanguageValue;
			scopeType = 'workspaceFolderLanguage';
		}
		else if (langId && inspection.workspaceLanguageValue !== undefined)
		{
			value = inspection.workspaceLanguageValue;
			scopeType = 'workspaceLanguage';
		}
		else if (langId && inspection.globalLanguageValue !== undefined)
		{
			value = inspection.globalLanguageValue;
			scopeType = 'globalLanguage';
		}
		else if (langId && inspection.defaultLanguageValue !== undefined)
		{
			value = inspection.defaultLanguageValue;
			scopeType = 'defaultLanguage';
		}
		else if (inspection.workspaceFolderValue !== undefined)
		{
			value = inspection.workspaceFolderValue;
			scopeType = 'workspaceFolder';
		}
		else if (inspection.workspaceValue !== undefined)
		{
			value = inspection.workspaceValue;
			scopeType = 'workspace';
		}
		else if (inspection.globalValue !== undefined)
		{
			value = inspection.globalValue;
			scopeType = 'global';
		}
		else if (inspection.defaultValue !== undefined)
		{
			value = inspection.defaultValue;
			scopeType = 'default';
		}
	}

	// デバッグログ
	debugLog(`currentWordWrap: ${value} from ${scopeType}${langId ? ` (language: ${langId})` : ''}`);

	return {
		value,
		languageId: langId,
		scopeType
	};
}










/**
 * 現在の折り返し設定から、トグルした新しい折り返し設定を決める。
 * @param currentWordWrap
 * @returns
 */
function getToggledWordWrap(currentWordWrap: string): string
{
	let newValue;
	if (currentWordWrap === VSCODE_CONFIG_VALUE_WORDRWAP_OFF)
	{
		const extensionConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
		const toggleValue = extensionConfig.get(CONFIG_KEY_TOGGLE_VALUE, 'on');
		newValue = toggleValue;
	}
	else
	{
		newValue = VSCODE_CONFIG_VALUE_WORDRWAP_OFF;
	}
	return newValue;
}










/**
 * 設定の書き込み先(Global/Workspace/WorkspaceFolder)を取得。
 * @param currentWordWrapInfo 現在の折り返し設定情報
 * @returns
 */
function getConfigTarget(currentWordWrapInfo: WordWrapInfo): vscode.ConfigurationTarget
{
	const extensionConfig = vscode.workspace.getConfiguration(CONFIG_SECTION);
	const target = extensionConfig.get(CONFIG_KEY_CONFIG_TARGET);

	// 現在、ワークスペースが開かれている？
	const isWorksspaceOpened = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0;

	switch (target)
	{
		case 'workspace':
			// ワークスペースが開いていればワークスペース、なければグローバルにフォールバック
			return isWorksspaceOpened ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;

		case 'auto':
		default:
			// 現在有効な設定が読み取られているスコープに書き込む
			switch (currentWordWrapInfo.scopeType)
			{
				case 'workspaceFolder':
				case 'workspaceFolderLanguage':
					return vscode.ConfigurationTarget.WorkspaceFolder;

				case 'workspace':
				case 'workspaceLanguage':
					return vscode.ConfigurationTarget.Workspace;

				case 'global':
				case 'globalLanguage':
				case 'defaultLanguage':
				case 'default':
					return vscode.ConfigurationTarget.Global;
			}
	}
}










/**
 * 折り返し設定を指定されたスコープに書き込む。
 * 言語固有設定への書き込みが必要かどうかを判定し、適切な設定先に書き込む。
 * @param current 現在の折り返し設定情報
 * @param newValue 書き込む新しい折り返し設定値
 * @param target 書き込み先のスコープ(Global/Workspace/WorkspaceFolder)
 * @returns 設定更新の Promise
 */
function writeWordwrap(current: WordWrapInfo, newValue: string, target: vscode.ConfigurationTarget): Thenable<void>
{
	const targetName = target === vscode.ConfigurationTarget.Global ? 'Global'
		: target === vscode.ConfigurationTarget.Workspace ? 'Workspace'
		: 'WorkspaceFolder';

	const langId = getActiveEditorLanguageId();
	if (langId)
	{
		// 言語固有設定に書き込むべきか判定
		// 1. 拡張機能の設定で明示的に言語固有設定を指定している
		// 2. 現在の設定が言語固有設定から読まれている
		const explicitLanguageScope = vscode.workspace.getConfiguration(CONFIG_SECTION).get(CONFIG_KEY_LIMIT_TO_LANGUAGE_SCOPE, false);
		const currentIsLanguageScope = current.scopeType.includes('Language'); // 'globalLanguage', 'workspaceLanguage', 'workspaceFolderLanguage'

		if (explicitLanguageScope || currentIsLanguageScope)
		{
			// 言語固有設定に書き込む
			const config = vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR, { languageId: langId });
			debugLog(`Write to ${targetName} [${langId}]: ${newValue}`);
			return config.update(VSCODE_CONFIG_KEY_WORDRWAP, newValue, target, true);
		}
	}

	// 全体設定に書き込む
	const config = vscode.workspace.getConfiguration(VSCODE_CONFIG_SECTION_EDITOR);
	debugLog(`Write to ${targetName}: ${newValue}`);
	return config.update(VSCODE_CONFIG_KEY_WORDRWAP, newValue, target);
}










function toggleWordwrap(): void
{
	// 現在の設定を取得(どのスコープから値を取得したかも記憶)
	const currentWordWrapInfo = getCurrentWordWrap();

	// トグルした新しい設定を決める
	const newValue = getToggledWordWrap(currentWordWrapInfo.value);

	// 設定の書き込み先を決める
	const configurationTarget = getConfigTarget(currentWordWrapInfo);

	// 書き込み
	const update = writeWordwrap(currentWordWrapInfo, newValue, configurationTarget);
	Promise.resolve(update).catch((error) =>
	{
		vscode.window.showErrorMessage(i18n.t(I18NSTR['error.updateFail']));
	});
}










// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
	// 開発モード(デバッグ実行中)かどうか判定
	isDevMode = context.extensionMode === vscode.ExtensionMode.Development;

	const disposable = vscode.commands.registerCommand('romly-toggle-wordwrap.execute', () =>
	{
		toggleWordwrap();
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
