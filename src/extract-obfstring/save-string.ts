import generate from "@babel/generator";
import { VariableDeclarator } from "@babel/types"
import { generateUuid } from "../helper-uuid";
import { dirname, resolve } from "path";
import { writeFileSync } from "fs";
import { greenLog } from "../helper-log";

export function saveStringArray (strArrayDeclar: VariableDeclarator, input: string) {
    const declarCode = generate(strArrayDeclar.init!, { minified: true }).code;
    const fileName = generateUuid();
    const declarName = `window.${fileName}`;
    const output = resolve(dirname(input), `${fileName}.js`);
    writeFileSync(output, `${declarName}=${declarCode}`, 'utf-8');
    greenLog(`StringArray文件生成完成: ${output}`);
    return fileName;
}