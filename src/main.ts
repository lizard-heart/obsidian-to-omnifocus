import { serialize } from "monkey-around";
import {
	MarkdownView,
	CachedMetadata,
	Notice,
	Plugin,
	TFile,
	Vault,
	Editor,
} from "obsidian";

import {
	TasksToOmnifocusSettings,
	DEFAULT_SETTINGS,
	TasksToOmnifocusSettingTab,
} from "./settings";


export default class TasksToOmnifocus extends Plugin {
	settings: TasksToOmnifocusSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'extract-tasks',
			name: 'Extract Tasks Into OmniFocus',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const editorText = editor.getValue()
				this.addToOmnifocus(editorText, editor, view);
			},
		});
		
		this.addCommand({
			id: 'extract-tasks-selection',
			name: 'Extract Tasks from selection Into OmniFocus',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const editorText = editor.getSelection();
				this.addToOmnifocus(editorText, editor, view);
			},
		});

		this.addSettingTab(new TasksToOmnifocusSettingTab(this.app, this));
	}

	async addToOmnifocus(editorText: string, editor: Editor, view: MarkdownView) {
		try {
			let tasks = editorText.match(/- \[ \] .*/g);

			for (let task of tasks) {
				let taskName = task.replace("- [ ] ", "");
				let taskNameEncoded = encodeURIComponent(taskName);
				let noteURL = view.file.path.replace(/ /g, "%20").replace(/\//g, "%2F");
				let vaultName = app.vault.getName();
				let taskNoteEncoded = encodeURIComponent("obsidian://open?=" + vaultName + "&file=" + noteURL);

				window.open(
					`omnifocus:///add?name=${taskNameEncoded}&note=${taskNoteEncoded}`
				);
			}

			if (this.settings.markComplete) {
				let completedText = editorText.replace(/- \[ \]/g, "- [x]");
				editor.replaceSelection(completedText);
			}

		} catch (err) {

		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {}


	private async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
}
