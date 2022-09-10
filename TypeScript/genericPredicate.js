var newCat = {
    yawns: true,
    meows: true
};
var newDog = {
    barks: 100,
    wagsTail: true
};
var Kitty = {
    yawns: true,
    meows: false
};
/**
 * ## hasKeys
 *
 * This function takes two items and compares keys.
 *
 * The first and second items must have identical keys.
 *
 * Originally built for json schema comparison.
 * @param {object[] | object} obj The item to check
 * @param {object[] | object} type A similar object or array of objects
 * @returns {boolean} Returns true if the keys match
 * @example
 * ```typescript
 * const cat = {
 *  meows: true,
 * };
 * const dog = {
 *  barks: true,
 * };
 * hasKeys(cat, dog); // false
 * hasKeys(cat, cat); // true
 * ```
 */
var hasKeys = function (obj, type) {
    return obj instanceof Array && type instanceof Array
        ? obj.every(function (item, index) { return hasKeys(item, type[index]); })
        : Object.keys(type).every(function (key) { return key in obj; });
};
console.log(hasKeys(newCat, Kitty));
