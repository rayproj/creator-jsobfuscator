const $cache = Object.create(null);
// @ts-ignore
window._loadBundleJs = function (dir: string, js: string) {
    if ($cache[dir]) {
        return true;
    }
    require("./" + dir + "/index.js");
    $cache[dir] = true;
    return true;
}