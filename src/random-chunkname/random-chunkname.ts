import { StringLiteral } from "@babel/types";
import { getRegisterChunkName } from "./helper-chunkname";
import { generateUuid } from "../helper-uuid";

/**
 * 重新生成注册的 chunk 名，并更新依赖
 */
export function randomChunkName(
    registerChunks: Map<string, StringLiteral>,
    dependChunks: StringLiteral[]
) {
    for (let g = 0, h = dependChunks.length; g < h; g++) {
        const dependNode0 = dependChunks[g];
        const dependValue = dependNode0.value;
        let registerNode0 = registerChunks.get(dependValue);
        if (!registerNode0) {
            registerNode0 = registerChunks.get(getRegisterChunkName(dependValue));
        }
        if (!registerNode0) continue;

        // @ts-ignore
        let registerChunkName = registerNode0['genName'] as string;
        if (!registerChunkName) {
            registerNode0.value = generateUuid();
            // @ts-ignore
            registerChunkName = registerNode0['genName'] = registerNode0.value;
        }
        dependNode0.value = registerChunkName;
    }
}