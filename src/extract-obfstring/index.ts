import { argv } from "process";
import { blueLog, yellowLog } from "../helper-log";
import { startProgressBar } from "../helper-progress";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { traverseDirectory } from "../helper-fs";
import { parse } from "@babel/parser";
import { extractStringArray } from "./extract-string";
import { saveStringArray } from "./save-string";
import { replaceSave } from "./replace-save";

const dirs = [
    'assets',
    'src/bundle-scripts',
    'subpackages',
];

const includeFiles = [
    'index.js', 'game.js'
];

export default function extstr(rootDir: string) {
    return new Promise<void>((res, rej) => {
        blueLog(`开始任务: [extract-obfstring]`);

        yellowLog(`开始收集 StringArray ...`);
        for (let g = 0, h = dirs.length; g < h; g++) {
            const dir0 = resolve(rootDir, dirs[g]);
            if (existsSync(dir0)) {
                traverseDirectory(dir0, (filePath, dirPath, fileName) => {
                    if (includeFiles.indexOf(fileName) > -1) {
                        const code = readFileSync(filePath, 'utf-8');
                        const ast = parse(code, { sourceType: 'module' });
                        const declar = extractStringArray(ast);
                        if (declar) {
                            // 保存 StringArray
                            const declarName = saveStringArray(declar, filePath);
                            // 替换 保存 源文件
                            replaceSave(declar, declarName, filePath, ast);
                        }
                    }
                })
            }
        }
        yellowLog(`收集完成...`);

        blueLog(`完成任务: [extract-obfstring]`);

        res();
    })
}

const rootDir = argv[2];
const isEntry = argv[3] === 'extstr';
if (rootDir && isEntry) {
    extstr(rootDir);
}
