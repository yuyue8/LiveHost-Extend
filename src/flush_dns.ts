import { OutputChannel } from './outputChannel';
import { exec } from 'child_process';
import { decode } from 'iconv-lite';

export class FlushDns {
    static async start() {
        try {
            const command = 'ipconfig /flushdns'; // 这里可以替换为你需要执行的CMD命令
            const output = await executeCommand(command);

            OutputChannel.appendLine(decode(output as Buffer, 'cp936'));
        } catch (error) {
            OutputChannel.appendLine(error.message);
        }
    }
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { encoding: "buffer" }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}