import { extname } from "path";
import { traverseDirectory } from "../helper-fs";
import { readFileSync } from "fs";
import { startProgressBar } from "../helper-progress";

/**
 * 合并目录下所有 js 文件
 */
export function mergeJS(dir: string) {
    const bar = startProgressBar(0);
    let code = '';
    let total = 0;
    traverseDirectory(dir, (filePath, dirPath, fileName) => {
        if (extname(filePath) === '.js') {
            code += readFileSync(filePath, 'utf-8');
            code += '\n';
            bar.setTotal(total);
            bar.update(total);
        }
    })
    bar.stop();
    return code;
}