import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    const command = vscode.commands.registerCommand("hello.world", async () => {
        vscode.window.showInformationMessage("Hello world")
    })

    context.subscriptions.push(command)
}