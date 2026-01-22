import { argv } from "process";
import merge from "./merge-bundle/index";
import jsobf from "./js-obfuscator";
import extstr from "./extract-obfstring";
import { blueLog, redLog } from "./helper-log";

async function main() {
    const rootDir = argv[2];
    if (rootDir) {
        blueLog(`obf pipeline start...`);
        await merge(rootDir);
        await jsobf(rootDir);
        await extstr(rootDir);
        blueLog(`obf pipeline complete...`);
    } else {
        redLog('无效的根目录...');
    }
}

main();