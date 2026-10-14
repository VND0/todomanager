import * as vscode from "vscode"

/**
 * Class representing the file with TODO comments in the extension's tree view
 */
export class FileWithTodo extends vscode.TreeItem {
    /**
     * @param relPath Path of the file relative to the project's root
     * @param collapsibleState Expected vscode.TreeItemCollapsibleState.Collapsed, required to implement interface of vscode api 
     */
    constructor(
        public readonly relPath: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(relPath, collapsibleState)
        this.iconPath = new vscode.ThemeIcon("file-code")
    }
}
/**
 * Class representing the TODO comment in the extension's tree view
 */
export class TodoComment extends vscode.TreeItem {
    /**
     * @param relPath Path of the file relative to the project's root
     * @param lineNumber 1-based number of the line
     * @param commentText More than 80 chars will be dropped
     * @param collapsibleState Expected vscode.TreeItemCollapsibleState.None, required to implement interface of vscode api 
     */
    constructor(
        public readonly relPath: string,
        public readonly lineNumber: number,
        public readonly commentText: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        let textToShow
        if (commentText.length > 80) {
            textToShow = commentText.substring(0, 77) + "..."
        } else {
            textToShow = commentText
        }
        super(textToShow, collapsibleState)
        this.description = `Line ${this.lineNumber}`

        this.command = {
            command: "todo-manager.openFileAtLine",
            title: "Go to",
            arguments: [relPath, lineNumber]
        }
    }
}
