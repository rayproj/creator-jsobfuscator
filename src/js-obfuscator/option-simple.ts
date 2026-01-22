import { ObfuscatorOptions } from "javascript-obfuscator";

/**
 * 最简 js 混淆配置 for test
 */
export const simpleOptions: ObfuscatorOptions = {
    optionsPreset: 'low-obfuscation',
    compact: false,
    disableConsoleOutput: false,
    selfDefending: false,
    stringArray: false,
    log: true,
}