# Obsidian Note Content Pusher
_An Obsidian plugin to add (prepend or append) specified content to a note (existing or new) without opening another pane._

As requested in [this](https://forum.obsidian.md/t/push-content-to-link-automatically-apply-tags-links-embeds-into-newly-created-links-through-link-insert-content/36844) forum post.

<a href="https://www.buymeacoffee.com/lizardheart">
 <img align="left" alt="Buy me a Coffee" width="200px" src="https://raw.githubusercontent.com/lizard-heart/lizard-heart/main/buy-me-a-cofee.png" />
</a>

<br>
<br>


## Demo
<img src="https://user-images.githubusercontent.com/62226606/170394694-1e138cf3-67ac-47f1-a1d4-0bea28d4c7b8.mov" width=70%>


## How to use
- When you want to link to a file that doesn't yet exist, do it with this syntax: `[[title of new file]]>>{content you want to appear in file}`
- Then run the only command in this plugin, "Create file and push content," either from the command palette or with a hotkey. The command will automatically replace content in the original file to look like this: `[[title of new file]]`, will create the file, and add the content within the brackets to it, all without leaving the currently open note.
- If a file with the name you specified already exists, the content in the brackets will be added to the end of that file.

### Aliases
- To add an alias to the new file, do it in the following format: `[[title for new file|>>alternate title]]>>{}`
- Running the command will fix the formatting on the current file: `[[title for new file|alternate title]]` and will also add the alias you wrote, in this case "alternate title," to the yaml frontmatter of the new note, like this:
```yaml
---
alias: alternate title
---
```

### Inline Settings
To adjust how the text is pushed to a note, you can add inline settings within the curly brackts by using the inline settings characters (by default `@@`). Currently, the only available inline settings are:
 - **append**: overrides the push to existing notes setting to add new content to the end of an existing file.
 - **prepend**: overrides the push to existing notes setting to add new content to the beginning of an existing file.

 For example, to tell the plugin to prepend content, you could write: `[[title of existing file]]>>{content to add at the beginning@@prepend}`

## Customization/Settings
### Content Pusher Characters
First, you can customize the string of characters the plugin will look for when pushing content to a file. Make this something you don't often type elsewhere. The default is `>>`. For example, if you changed this setting to `%%%`, you would type something like `[[title]]%%%{content}` to push content to a new note.

### Inline Settings Characters
The next setting allows you to customize the characters used to to tell the plugin when to look for inline settings within the curly brackts.

### Automatic Push
The third setting allows you to toggle on Automatic Push. This will automatically check for any text in the correct format when you switch to a new line in your note. This way you never have to run the plugin's command to trigger the note creation. You will still be able to run the command manually at any time.

### Push to Existing Notes
The fourth setting allows you to toggle whether content being pushed to new notes will be added to the beginning or to the end of the note. By default, the content will be appended (added to the end), but turning the toggle on will add new content to the beginning.
