var newCat = {
    type: "cat",
    yawns: true,
    meows: true
};
var newDog = {
    type: "dog",
    barks: 100,
    wagsTail: true
};
var animals = [newCat, newDog];
function filterCats(animals, type) {
    return animals.filter(function (animal) { return animal.type === type; });
}
var Kitty = {
    yawns: true,
    meows: false
};
console.log(filterCats(animals, "cat"));
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
        ? obj.every(function (o) { return hasKeys(o, type[0]); })
        : Object.keys(type).every(function (key) { return key in obj; });
};
