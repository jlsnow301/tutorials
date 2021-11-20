interface SomeObjType {
  name: string;
  job: string;
  age: string;
}

interface ConvertObjType {
  key: string;
  value: string;
}

const someObj: SomeObjType = {
  name: "John",
  job: "developer",
  age: "thirty",
};

const convertedList: ConvertObjType[] = Object.keys(someObj).map((key) => {
  return { key, value: someObj[key as keyof SomeObjType] }; // key as keyof SomeObjType
});

console.log(convertedList);
