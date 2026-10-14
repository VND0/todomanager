[**todo-manager**](README.md)

***

[todo-manager](README.md) / [extension](extension.md) / TodoTreeDataProvider

# Class: TodoTreeDataProvider

Defined in: [src/extension.ts:23](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/extension.ts#L23)

The class that provides data about the extension's tree view.

## Implements

- `TreeDataProvider`\<`vscode.TreeItem`\>

## Properties

### onDidChangeTreeData

> `readonly` **onDidChangeTreeData**: `Event`\<`void` \| `TreeItem` \| `null` \| `undefined`\>

Defined in: [src/extension.ts:25](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/extension.ts#L25)

An optional event to signal that an element or root has changed.
This will trigger the view to update the changed element/root and its children recursively (if shown).
To signal that root has changed, do not pass any argument or pass `undefined` or `null`.

#### Implementation of

`vscode.TreeDataProvider.onDidChangeTreeData`

## Methods

### getChildren()

> **getChildren**(`element?`): `ProviderResult`\<`TreeItem`[]\>

Defined in: [src/extension.ts:46](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/extension.ts#L46)

Method providing children of the given TreeItem or top-level items for vscode api

#### Parameters

##### element?

[`FileWithTodo`](treeObjects.Class.FileWithTodo.md)

Parent FileWithTodo for TodoComments or undefined when providing the list of files

#### Returns

`ProviderResult`\<`TreeItem`[]\>

List of files or comments

#### Implementation of

`vscode.TreeDataProvider.getChildren`

***

### getTreeItem()

> **getTreeItem**(`element`): `TreeItem` \| `Thenable`\<`TreeItem`\>

Defined in: [src/extension.ts:88](https://github.com/VND0/todomanager/blob/9f3983125c39a176fad2b4a89aa4ad85af41a106/src/extension.ts#L88)

Generic method to implement the interface

#### Parameters

##### element

`TreeItem`

Some vscode.TreeItem

#### Returns

`TreeItem` \| `Thenable`\<`TreeItem`\>

vscode.TreeItem itself

#### Implementation of

`vscode.TreeDataProvider.getTreeItem`
