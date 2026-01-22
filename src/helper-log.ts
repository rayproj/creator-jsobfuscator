function getTime() {
    return `\x1b[32m${new Date().toLocaleString()}\x1b[0m`;
}

export function redLog(str: string, time = true) {
    console.log(time ? `${getTime()}:` : '', '\x1b[31m' + str + '\x1b[0m' + '\n');
}

export function greenLog(str: string, time = true) {
    console.log(time ? `${getTime()}:` : '', '\x1b[32m' + str + '\x1b[0m' + '\n');
}

export function yellowLog(str: string, time = true) {
    console.log(time ? `${getTime()}:` : '', '\x1b[33m' + str + '\x1b[0m' + '\n');
}

export function blueLog(str: string, time = true) {
    console.log(time ? `${getTime()}:` : '', '\x1b[94m' + str + '\x1b[0m' + '\n');
}