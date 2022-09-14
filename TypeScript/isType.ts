/**
 * ## isType
 * Compares two objects to see if they have the same schema.
 *
 * This is an exhaustive check that works recursively on nested items.
 *
 * Arrays must have similar types.
 *
 * Objects must match in key names, and values must be of the same type.
 * @param obj The first object to be checked
 * @param type The second object / prototype to be compared against
 * @param maxDepth By default, this recursively checks to a depth of 5. This can be changed by passing in a different value.
 * @param depth Don't pass this in. This is used internally to track the depth of the recursion.
 * @returns boolean
 * @example plain JS objects
 * ```js
 * const obj1 = { name: "John" };
 * const obj2 = { name: "Jerm" };
 * const obj3 = { name: 3 };
 * const obj4 = { age: 34 };
 * isType(obj1, obj2); // true - same key names and value types
 * isType(obj1, obj3); // false - same key names but different value types
 * isType(obj1, obj4); // false - different key names and value types
 * isType(obj3, obj4); // false - different key names
 * ```
 * @example nested objects
 * ```js
 * const obj5 = { first: { a: 1, b: 2 } };
 * const obj6 = { first: { a: "invalid", b: 4 } };
 * const obj7 = { first: { a: "test", b: 4 } };
 * isType(obj5, obj6); // false - nested object values are different types
 * isType(obj6, obj7); // true - nested object key names and values are the same type
 * ```
 * @example prototyping objects. Useful if you specify an object type.
 * ```js
 * const obj1 = { name: "John" };
 * isType(obj1, { name: "" }); // true - same key names and value types
 * ```
 */
export const isType = (
  obj: unknown,
  type: unknown,
  maxDepth = 5,
  depth = 0
): boolean => {
  const currentDepth = depth++;
  if (currentDepth > maxDepth) {
    throw new Error("Max depth reached");
  }
  // Object is strictly the same value
  if (obj === type) {
    return true;
  }
  // Primitive type checks
  if (typeof obj !== typeof type) {
    return false;
  }
  // Functions - dangerously check using toString
  if (typeof obj === "function" && typeof type === "function") {
    return obj.toString() === type.toString();
  }
  // Array: Sort through values and compare recursively
  if (obj instanceof Array && type instanceof Array) {
    return (
      obj.length === type.length &&
      obj.every((item, index) => isType(item, type[index], currentDepth))
    );
  }
  // Object: Sort through keys and compare keynames and value types.
  if (obj instanceof Object && type instanceof Object) {
    return (
      Object.keys(obj as Record<string, any>).length ===
        Object.keys(type as Record<string, any>).length &&
      Object.keys(obj as Record<string, any>).every(
        (key) => key in type && isType(obj[key], type[key], currentDepth)
      )
    );
  }
  return true;
};
