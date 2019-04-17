// https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
export default function get(object, keys, defaultVal = null) {
    keys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
    object = object[keys[0]];
    if (object && keys.length > 1) {
        return get(object, keys.slice(1), defaultVal);
    }
    return object === undefined ? defaultVal : object;
}