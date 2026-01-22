import { redLog } from "./helper-log";

const now = Date.now();
let uuid = 0;
const gids = [] as string[];
/**
 * 生成 uuid
 */
export function generateUuid() {
    const id = '_' + (now + (uuid++)).toString(16);
    if (gids.indexOf(id) > -1) {
        redLog('uuid生成错误, 尝试重新生成...');
        return generateUuid();
    }
    gids.push(id);
    return id;
}