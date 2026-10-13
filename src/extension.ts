import * as vscode from "vscode"
import * as fs from "fs"
import * as readline from "readline"
import path from "path"

const singleLineCommentPrefixes: Record<string, string> = {
    // C-подобные
    '.c': '//',
    '.h': '//',
    '.cpp': '//',
    '.hpp': '//',
    '.cc': '//',
    '.cs': '//',
    '.java': '//',
    '.kt': '//',
    '.kts': '//',
    '.scala': '//',
    '.go': '//',
    '.rs': '//',
    '.swift': '//',
    '.dart': '//',
    '.zig': '//',
    '.sol': '//',
    '.groovy': '//',
    '.gradle': '//',
    '.v': '//',
    '.sv': '//',
    '.proto': '//',
    '.gleam': '//',

    // JavaScript / TypeScript
    '.js': '//',
    '.jsx': '//',
    '.mjs': '//',
    '.cjs': '//',
    '.ts': '//',
    '.tsx': '//',
    '.mts': '//',
    '.cts': '//',
    '.vue': '//',
    '.svelte': '//',

    // Python и скрипты с #
    '.py': '#',
    '.pyw': '#',
    '.rb': '#',
    '.pl': '#',
    '.pm': '#',
    '.r': '#',
    '.jl': '#',
    '.sh': '#',
    '.bash': '#',
    '.zsh': '#',
    '.fish': '#',
    '.ps1': '#',
    '.psm1': '#',
    '.php': '//',
    '.coffee': '#',
    '.cr': '#',
    '.ex': '#',
    '.exs': '#',
    '.nim': '#',
    '.tcl': '#',
    '.nix': '#',
    '.tf': '#',
    '.hcl': '#',
    '.graphql': '#',
    '.gql': '#',
    '.yaml': '#',
    '.yml': '#',
    '.toml': '#',
    '.conf': '#',
    '.ini': ';',
    '.dockerfile': '#',
    '.mk': '#',
    '.cmake': '#',
    '.env': '#',

    // Lisp-подобные
    '.lisp': ';',
    '.cl': ';',
    '.el': ';',
    '.clj': ';',
    '.cljs': ';',
    '.scm': ';',
    '.rkt': ';',

    // SQL, Haskell и т.п.
    '.sql': '--',
    '.hs': '--',
    '.lhs': '--',
    '.lua': '--',
    '.elm': '--',
    '.purs': '--',
    '.ada': '--',
    '.adb': '--',
    '.ads': '--',
    '.vhd': '--',
    '.vhdl': '--',

    // Матричные / научные
    '.m': '%',
    '.tex': '%',
    '.sty': '%',
    '.pro': '%',
    '.erl': '%',
    '.hrl': '%',

    // Ассемблер
    '.asm': ';',
    '.s': ';',

    // Остальные
    '.f90': '!',
    '.f95': '!',
    '.f': '!',
    '.for': '!',
    '.vb': "'",
    '.bas': "'",
    '.bat': 'REM',
    '.cmd': 'REM',
    '.vim': '"',
    '.erb': '#',
    '.pas': '//',
    '.dpr': '//',
    '.f#': '//',
    '.fs': '//',
    '.fsx': '//',
    '.fsi': '//',
    '.res': '//',
};

function getCommentPrefix(filename: string): string | undefined {
    for (const ext of Object.keys(singleLineCommentPrefixes)) {
        if (filename.toLowerCase().endsWith(ext)) {
            return singleLineCommentPrefixes[ext]
        }
    }
    return undefined
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class FileWithTodo extends vscode.TreeItem {
    constructor(
        public readonly relPath: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(relPath, collapsibleState)
    }
}

class TodoComment extends vscode.TreeItem {
    constructor(
        public readonly commentText: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(commentText.substring(0, 80), collapsibleState)
    }
}

export class TodoTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire()
    }

    private todoComments: Record<string, TodoComment[]> = {}
    private todoFiles: Record<string, FileWithTodo> = {}

    private async getLinesWithTodo(path: any): Promise<TodoComment[]> {
        const reader = readline.createInterface({
            input: fs.createReadStream(path, "utf-8"),
            crlfDelay: Infinity
        })

        const commentPrefix = getCommentPrefix(path)
        if (commentPrefix === undefined) {
            return []
        }

        const re = new RegExp(`${escapeRegExp(commentPrefix)} ?TODO: (.+)$`)

        const todos: TodoComment[] = []
        let lineNumber = 0
        for await (const line of reader) {
            ++lineNumber

            const match = line.match(re)
            if (match === null) {
                continue
            }
            todos.push(new TodoComment(match[1], vscode.TreeItemCollapsibleState.None))
        }
        return todos
    }

    getChildren(element?: FileWithTodo | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        const openedFolders = vscode.workspace.workspaceFolders
        if (openedFolders === undefined || openedFolders.length != 1) {
            return []
        }

        if (element === undefined) {
            return vscode.workspace.findFiles("**/*").then(async (uris) => {
                const files = await Promise.all(uris.map(async (uri) => {
                    const filename = vscode.workspace.asRelativePath(uri)

                    const file = new FileWithTodo(filename, vscode.TreeItemCollapsibleState.Collapsed)
                    const todoComments = await this.getLinesWithTodo(path.join(openedFolders[0].uri.fsPath, file.relPath))

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

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element
    }
}

export async function activate(context: vscode.ExtensionContext) {
    const exampleDataProvider = new TodoTreeDataProvider()
    vscode.window.createTreeView("todo-list", {
        treeDataProvider: exampleDataProvider
    })
    vscode.commands.registerCommand("todo-manager.refresh", () => exampleDataProvider.refresh())
}