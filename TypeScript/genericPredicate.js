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
var Kitty = Object.keys(newCat);
console.log(isType(newCat, Kitty));
