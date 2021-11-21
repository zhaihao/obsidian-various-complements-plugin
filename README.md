# obsidian-various-complements-plugin

[![release](https://img.shields.io/github/release/tadashi-aikawa/obsidian-various-complements-plugin.svg)](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/releases/latest)
![downloads](https://img.shields.io/github/downloads/tadashi-aikawa/obsidian-various-complements-plugin/total)

This plugin for [Obsidian] enables you to complement input in markdown files.

## ⌨️Features

### Auto Complete in current file

It complements the text with tokens that exists in a current file.

You can set a strategy if the separator of your language is not only whitespace.

![settings](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/settings.png)

#### Default

![default](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/default.gif)

#### Japanese

![default](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/japanese.gif)

### Auto Complete from custom dictionaries

You can also use custom dictionaries to show suggestions on auto-complete.

![custom-dictionary-demo](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/custom-dictionary-demo.gif)

You can add custom dictionaries from settings as follows.

![settings](https://github.com/tadashi-aikawa/obsidian-various-complements-plugin/blob/main/demo/setting-custom-directories.png?raw=true)

#### Definitions of a dictionary file

You can define a word for each line in dictionary files.

| Col1 | Col2        | Col3 and later |
| ---- | ----------- | -------------- |
| word | description | aliases        |

It uses `<TAB>` as a separator.

Ex.
```
Looks good to me		LGTM
As far as I know	spoken used to say that you think that something is true, although it is possible that you do not know all the facts or cannot remember completely	AFAIK
red	🔴	color
blue	🔵	color
green	🟢	color
😄		@smile @laugh @good
```

It is more straightforward to edit on Google Spread Sheet.

![custom-dictionary-in-spread-sheet](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/custom-dictionary-in-spread-sheet.png)

**After you update settings about custom dictionaries, please execute a `Reload custom dictionaries` command.**


## 👁 Live preview support

It supports Live Preview mode for now.

![default](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/livepreview.gif)

## 📱 Mobile support

It supports on mobile.

![default](https://raw.githubusercontent.com/tadashi-aikawa/obsidian-various-complements-plugin/main/demo/mobile.gif)

## 🖥️ For developers

- Requirements
    - [Task]

### Todo

- [ ] [Use WebWorker to improve performance](https://github.com/obsidianmd/obsidian-releases/pull/155#issuecomment-774930410)

### Development

```console
task init
task dev
```

### Release

```
task release VERSION=1.2.3
```

[Obsidian]: https://obsidian.md/
[Task]: https://github.com/go-task/task
