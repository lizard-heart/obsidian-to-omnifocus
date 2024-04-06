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

	async addToOmnifocus(isSelection: boolean, editor: Editor, view: MarkdownView) {
		console.log("addToOmnifocus");
		console.log(isSelection);
		console.log(editor);
		var editorText;
		if (isSelection) {
			editorText = editor.getSelection();
		} else {
			editorText = editor.getValue();
		}
		console.log(editorText);
		try {
			let tasks = editorText.match(/\[ \] .*/g);
			console.log(tasks);
			for (let task of tasks) {
				let taskName = task.replace("[ ] ", "");
				console.log(taskName);
				// 取出‘22:00 - 23:30 开会’中的时间
				let time = taskName.match(/\d{2}:\d{2} - \d{2}:\d{2}/g);
				console.log(time);
				let today = new Date();
				console.log('today', today);
				// 时间‘Mon Apr 01 2024 11:34:27 GMT+0800 (China Standard Time)’转换为‘jun 25 8am‘这种格式
				let defer = today.toISOString().split("T")[0];
				let due = today.toISOString().split("T")[0];
				console.log('defer', defer);
				console.log('due', due);
				if (time) {
					taskName = taskName.replace(time[0], "");
					let times = time[0].split(" - ");
					defer = defer + "T" + times[0] + ":00";
					due = due + "T" + times[1] + ":00";
				} else {
					defer = defer + "T00:00:00";
					due = due + "T23:59:59";
				}
				let taskNameEncoded = encodeURIComponent(taskName);
				let noteURL = view.file.path.replace(/ /g, "%20").replace(/\//g, "%2F");
				let vaultName = this.app.vault.getName();
				let taskNoteEncoded = encodeURIComponent("obsidian://open?=" + vaultName + "&file=" + noteURL);

				window.open(
					`omnifocus:///add?name=${taskNameEncoded}&note=${taskNoteEncoded}&defer=${defer}&due=${due}`
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
