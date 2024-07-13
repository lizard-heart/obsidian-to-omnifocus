import {
	MarkdownView,
	Plugin,
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

	async addToOmnifocus(isSelection: boolean, editor: Editor, view: MarkdownView) {
		let editorText;
		if (isSelection) {
			editorText = editor.getSelection();
		} else {
			editorText = editor.getValue();
		}
		try {
			const tasks = editorText.match(/[-*] \[ \] .*/g);

			for (const task of tasks) {
				let taskName = task.replace(/[-*] \[ \] /, "");
				// check if taskName has "//" followed by a date, and if so extract the date for later use and remove it from taskName
				const dateMatch = taskName.match(/(\/\/\s*)(\d{4}-\d{2}-\d{2})/);
				let taskDate = "";
				if (dateMatch) {
					taskDate = dateMatch[2];
					taskName = taskName.replace(dateMatch[0], "");
				}
				const taskNameEncoded = encodeURIComponent(taskName);
				const noteURL = view.file.path.replace(/ /g, "%20").replace(/\//g, "%2F");
				const vaultName = this.app.vault.getName().replace(/\s/g, "%20");
				const taskNoteEncoded = encodeURIComponent("obsidian://open?=" + vaultName + "&file=" + noteURL);

				window.open(
					`omnifocus:///add?name=${taskNameEncoded}&note=${taskNoteEncoded}&due=${taskDate}`
				);
			}

			if (this.settings.markComplete) {
				const completedText = editorText.replace(/([-*]) \[ \]/g, "$1 [x]");
				if (isSelection) {
					editor.replaceSelection(completedText);
				} else {
					editor.setValue(completedText)
				}
			}

		} catch (err) {
			console.error('Error extracting tasks', err);
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
