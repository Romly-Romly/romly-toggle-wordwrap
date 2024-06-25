import { LocalizedMessages } from "./i18n";

const messages: LocalizedMessages =
{
	'error.updateFail':
	{
		ja: '`editor.wordWrap`の更新に失敗しました',
		en: 'Failed to update `editor.wordWrap`',
	},
	'error.workspaceNotOpened':
	{
		ja: 'ワークスペースが開かれていないため、ワークスペース設定に書き込めません。',
		en: "Couldn't write to workspace settings because workspace is not opened.",
	}
};

export default messages;