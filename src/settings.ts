import { App, PluginSettingTab, Setting } from "obsidian";
import ListModified from "./main";

export interface ListModifiedSettingsRenamed {
	markComplete: boolean;
}

export const DEFAULT_SETTINGS: ListModifiedSettingsRenamed = {
	markComplete: true,

};

export class ListModifiedSettingTabRenamed extends PluginSettingTab {
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
			.setName("Mark Complete")
			.setDesc("Mark tasks as complete in Obsidian when they are sent to OmniFocus.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.markComplete)
					.onChange(async (value) => {
						this.plugin.settings.markComplete = value;
						await this.plugin.saveSettings();
					})
			);
		

	}
}
