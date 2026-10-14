[**todo-manager**](README.md)

***

[todo-manager](README.md) / [treeObjects](treeObjects.md) / FileWithTodo

# Class: FileWithTodo

Defined in: [src/treeObjects.ts:6](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L6)

Class representing the file with TODO comments in the extension's tree view

## Extends

- `TreeItem`

## Constructors

### Constructor

> **new FileWithTodo**(`relPath`, `collapsibleState`): `FileWithTodo`

Defined in: [src/treeObjects.ts:11](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L11)

#### Parameters

##### relPath

`string`

Path of the file relative to the project's root

##### collapsibleState

`TreeItemCollapsibleState`

Expected vscode.TreeItemCollapsibleState.Collapsed, required to implement interface of vscode api

#### Returns

`FileWithTodo`

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

Defined in: [src/treeObjects.ts:13](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L13)

Expected vscode.TreeItemCollapsibleState.Collapsed, required to implement interface of vscode api

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
When `true`, it is derived from [resourceUri](#resourceuri) and when `falsy`, it is not shown.

#### Inherited from

`vscode.TreeItem.description`

***

### iconPath?

> `optional` **iconPath?**: `string` \| `IconPath`

Defined in: node\_modules/@types/vscode/index.d.ts:12323

The icon path or ThemeIcon for the tree item.
When `falsy`, ThemeIcon.Folder Folder Theme Icon is assigned, if item is collapsible otherwise ThemeIcon.File File Theme Icon.
When a file or folder ThemeIcon is specified, icon is derived from the current file icon theme for the specified theme icon using [resourceUri](#resourceuri) (if provided).

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

A human-readable string describing this item. When `falsy`, it is derived from [resourceUri](#resourceuri).

#### Inherited from

`vscode.TreeItem.label`

***

### relPath

> `readonly` **relPath**: `string`

Defined in: [src/treeObjects.ts:12](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/treeObjects.ts#L12)

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
