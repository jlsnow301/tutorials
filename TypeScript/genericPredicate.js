var newCat = {
    yawns: true,
    meows: true
};
var newDog = {
    barks: 100,
    wagsTail: true
};
var isType = function (data, keys) {
    return keys.every(function (key) { return key in data; });
};
console.log(isType(newDog, Object.keys(newDog)));
console.log(isType(newCat, Object.keys(newCat)));
console.log(isType(newDog, Object.keys(newCat)));
