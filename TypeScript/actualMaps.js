const items = new Map([
    ['a', ["one"],],
    ['b', ["two"],],
]);

items.set('c', ['three']);

items.set('c', [...items.get('c'), 'four']);
console.log(items.get('c'));

items.set('c', 
    [...items.get('c')
    .filter(item => item !== 'four'), 
    'five']
    );
console.log(items.get('c'));

// for(const [key, value] of items) {
//     console.log(key, value);
// }

items.forEach((value, key) => {
    console.log(key, value);
});