import * as vscode from 'vscode';
import * as i18n from "./i18n";










/**
 * ファイルをVSCodeのデフォルト動作で開く。
 *
 * テキストファイル以外(画像やバイナリ等)も適切なエディタで開かれる。開き終わるタイミングはわからないので、開いた後の操作が不要な場合に使用する。
 *
 * @param fullPath ファイルのフルパス。undefinedの場合は何もしない。
 */
export function openFile(fullPath: string | vscode.Uri | undefined): void
{
	if (fullPath === undefined)
	{
		return;
	}

	const uri = fullPath instanceof vscode.Uri ? fullPath : vscode.Uri.file(fullPath);
	vscode.commands.executeCommand('vscode.open', uri);
}










/**
 * ファイルをテキストドキュメントとしてエディタで開く。
 *
 * ドキュメントモデルを取得してからエディタに表示するため、開き終わるまで確実に待機。
 * 開いた後にカーソル移動等の操作が必要な場合や、開く処理の完了を待ちたい場合に使用する。
 *
 * @param fullPath ファイルのフルパス。undefinedの場合は何もしない。
 */
export async function openTextDocumentFile(fullPath: string | vscode.Uri | undefined): Promise<void>
{
	if (fullPath === undefined)
	{
		return;
	}

	const uri = fullPath instanceof vscode.Uri ? fullPath : vscode.Uri.file(fullPath);
	try
	{
		const document = await vscode.workspace.openTextDocument(uri);
		await vscode.window.showTextDocument(document);
	}
	catch (error)
	{
		vscode.window.showErrorMessage(i18n.t(i18n.COMMON_TEXTS.couldNotOpenFile) + `: ${error}`);
	}
}










/**
 * 文字列をクリップボードにコピーする。
 * @param text コピーする文字列。
 */
export function copyTextToClipboard(text: string): void
{
	vscode.env.clipboard.writeText(text);
}










/**
 * 文字列を指定されたターミナルに挿入する。挿入後、そのターミナルにフォーカスを移す。
 * @param text 挿入する文字列。
 */
export function sendTextToTerminal(terminal: vscode.Terminal, text: string)
{
	terminal.sendText(`${text}`, false);

	// フォーカスを移さないとエディタにフォーカスが映ってしまう
	terminal.show();
}










/**
 * 文字列をアクティブなターミナルに挿入する。
 * @param text 挿入する文字列。
 */
export function sendTextToActiveTerminal(text: string)
{
	if (text && vscode.window.activeTerminal)
	{
		sendTextToTerminal(vscode.window.activeTerminal, text);
	}
}










/**
 * 指定された行数を表示するのに必要な文字幅（桁数）を計算する。
 * 行番号表示のパディングや列幅の決定に使用する。
 *
 * @param lineCount 総行数
 * @returns 行番号を表示するのに必要な桁数。
 * @example
 * calculateLineNumberWidth(1)    // => 1
 * calculateLineNumberWidth(99)   // => 2
 * calculateLineNumberWidth(330)  // => 3
 * calculateLineNumberWidth(1000) // => 4
 */
export function calculateLineNumberWidth(lineCount: number): number
{
	return Math.floor(Math.log10(lineCount)) + 1;
}










