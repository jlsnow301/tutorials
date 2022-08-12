class Something {
  a = 1;
  b = 2;
  events = externalEvents(this);
}

const externalFunction = function (this) {
  console.log(this.a);
};

const externalEvents = (parent) => {
  return {
    internalFunction: externalFunction.bind(parent),
  };
};

const something = new Something();

something.events.internalFunction();
