import * as vscode from "vscode"
import * as path from "path"
import { FileWithTodo, TodoComment } from "./treeObjects"
import { getLinesWithTodo } from "./fileTools"

/**
 * Processes the list of search exclusions set in settings
 * 
 * @returns `string` with exclusions for vscode api or `undefined` if they aren't set
 */
function buildExcludePattern(): string | undefined {
    const config = vscode.workspace.getConfiguration("todo-manager")
    const patterns = config.get<string[]>('excludePatterns', [])

    if (patterns.length === 0) {
        return undefined;
    }
    return `{${patterns.join(',')}}`;
}
/**
 * The class that provides data about the extension's tree view.
 */
export class TodoTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire()
    }

    /**
     * filename -> comment[]
     */
    private todoComments: Record<string, TodoComment[]> = {}
    /**
     * filename -> TreeItem of this file
     */
    private todoFiles: Record<string, FileWithTodo> = {}

    /**
     * Method providing children of the given TreeItem or top-level items for vscode api
     * 
     * @param element Parent FileWithTodo for TodoComments or undefined when providing the list of files
     * @returns List of files or comments
     */
    getChildren(element?: FileWithTodo | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        const openedFolders = vscode.workspace.workspaceFolders
        if (openedFolders === undefined || openedFolders.length != 1) {
            return []
        }

        if (element === undefined) {
            return vscode.workspace.findFiles("**/*", buildExcludePattern()).then(async (uris) => {
                const files = await Promise.all(uris.map(async (uri) => {
                    const filename = vscode.workspace.asRelativePath(uri)

                    const file = new FileWithTodo(filename, vscode.TreeItemCollapsibleState.Collapsed)
                    const todoComments = await getLinesWithTodo(path.join(openedFolders[0].uri.fsPath, file.relPath))

                    if (todoComments.length === 0) {
                        return null
                    }
                    this.todoComments[filename] = todoComments
                    this.todoFiles[filename] = file
                    return file

                }))
                return files.filter((val) => val !== null)
            })
        }

        if (element instanceof FileWithTodo) {
            for (const [filename, todoLines] of Object.entries(this.todoComments)) {
                if (element.relPath === filename) {
                    return todoLines
                }
            }
            return []
        }
    }

    /**
     * Generic method to implement the interface
     * 
     * @param element Some vscode.TreeItem
     * @returns vscode.TreeItem itself
     */
    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element
    }
}

/**
 * Function that activates the extension
 */
export async function activate(_: vscode.ExtensionContext) {
    const exampleDataProvider = new TodoTreeDataProvider()
    vscode.window.createTreeView("todo-list", {
        treeDataProvider: exampleDataProvider
    })
    vscode.commands.registerCommand("todo-manager.refresh", () => exampleDataProvider.refresh())
    vscode.commands.registerCommand(
        "todo-manager.openFileAtLine",
        async (relPath: string, lineNumber: number) => {
            const editor = await vscode.window.showTextDocument(
                await vscode.workspace.openTextDocument(vscode.Uri.file(relPath)),
                { preview: true }
            )

            const pos = new vscode.Position(lineNumber - 1, 0)
            editor.selection = new vscode.Selection(pos, pos)
            editor.revealRange(
                new vscode.Range(pos, pos),
                vscode.TextEditorRevealType.InCenter
            )
        }
    )
}