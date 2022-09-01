var someObj = {
    name: "John",
    job: "developer",
    age: "thirty"
};
var convertedList = Object.keys(someObj).map(function (key) {
    return { key: key, value: someObj[key] }; // key as keyof SomeObjType
});
console.log(convertedList);
var coder = "jerm";
console.log(!coder);
console.log(!!!coder);
if (!!!coder) {
    console.log("coder is defined");
}
