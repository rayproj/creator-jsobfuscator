import traverse from "@babel/traverse";
import { VariableDeclarator, Statement, Node } from "@babel/types";
import { redLog } from "../helper-log";

const checkExpState = function (state: Statement) {
    if (
        state && state.type === 'ExpressionStatement' &&
        state.expression && state.expression.type === 'AssignmentExpression'
    ) {
        const exp = state.expression;
        if (
            exp.operator === '=' &&
            exp.left && exp.left.type === 'Identifier' &&
            exp.right && exp.right.type === 'FunctionExpression'
        ) {
            const right = exp.right;
            if (
                !right.id && !right.generator && !right.async && right.params.length === 0 &&
                right.body.body.length === 1 && right.body.body[0].type === 'ReturnStatement' &&
                right.body.body[0].argument && right.body.body[0].argument.type === 'Identifier'
            ) {
                return true
            }
        }

    }
    return false;
}
const checkRtnState = function (state: Statement) {
    if (
        state && state.type === 'ReturnStatement' &&
        state.argument && state.argument.type === 'CallExpression'
    ) {
        const arg = state.argument;
        if (
            arg.arguments.length === 0 && !arg.optional &&
            arg.callee.type === 'Identifier'
        ) {
            return true;
        }
    }
    return false;
}
const checkVarDeclar = function (state: Statement): VariableDeclarator | false {
    if (
        state && state.type === 'VariableDeclaration' &&
        state.kind === 'var' && state.declarations.length === 1 &&
        state.declarations[0].id.type === 'Identifier' &&
        state.declarations[0].init && state.declarations[0].init.type === 'ArrayExpression'
    ) {
        const elements = state.declarations[0].init.elements;
        if (elements.length >= 5000) {
            return state.declarations[0];
        } else {
            let not = false;
            for (let g = 0; g < elements.length; g++) {
                const element = elements[g];
                if (!element || element.type !== 'StringLiteral') {
                    not = true;
                    break;
                }
            }
            return not ? false : state.declarations[0];
        }
    }
    return false;
}

export function extractStringArray(ast: Node) {
    let strArrayDeclar: VariableDeclarator = null!;
    let error = false;
    traverse(ast, {
        FunctionDeclaration(path) {
            const node = path.node;
            if (
                node.id && !node.generator && !node.async && node.params.length === 0 &&
                node.body.body.length === 3 &&
                checkExpState(node.body.body[1]) &&
                checkRtnState(node.body.body[2])
            ) {
                const declar = checkVarDeclar(node.body.body[0]);
                if (declar) {
                    if (!strArrayDeclar) {
                        strArrayDeclar = declar;
                    } else {
                        error = true;
                        redLog('发现重复的 StringArray , 数据错误...');
                    }
                }
            }
        }
    })
    if (error) {
        return false;
    } else if (!strArrayDeclar) {
        redLog('未检测到匹配的 StringArray ...')
        return false;
    } else if (strArrayDeclar) {
        return strArrayDeclar;
    }
    return false;
}