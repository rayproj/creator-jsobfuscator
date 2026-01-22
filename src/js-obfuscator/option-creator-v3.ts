import { ObfuscatorOptions } from "javascript-obfuscator";

/**
 * jsobfuscator options for creator
 */
export const creatorOptions: ObfuscatorOptions = {
    compact: true,
    simplify: true,
    /** -------------------------------------------------- */
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.01,
    /** -------------------------------------------------- */
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    /** -------------------------------------------------- */
    debugProtection: false,
    debugProtectionInterval: 0,
    /** -------------------------------------------------- */
    disableConsoleOutput: false,
    /** -------------------------------------------------- */
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    /** -------------------------------------------------- */
    identifierNamesGenerator: 'mangled-shuffled',
    renameProperties: false,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    identifierNamesCache: null,
    identifiersDictionary: [],
    renameGlobals: false,
    identifiersPrefix: '',
    /** -------------------------------------------------- */
    numbersToExpressions: false,
    selfDefending: false,
    /** -------------------------------------------------- */
    splitStrings: false,
    splitStringsChunkLength: 10,
    /** -------------------------------------------------- */
    stringArray: true,
    stringArrayEncoding: ['none', 'base64'],
    stringArrayThreshold: 1,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayIndexShift: false,
    stringArrayRotate: false,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 0,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersType: 'variable',
    stringArrayWrappersParametersMaxCount: 2,

    transformObjectKeys: true,
    ignoreImports: false,
    reservedStrings: [],
    forceTransformStrings: [],
    /** -------------------------------------------------- */
    sourceMap: false,
    sourceMapMode: 'separate',
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapSourcesMode: 'sources-content',
    inputFileName: '',
    /** -------------------------------------------------- */
    log: true,
    optionsPreset: 'low-obfuscation',
    seed: 0,
    target: 'browser',
    unicodeEscapeSequence: false,
};