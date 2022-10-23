const items = new Map([
    ['a', 1,],
    ['b', 2,],
]);

for(const [key, value,] of items) {
    console.log(key, value);
}