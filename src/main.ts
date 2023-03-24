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
		// this.addCommand({
		// 	id: "extract-tasks",
		// 	name: "Extract Tasks Into OmniFocus",
		// 	callback: () => this.sendToOF(),
		// });

		this.addCommand({
			id: 'extract-tasks',
			name: 'Extract Tasks Into OmniFocus',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const editorText = editor.getValue()
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
						editor.setValue(completedText);
					}

				} catch (err) {

				}
			},
		});

		this.addSettingTab(new TasksToOmnifocusSettingTab(this.app, this));
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {}

	// // the first function that runs
	// async sendToOF() {
	// 	// const app = window.app as App;
	// 	const view = this.app.workspace.getActiveViewOfType(MarkdownView);
	// 	if (view!=null) {
	// 		const editor = view.editor;
	// 		const editorText = editor.getValue();

	// 		try {
	// 			let tasks = editorText.match(/- \[ \] .*/g);

	// 			for (let task of tasks) {
	// 				let taskName = task.replace("- [ ] ", "");
	// 				let taskNameEncoded = encodeURIComponent(taskName);
	// 				let noteURL = view.file.path.replace(/ /g, "%20").replace(/\//g, "%2F");
	// 				let vaultName = app.vault.getName();
	// 				let taskNoteEncoded = encodeURIComponent("obsidian://open?=" + vaultName + "&file="+noteURL);
					
	// 				window.open(
	// 					`omnifocus:///add?name=${taskNameEncoded}&note=${taskNoteEncoded}`
	// 				);
	// 			}

	// 			if (this.settings.markComplete) {
	// 				let completedText = editorText.replace(/- \[ \]/g, "- [x]");
	// 				editor.setValue(completedText);
	// 			}

	// 		} catch (err) {

	// 		}
	// 	}
	// }


	private async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
}
