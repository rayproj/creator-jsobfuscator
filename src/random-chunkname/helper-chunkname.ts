const registerNameCache = Object.create(null);

/**
 * 换算 依赖名 为 注册名
 */
export function getRegisterChunkName(depend: string) {
    let rname = registerNameCache[depend];
    if (rname) {
        return rname;
    } else {
        registerNameCache[depend] = rname = depend.replace('./', 'chunks:///_virtual/');
        return rname;
    }
}