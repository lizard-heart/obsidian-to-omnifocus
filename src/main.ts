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
				this.addToOmnifocus(false, editor, view);
			},
		});

		this.addCommand({
			id: 'extract-tasks-selection',
			name: 'Extract Tasks from selection Into OmniFocus',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.addToOmnifocus(true, editor, view);
			},
		});

		this.addSettingTab(new TasksToOmnifocusSettingTab(this.app, this));
	}

	async addToOmnifocus(isSelection: bool, editor: Editor, view: MarkdownView) {
		var editorText;
		if (isSelection) {
			editorText = editor.getSelection();
		} else {
			editorText = editor.getValue();
		}
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
				if (isSelection) {
					editor.replaceSelection(completedText);
				} else {
					editor.setValue(completedText)
				}
			}

		} catch (err) {
			// do you really want to hide any and all errors from the user?
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() { }


	private async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
}
