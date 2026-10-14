[**todo-manager**](README.md)

***

[todo-manager](README.md) / [treeObjects](treeObjects.md) / TodoComment

# Class: TodoComment

Defined in: [src/treeObjects.ts:22](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L22)

Class representing the TODO comment in the extension's tree view

## Extends

- `TreeItem`

## Constructors

### Constructor

> **new TodoComment**(`relPath`, `lineNumber`, `commentText`, `collapsibleState`): `TodoComment`

Defined in: [src/treeObjects.ts:29](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L29)

#### Parameters

##### relPath

`string`

Path of the file relative to the project's root

##### lineNumber

`number`

1-based number of the line

##### commentText

`string`

More than 80 chars will be dropped

##### collapsibleState

`TreeItemCollapsibleState`

Expected vscode.TreeItemCollapsibleState.None, required to implement interface of vscode api

#### Returns

`TodoComment`

#### Overrides

`vscode.TreeItem.constructor`

## Properties

### accessibilityInformation?

> `optional` **accessibilityInformation?**: `AccessibilityInformation`

Defined in: node\_modules/@types/vscode/index.d.ts:12386

Accessibility information used when screen reader interacts with this tree item.
Generally, a TreeItem has no need to set the `role` of the accessibilityInformation;
however, there are cases where a TreeItem is not displayed in a tree-like way where setting the `role` may make sense.

#### Inherited from

`vscode.TreeItem.accessibilityInformation`

***

### checkboxState?

> `optional` **checkboxState?**: `TreeItemCheckboxState` \| \{ `accessibilityInformation?`: `AccessibilityInformation`; `state`: `TreeItemCheckboxState`; `tooltip?`: `string`; \}

Defined in: node\_modules/@types/vscode/index.d.ts:12392

TreeItemCheckboxState TreeItemCheckboxState of the tree item.
TreeDataProvider.onDidChangeTreeData onDidChangeTreeData should be fired when TreeItem.checkboxState checkboxState changes.

#### Union Members

`TreeItemCheckboxState`

***

##### Type Literal

\{ `accessibilityInformation?`: `AccessibilityInformation`; `state`: `TreeItemCheckboxState`; `tooltip?`: `string`; \}

##### accessibilityInformation?

> `readonly` `optional` **accessibilityInformation?**: `AccessibilityInformation`

Accessibility information used when screen readers interact with this checkbox

##### state

> `readonly` **state**: `TreeItemCheckboxState`

The TreeItemCheckboxState of the tree item

##### tooltip?

> `readonly` `optional` **tooltip?**: `string`

A tooltip for the checkbox

#### Inherited from

`vscode.TreeItem.checkboxState`

***

### collapsibleState

> `readonly` **collapsibleState**: `TreeItemCollapsibleState`

Defined in: [src/treeObjects.ts:33](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L33)

Expected vscode.TreeItemCollapsibleState.None, required to implement interface of vscode api

#### Inherited from

`vscode.TreeItem.collapsibleState`

***

### command?

> `optional` **command?**: `Command`

Defined in: node\_modules/@types/vscode/index.d.ts:12354

The Command that should be executed when the tree item is selected.

Please use `vscode.open` or `vscode.diff` as command IDs when the tree item is opening
something in the editor. Using these commands ensures that the resulting editor will
appear consistent with how other built-in trees open editors.

#### Inherited from

`vscode.TreeItem.command`

***

### commentText

> `readonly` **commentText**: `string`

Defined in: [src/treeObjects.ts:32](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L32)

More than 80 chars will be dropped

***

### contextValue?

> `optional` **contextValue?**: `string`

Defined in: node\_modules/@types/vscode/index.d.ts:12379

Context value of the tree item. This can be used to contribute item specific actions in the tree.
For example, a tree item is given a context value as `folder`. When contributing actions to `view/item/context`
using `menus` extension point, you can specify context value for key `viewItem` in `when` expression like `viewItem == folder`.
```json
"contributes": {
  "menus": {
    "view/item/context": [
      {
        "command": "extension.deleteFolder",
        "when": "viewItem == folder"
      }
    ]
  }
}
```
This will show action `extension.deleteFolder` only for items with `contextValue` is `folder`.

#### Inherited from

`vscode.TreeItem.contextValue`

***

### description?

> `optional` **description?**: `string` \| `boolean`

Defined in: node\_modules/@types/vscode/index.d.ts:12329

A human-readable string which is rendered less prominent.
When `true`, it is derived from [resourceUri](treeObjects.Class.FileWithTodo.md#resourceuri) and when `falsy`, it is not shown.

#### Inherited from

`vscode.TreeItem.description`

***

### iconPath?

> `optional` **iconPath?**: `string` \| `IconPath`

Defined in: node\_modules/@types/vscode/index.d.ts:12323

The icon path or ThemeIcon for the tree item.
When `falsy`, ThemeIcon.Folder Folder Theme Icon is assigned, if item is collapsible otherwise ThemeIcon.File File Theme Icon.
When a file or folder ThemeIcon is specified, icon is derived from the current file icon theme for the specified theme icon using [resourceUri](treeObjects.Class.FileWithTodo.md#resourceuri) (if provided).

#### Inherited from

`vscode.TreeItem.iconPath`

***

### id?

> `optional` **id?**: `string`

Defined in: node\_modules/@types/vscode/index.d.ts:12316

Optional id for the tree item that has to be unique across tree. The id is used to preserve the selection and expansion state of the tree item.

If not provided, an id is generated using the tree item's label. **Note** that when labels change, ids will change and that selection and expansion state cannot be kept stable anymore.

#### Inherited from

`vscode.TreeItem.id`

***

### label?

> `optional` **label?**: `string` \| `TreeItemLabel`

Defined in: node\_modules/@types/vscode/index.d.ts:12309

A human-readable string describing this item. When `falsy`, it is derived from [resourceUri](treeObjects.Class.FileWithTodo.md#resourceuri).

#### Inherited from

`vscode.TreeItem.label`

***

### lineNumber

> `readonly` **lineNumber**: `number`

Defined in: [src/treeObjects.ts:31](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L31)

1-based number of the line

***

### relPath

> `readonly` **relPath**: `string`

Defined in: [src/treeObjects.ts:30](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L30)

Path of the file relative to the project's root

***

### resourceUri?

> `optional` **resourceUri?**: `Uri`

Defined in: node\_modules/@types/vscode/index.d.ts:12340

A Uri representing the resource associated with this item.

When set, this property is used to automatically derive several item properties if they are not explicitly provided:
- **Label**: Derived from the resource's file name when TreeItem.label label is not provided.
- **Description**: Derived from the resource's path when TreeItem.description description is set to `true`.
- **Icon**: Derived from the current file icon theme when TreeItem.iconPath iconPath is set to
  ThemeIcon.File or ThemeIcon.Folder.

#### Inherited from

`vscode.TreeItem.resourceUri`

***

### tooltip?

> `optional` **tooltip?**: `string` \| `MarkdownString`

Defined in: node\_modules/@types/vscode/index.d.ts:12345

The tooltip text when you hover over this item.

#### Inherited from

`vscode.TreeItem.tooltip`
