import * as vscode from "vscode"
import * as fs from "fs"
import * as readline from "readline"
import { TodoComment } from "./treeObjects"

/**
 * Hardcoded list matching `language -> comment prefix`
 */
const singleLineCommentPrefixes: Record<string, string> = {
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

    '.lisp': ';',
    '.cl': ';',
    '.el': ';',
    '.clj': ';',
    '.cljs': ';',
    '.scm': ';',
    '.rkt': ';',

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

    '.m': '%',
    '.tex': '%',
    '.sty': '%',
    '.pro': '%',
    '.erl': '%',
    '.hrl': '%',

    '.asm': ';',
    '.s': ';',

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

/**
 * 
 * @param filename String used to extract the extension
 * @returns Comment prefix of `undefined` if the language is not recognized
 */
function getCommentPrefix(filename: string): string | undefined {
    for (const ext of Object.keys(singleLineCommentPrefixes)) {
        if (filename.toLowerCase().endsWith(ext)) {
            return singleLineCommentPrefixes[ext]
        }
    }
    return undefined
}

/**
 * Inserts '\' before any char which is a keyword in the syntax of regular expressions
 * 
 * @param s Raw string
 * @returns String which is safe to be substituted to a regexp
 */
function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Reads file and finds all TODO comments
 * 
 * @param path 
 * @returns An array with comments as tree objects
 */
export async function getLinesWithTodo(path: any): Promise<TodoComment[]> {
    const reader = readline.createInterface({
        input: fs.createReadStream(path, "utf-8"),
        crlfDelay: Infinity
    })

    const commentPrefix = getCommentPrefix(path)
    if (commentPrefix === undefined) {
        return []
    }

    const re = new RegExp(`${escapeRegExp(commentPrefix)} ?TODO: ?.+$`)

    const todos: TodoComment[] = []
    let lineNumber = 0
    for await (const line of reader) {
        ++lineNumber

        const match = line.match(re)
        if (match === null) {
            continue
        }
        todos.push(new TodoComment(path, lineNumber, match[0], vscode.TreeItemCollapsibleState.None))
    }
    return todos
}