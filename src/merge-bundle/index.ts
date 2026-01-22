import { argv } from "process";
import { blueLog, yellowLog } from "../helper-log";
import { mergeJS } from "./merge-js";
import { clearDir } from "../helper-fs";
import { existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { adapteJS } from "./adapte-js";

const dirs = [
    'src/bundle-scripts'
];

export default function merge(rootDir: string) {
    return new Promise<void>((res, rej) => {
        blueLog(`开始任务: [merge-bundle]`);

        yellowLog(`开始合并 JS 文件...`);
        for (let g = 0, h = dirs.length; g < h; g++) {
            const dir0 = resolve(rootDir, dirs[g]);
            if (existsSync(dir0)) {
                const code = mergeJS(dir0);
                clearDir(dir0);
                writeFileSync(resolve(dir0, 'index.js'), code, 'utf-8');
            }
        }
        yellowLog(`合并完成...`);

        yellowLog(`开始增加适配代码块...`);
        adapteJS(rootDir);
        yellowLog(`适配完成...`);

        blueLog(`完成任务: [merge-bundle]`);

        res();
    })
}

const rootDir = argv[2];
const isEntry = argv[3] === 'merge';
if (rootDir && isEntry) {
    merge(rootDir);
}