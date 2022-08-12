// Creates a card for each item (key) in the db.
const DisplayKeys = () => {
  var keys = [];
  Object.keys(data).forEach((key) =>
    keys.push(<ComponentName item={data[key]} />)
  );
  return keys;
};

// Dynamically displays MongoDB object attributes
var hiddenKeys = [];
hiddenKeys += "id";

const DisplayDetails = () => {
  var entries = [];
  Object.entries(data.item).map(([key, value]) => {
    if (hiddenKeys.indexOf(key) < 0) {
      entries.push(<b>{key}: </b>, `${value}`, <br />);
    }
  });
  return entries;
};
