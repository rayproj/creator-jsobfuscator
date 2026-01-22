import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { minify } from "uglify-js";

/**
 * adapter
 */
export function adapteJS(rootDir: string) {
    const helper = resolve(rootDir, 'sdk-helper.js');
    let code = readFileSync(helper, 'utf-8');
    code += '\n';
    let adapteCode = readFileSync(resolve(__dirname, 'adapter.js'), 'utf-8');
    adapteCode = adapteCode.replace(`"use strict";`, '');
    code += minify(adapteCode).code;
    writeFileSync(helper, code, 'utf-8');
}