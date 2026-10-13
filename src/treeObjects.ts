import * as vscode from "vscode"

export class FileWithTodo extends vscode.TreeItem {
    constructor(
        public readonly relPath: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(relPath, collapsibleState)
        this.iconPath = new vscode.ThemeIcon("file-code")
    }
}

export class TodoComment extends vscode.TreeItem {
    constructor(
        public readonly relPath: string,
        public readonly lineNumber: number,
        public readonly commentText: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(commentText.substring(0, 80), collapsibleState)
        this.description = `Line ${this.lineNumber}`

        this.command = {
            command: "todo-manager.openFileAtLine",
            title: "Go to",
            arguments: [relPath, lineNumber]
        }
    }
}
