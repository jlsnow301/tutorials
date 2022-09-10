type Animal =
  | {
      yawns: boolean;
      meows: boolean;
    }
  | {
      barks: number;
      wagsTail: boolean;
    };

const newCat = {
  yawns: true,
  meows: true,
};

const newDog = {
  barks: 100,
  wagsTail: true,
};

const Kitty = {
  yawns: true,
  meows: false,
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
const hasKeys = <T extends Array<Record<string, any>> | Record<string, any>>(
  obj: T,
  type: T
): obj is T =>
  obj instanceof Array && type instanceof Array
    ? obj.every((o) => hasKeys(o, type[0]))
    : Object.keys(type).every((key) => key in obj);

console.log(hasKeys(newCat, Kitty));
