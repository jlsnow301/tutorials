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
    for (let [key, value] of Object.entries(data.item)) {
      if (hiddenKeys.indexOf(key) >= 0) {
        continue;
      }
      entries.push(<b>{key}: </b>, `${value}`, <br />);
    }
    return entries;
  };