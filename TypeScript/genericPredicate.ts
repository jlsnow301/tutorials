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

type DogProps = keyof typeof newDog;
type CatProps = keyof typeof newCat;

const isType = <T, K extends keyof T>(data: T, keys: K[]): data is T => {
  return keys.every((key) => key in data);
};

console.log(isType(newDog, Object.keys(newDog) as DogProps[]));
console.log(isType(newCat, Object.keys(newCat) as CatProps[]));
