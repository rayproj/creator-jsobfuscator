import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "fs";
import path from "path";

/**
 * 遍历目录
 */
export function traverseDirectory(
    dir: string,
    handler: (filePath: string, dirPath: string, fileName: string) => void
) {
    const files = readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const isDirectory = statSync(filePath).isDirectory();

        if (isDirectory) {
            traverseDirectory(filePath, handler);
        } else {
            handler(filePath, dir, file);
        }
    });
}

/**
 * 清空目录
 */
export function clearDir(folderPath: string) {
    if (existsSync(folderPath)) {
        rmSync(folderPath, { recursive: true });
    }
    mkdirSync(folderPath);
}
