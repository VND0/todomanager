import * as vscode from 'vscode'

export class ExampleTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire()
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        vscode.window.showInformationMessage("Got children")

        const openedFolders = vscode.workspace.workspaceFolders
        if (openedFolders === undefined || openedFolders.length != 1) {
            return []
        }

        return [new vscode.TreeItem("Hello world", vscode.TreeItemCollapsibleState.None)]
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element
    }
}

export function activate(context: vscode.ExtensionContext) {
    const exampleDataProvider = new ExampleTreeDataProvider()
    vscode.window.createTreeView("todo-list", {
        treeDataProvider: exampleDataProvider
    })
    vscode.commands.registerCommand("todo-manager.refresh", () => exampleDataProvider.refresh())
}