import generate from "@babel/generator";
import { memberExpression, identifier, VariableDeclarator, Node } from "@babel/types"
import { writeFileSync } from "fs";
import { greenLog } from "../helper-log";

export function replaceSave(
    strArrayDeclar: VariableDeclarator, declarName: string,
    input: string, ast: Node
) {
    strArrayDeclar.init = memberExpression(
        identifier('window'), identifier(declarName)
    );
    const srcCode = generate(ast, { minified: true }).code;
    const code = `require('./${declarName}.js');` + srcCode;
    const output = input;
    writeFileSync(output, code, 'utf-8');
    greenLog(`js文件生成完成: ${output}`);
}