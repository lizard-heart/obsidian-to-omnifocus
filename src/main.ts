import { serialize } from "monkey-around";
import {
	MarkdownView,
	CachedMetadata,
	Notice,
	Plugin,
	TFile,
} from "obsidian";

import {
	ListModifiedSettings,
	DEFAULT_SETTINGS,
	ListModifiedSettingTab,
} from "./settings";




export default class ListModified extends Plugin {
	settings: ListModifiedSettings;

	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: "admonition-to-quarto",
			name: "Admonition to Quarto",
			callback: () => this.createAndPush(),
		});

		this.addCommand({
			id: "quarto-to-admonition",
			name: "Quarto to Admonition",
			callback: () => this.createAndPush2(),
		});

		// this.registerEvent(
		// 	this.app.metadataCache.on("changed", this.automaticPush)
		// );

		this.addSettingTab(new ListModifiedSettingTab(this.app, this));
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {}

	async createAndPush2() {
		// const app = window.app as App;
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view != null) {
			const editor = view.editor;
			const editorText = editor.getValue();
			// const indicatorCharacter = this.settings.indicatorCharacter
			// let newContent = ""
			// let inlineSetting = ""
			// let newTitle = ""
			// let newAlias = ""
			// let shouldPrepend = this.settings.shouldPrepend

			// check if syntax to push file is present
			try {
				let currentTitle = view.file.path
				let qmdTitle = currentTitle.split(".")[0] + ".qmd"
				let newText = editorText.replace(/(:::)({.*\n)([\s\S]*?\n)(:::)/g, "```ad-note \n$3:```")


				await this.app.vault.create(qmdTitle, newText);

			} catch (err) {
				// if (this.settings.automaticPush == false) {
				// 	new Notice(`Didn't detect correct syntax. Doing nothing`)
				// }
			}
		}
	}

	// the first function that runs
	async createAndPush() {
		// const app = window.app as App;
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view!=null) {
			const editor = view.editor;
			const editorText = editor.getValue();
			// const indicatorCharacter = this.settings.indicatorCharacter
			// let newContent = ""
			// let inlineSetting = ""
			// let newTitle = ""
			// let newAlias = ""
			// let shouldPrepend = this.settings.shouldPrepend

			// check if syntax to push file is present
			try {
				let currentTitle = view.file.path
				let qmdTitle = currentTitle.split(".")[0] + ".qmd"
				var newText = editorText.replace(/(```)(ad.*\n)([\s\S]*?\n)(```)/g, `::: $2\n$3:::`)
				newText = newText.replace("ad-note", this.settings.adnote);
				newText = newText.replace("ad-seealso", this.settings.adseealso);
				newText = newText.replace("ad-abstract", this.settings.adabstract);
				newText = newText.replace("ad-summary", this.settings.adsummary);
				newText = newText.replace("ad-tldr", this.settings.adtldr);
				newText = newText.replace("ad-info", this.settings.adinfo);
				newText = newText.replace("ad-todo", this.settings.adtodo);
				newText = newText.replace("ad-tip", this.settings.adtip);
				newText = newText.replace("ad-hint", this.settings.adhint);
				newText = newText.replace("ad-important", this.settings.adimportant);
				newText = newText.replace("ad-success", this.settings.adsuccess);
				newText = newText.replace("ad-check", this.settings.adcheck);
				newText = newText.replace("ad-done", this.settings.addone);
				newText = newText.replace("ad-question", this.settings.adquestion);
				newText = newText.replace("ad-help", this.settings.adhelp);
				newText = newText.replace("ad-faq", this.settings.adfaq);
				newText = newText.replace("ad-warning", this.settings.adwarning);
				newText = newText.replace("ad-caution", this.settings.adcaution);
				newText = newText.replace("ad-attention", this.settings.adattention);
				newText = newText.replace("ad-failure", this.settings.adfailure);
				newText = newText.replace("ad-fail", this.settings.adfail);
				newText = newText.replace("ad-missing", this.settings.admissing);
				newText = newText.replace("ad-danger", this.settings.addanger);
				newText = newText.replace("ad-error", this.settings.aderror);
				newText = newText.replace("ad-bug", this.settings.adbug);
				newText = newText.replace("ad-example", this.settings.adexample);
				newText = newText.replace("ad-quote", this.settings.adquote);
				newText = newText.replace("ad-cite", this.settings.adcite);

				await this.app.vault.create(qmdTitle, newText);

			} catch (err) {
				// if (this.settings.automaticPush == false) {
				// 	new Notice(`Didn't detect correct syntax. Doing nothing`)
				// }
			}
		}
	}

	// private automaticPush = serialize(
	// 	async (file: TFile, _data: string, cache: CachedMetadata) => {
	// 		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
	// 		if (view!= null) {
	// 			const indicatorCharacter = this.settings.indicatorCharacter
	// 			const editor = view.editor;
	// 			const currentPos = editor.getCursor();
	// 			const nextPos = { line: currentPos.line, ch: currentPos.ch + 1 };
	// 			const zeroPos = { line: currentPos.line, ch: 0 };
	// 			const lineString = editor.getRange(zeroPos, nextPos);
	// 			if (this.settings.automaticPush == true && lineString.includes("]]" + indicatorCharacter + "{") == false) {
	// 				await this.createAndPush();
	// 			}
	// 		}
	// 	}
	// );


	private async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
}
