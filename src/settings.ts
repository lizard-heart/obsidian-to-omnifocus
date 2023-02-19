import { App, PluginSettingTab, Setting } from "obsidian";
import ListModified from "./main";

export interface ListModifiedSettings {
	adnote: string;
	adseealso: string;
	adabstract: string;
	adsummary: string;
	adtldr: string;
	adinfo: string;
	adtodo: string;
	adtip: string;
	adhint: string;
	adimportant: string;
	adsuccess: string;
	adcheck: string;
	addone: string;
	adquestion: string;
	adhelp: string;
	adfaq: string;
	adwarning: string;
	adcaution: string;
	adattention: string;
	adfailure: string;
	adfail: string;
	admissing: string;
	addanger: string;
	aderror: string;
	adbug: string;
	adexample: string;
	adquote: string;
	adcite: string;
}

export const DEFAULT_SETTINGS: ListModifiedSettings = {
	adnote: "{.callout-note}",
	adseealso: "{.callout-note}",
	adabstract: "{.callout-note}",
	adsummary: "{.callout-note}",
	adtldr: "{.callout-note}",
	adinfo: "{.callout-tip}",
	adtodo: "{.callout-note}",
	adtip: "{.callout-tip}",
	adhint: "{.callout-tip}",
	adimportant: "{.callout-important}",
	adsuccess: "{.callout-note}",
	adcheck: "{.callout-note}",
	addone: "{.callout-note}",
	adquestion: "{.callout-note}",
	adhelp: "{.callout-note}",
	adfaq: "{.callout-note}",
	adwarning: "{.callout-warning}",
	adcaution: "{.callout-caution}",
	adattention: "{.callout-important}",
	adfailure: "{.callout-caution}",
	adfail: "{.callout-caution}",
	admissing: "{.callout-caution}",
	addanger: "{.callout-caution}",
	aderror: "{.callout-warning}",
	adbug: "{.callout-warning}",
	adexample: "{.callout-note}",
	adquote: "{.callout-note}",
	adcite: "{.callout-note}",

};

export class ListModifiedSettingTab extends PluginSettingTab {
	plugin: ListModified;
	tagString: string;

	constructor(app: App, plugin: ListModified) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings" });

		new Setting(containerEl)
			.setName("ad-note")
			.setDesc(
				"ad-note"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adnote)
					.onChange(async (value) => {
						this.plugin.settings.adnote = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-seealso")
			.setDesc(
				"ad-seealso"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adseealso)
					.onChange(async (value) => {
						this.plugin.settings.adseealso = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-abstract")
			.setDesc(
				"ad-abstract"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adabstract)
					.onChange(async (value) => {
						this.plugin.settings.adabstract = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-summary")
			.setDesc(
				"ad-summary"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adsummary)
					.onChange(async (value) => {
						this.plugin.settings.adsummary = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-tldr")
			.setDesc(
				"ad-tldr"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adtldr)
					.onChange(async (value) => {
						this.plugin.settings.adtldr = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-info")
			.setDesc(
				"ad-info"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-tip}")
					.setValue(this.plugin.settings.adinfo)
					.onChange(async (value) => {
						this.plugin.settings.adinfo = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-todo")
			.setDesc(
				"ad-todo"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adtodo)
					.onChange(async (value) => {
						this.plugin.settings.adtodo = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-tip")
			.setDesc(
				"ad-tip"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-tip}")
					.setValue(this.plugin.settings.adtip)
					.onChange(async (value) => {
						this.plugin.settings.adtip = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-hint")
			.setDesc(
				"ad-hint"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-tip}")
					.setValue(this.plugin.settings.adhint)
					.onChange(async (value) => {
						this.plugin.settings.adhint = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-important")
			.setDesc(
				"ad-important"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-important}")
					.setValue(this.plugin.settings.adimportant)
					.onChange(async (value) => {
						this.plugin.settings.adimportant = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-success")
			.setDesc(
				"ad-success"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adsuccess)
					.onChange(async (value) => {
						this.plugin.settings.adsuccess = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-check")
			.setDesc(
				"ad-check"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adcheck)
					.onChange(async (value) => {
						this.plugin.settings.adcheck = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-done")
			.setDesc(
				"ad-done"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.addone)
					.onChange(async (value) => {
						this.plugin.settings.addone = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-question")
			.setDesc(
				"ad-question"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adquestion)
					.onChange(async (value) => {
						this.plugin.settings.adquestion = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-help")
			.setDesc(
				"ad-help"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-help}")
					.setValue(this.plugin.settings.adhelp)
					.onChange(async (value) => {
						this.plugin.settings.adhelp = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-faq")
			.setDesc(
				"ad-faq"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-faq}")
					.setValue(this.plugin.settings.adfaq)
					.onChange(async (value) => {
						this.plugin.settings.adfaq = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-warning")
			.setDesc(
				"ad-warning"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-warning}")
					.setValue(this.plugin.settings.adwarning)
					.onChange(async (value) => {
						this.plugin.settings.adwarning = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-caution")
			.setDesc(
				"ad-caution"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-caution}")
					.setValue(this.plugin.settings.adcaution)
					.onChange(async (value) => {
						this.plugin.settings.adcaution = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-attention")
			.setDesc(
				"ad-attention"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-important}")
					.setValue(this.plugin.settings.adattention)
					.onChange(async (value) => {
						this.plugin.settings.adattention = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-failure")
			.setDesc(
				"ad-failure"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-caution}")
					.setValue(this.plugin.settings.adfailure)
					.onChange(async (value) => {
						this.plugin.settings.adfailure = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-fail")
			.setDesc(
				"ad-fail"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-caution}")
					.setValue(this.plugin.settings.adfail)
					.onChange(async (value) => {
						this.plugin.settings.adfail = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-missing")
			.setDesc(
				"ad-missing"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-caution}")
					.setValue(this.plugin.settings.admissing)
					.onChange(async (value) => {
						this.plugin.settings.admissing = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-danger")
			.setDesc(
				"ad-danger"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-caution}")
					.setValue(this.plugin.settings.addanger)
					.onChange(async (value) => {
						this.plugin.settings.addanger = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-error")
			.setDesc(
				"ad-error"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-warning}")
					.setValue(this.plugin.settings.aderror)
					.onChange(async (value) => {
						this.plugin.settings.aderror = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-bug")
			.setDesc(
				"ad-bug"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-warning}")
					.setValue(this.plugin.settings.adbug)
					.onChange(async (value) => {
						this.plugin.settings.adbug = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-example")
			.setDesc(
				"ad-example"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adexample)
					.onChange(async (value) => {
						this.plugin.settings.adexample = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-quote")
			.setDesc(
				"ad-quote"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adquote)
					.onChange(async (value) => {
						this.plugin.settings.adquote = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("ad-cite")
			.setDesc(
				"ad-cite"
			)
			.addText((text) =>
				text
					.setPlaceholder("{.callout-note}")
					.setValue(this.plugin.settings.adcite)
					.onChange(async (value) => {
						this.plugin.settings.adcite = value;
						await this.plugin.saveSettings();
					})
			);

	}
}
