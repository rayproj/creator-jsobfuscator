import traverse from "@babel/traverse";
import { Identifier, Node, StringLiteral } from "@babel/types";

/**
 * 收集 chunk 相关节点
 */
export function collectChunkNode(
    ast: Node,
    registerChunks: Map<string, StringLiteral>,
    dependChunks: StringLiteral[]
) {
    traverse(ast, {
        CallExpression(path) {
            const { callee, arguments: args } = path.node;

            // 收集注册
            if (
                callee.type === 'MemberExpression' &&
                (callee.object as Identifier).name === 'System' &&
                (callee.property as Identifier).name === 'register' &&
                args.length === 3 &&
                args[0].type === 'StringLiteral' &&
                args[1].type === 'ArrayExpression'
            ) {
                const firstNode = args[0];
                const regName = firstNode.value;
                regName && registerChunks.set(regName, firstNode);

                // 收集依赖
                const { elements } = args[1];
                for (let g = 0, h = elements.length; g < h; g++) {
                    const node0 = elements[g];
                    if (node0 && node0.type === 'StringLiteral') {
                        dependChunks.push(node0);
                    }
                }
            }

            // 收集依赖
            if (
                callee.type === 'Identifier' &&
                callee.name === 'r' &&
                args.length === 2 &&
                args[0].type === 'StringLiteral' &&
                args[1].type === 'StringLiteral' &&
                args[0].value.indexOf('virtual:///prerequisite-imports/') > -1
            ) {
                dependChunks.push(args[1]);
            }
        }
    })
}