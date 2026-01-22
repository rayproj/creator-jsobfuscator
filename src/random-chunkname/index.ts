import { existsSync, readFileSync, writeFileSync } from "fs";
import { argv } from "process";
import path from "path";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { Node, StringLiteral } from "@babel/types";
import { traverseDirectory } from "../helper-fs";
import { collectChunkNode } from "./collect-chunk"
import { randomChunkName } from "./random-chunkname";
import { blueLog, yellowLog } from "../helper-log";
import { startProgressBar } from "../helper-progress";

const registerChunks = new Map<string, StringLiteral>();
const dependChunks: StringLiteral[] = [];

const asts: { ast: Node, code: string, filePath: string }[] = [];

const dirs = [
    'assets',
    'src/chunks',
    'src/bundle-scripts',
    'subpackages',
];

const includeFiles = [
    'index.js', 'game.js', 'bundle.js'
];

export default function randomcn(rootDir: string) {
    return new Promise<void>((res, rej) => {
        blueLog(`开始任务: [random-chunkname]`);

        // 收集
        yellowLog(`开始收集 chunk node...`);
        const collectBar = startProgressBar(dirs.length);
        for (let g = 0, h = dirs.length; g < h; g++) {
            const dir0 = path.resolve(rootDir, dirs[g]);
            if (existsSync(dir0)) {
                traverseDirectory(dir0, (filePath, dirPath, fileName) => {
                    if (includeFiles.indexOf(fileName) > -1) {
                        const code = readFileSync(filePath, 'utf-8');
                        const ast = parse(code, { sourceType: 'module' });
                        asts.push({ ast, code, filePath });
                        collectChunkNode(ast, registerChunks, dependChunks);
                    }
                })
            }
            collectBar.update(g + 1);
        }
        collectBar.stop();
        yellowLog(`收集完成...`);

        // 随机
        yellowLog(`开始随机...`);
        randomChunkName(registerChunks, dependChunks);
        yellowLog(`随机完成...`);

        // 保存
        yellowLog(`开始保存修改的文件...`);
        const bar = startProgressBar(asts.length);
        for (let g = 0, h = asts.length; g < h; g++) {
            const { ast, code, filePath } = asts[g];
            const modifiedCode = generate(ast, { minified: true }, code);
            writeFileSync(filePath, modifiedCode.code, 'utf-8');
            bar.update(g + 1);
        }
        bar.stop();
        yellowLog(`保存完成...`);

        blueLog(`完成任务: [random-chunkname]`);

        res();
    })
}

const rootDir = argv[2];
const isEntry = argv[3] === 'randomcn';
if (rootDir && isEntry) {
    randomcn(rootDir);
}
