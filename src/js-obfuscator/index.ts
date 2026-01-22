import { obfuscate } from "javascript-obfuscator";
import { blueLog } from "../helper-log";
import { startProgressBar } from "../helper-progress";
import { resolve } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { traverseDirectory } from "../helper-fs";
import { argv } from "process";
import { creatorOptions } from "./option-creator-v3";

const dirs = [
    'assets',
    'src/bundle-scripts',
    'subpackages',
];

const includeFiles = [
    'index.js', 'game.js'
];

const options = creatorOptions;

export default function jsobf(rootDir: string) {
    return new Promise<void>((res, rej) => {
        blueLog(`开始任务: [js-obfuscator]`);
    
        for (let g = 0, h = dirs.length; g < h; g++) {
            const dir0 = resolve(rootDir, dirs[g]);
            if (existsSync(dir0)) {
                traverseDirectory(dir0, (filePath, dirPath, fileName) => {
                    if (includeFiles.indexOf(fileName) > -1) {
                        const code = readFileSync(filePath, 'utf-8');
                        const obfResult = obfuscate(code, options);
                        const obfCode = obfResult.getObfuscatedCode();
                        const obfSourceMap = obfResult.getSourceMap();
    
                        writeFileSync(filePath, obfCode);
                        obfSourceMap && writeFileSync(filePath + '.map', obfSourceMap);
                    }
                })
            }
        }
    
        blueLog(`完成任务: [js-obfuscator]`);

        res();
    })
}

const rootDir = argv[2];
const isEntry = argv[3] === 'jsobf';
if (rootDir && isEntry) {
    jsobf(rootDir);
}
