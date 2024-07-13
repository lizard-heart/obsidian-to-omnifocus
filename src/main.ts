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

const TASK_REGEX = /[-*] \[ \] .*/g;
const DATE_REGEX = /(\/\/\s*)(\d{4}-\d{2}-\d{2})\s?/;
const MARKDOWN_LINK_REGEX = /\[([^\]]*)\]\(([^)]*)\)/g;
const WIKILINK_REGEX = /\[\[([^\]]*)\]\]/g;

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
		let editorText: string;
		if (isSelection) {
			editorText = editor.getSelection();
		} else {
			editorText = editor.getValue();
		}

		try {
			const tasks = editorText.match(TASK_REGEX);

			if (!tasks) {
				console.warn('No tasks found in the selected text.');
				return;
			}

			for (const task of tasks) {
				// eslint-disable-next-line prefer-const
				let { taskName, taskDate } = this.extractTaskNameAndDate(task);
				let taskNote = this.buildObsidianURL(view);

				const links = taskName.match(MARKDOWN_LINK_REGEX);
				if (links) {
					taskName = taskName.replace(MARKDOWN_LINK_REGEX, "$1");
					taskNote += "\n\n" + this.buildTaskNoteFromLinks(links);
				}

				taskName = taskName.replace(WIKILINK_REGEX, "$1");

				const taskNameEncoded = encodeURIComponent(taskName);
				const taskNoteEncoded = encodeURIComponent(taskNote);

				window.open(
					`omnifocus:///add?name=${taskNameEncoded}&note=${taskNoteEncoded}&due=${taskDate}`
				);
			}

			if (this.settings.markComplete) {
				const completedText = editorText.replace(/([-*]) \[ \]/g, "$1 [x]");
				if (isSelection) {
					editor.replaceSelection(completedText);
				} else {
					editor.setValue(completedText);
				}
			}

		} catch (err) {
			console.error('Error extracting tasks', err);
		}
	}

	extractTaskNameAndDate(task: string): { taskName: string, taskDate: string } {
		let taskName = task.replace(/[-*] \[ \] /, "");
		const dateMatch = taskName.match(DATE_REGEX);
		let taskDate = "";
		if (dateMatch) {
			taskDate = dateMatch[2];
			taskName = taskName.replace(dateMatch[0], "");
		}
		return { taskName, taskDate };
	}

	buildObsidianURL(view: MarkdownView): string {
		const fileURL = encodeURIComponent(view.file.path);
		const vaultName = encodeURIComponent(this.app.vault.getName());
		return `obsidian://open?vault=${vaultName}&file=${fileURL}`;
	}

	buildTaskNoteFromLinks(links: string[]): string {
		return links.map(link => link.replace(MARKDOWN_LINK_REGEX, "$1: $2")).join("\n");
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