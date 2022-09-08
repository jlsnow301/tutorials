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

const isType = <T, K>(data: T, keys: K[]): data is T => {
  return keys.every((key) => key in data);
};

const Kitty = Object.keys(newCat);
console.log(isType(newCat, Kitty));
