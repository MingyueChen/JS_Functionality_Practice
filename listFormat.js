function listFormat(items, options = {}) {
  // ignore empty values
  let result = items.filter((item) => item !== "");

  // make item unique
  if (options.unique) {
    result = [...new Set(result)];
  }

  // sort items alphabetically
  if (options.sorted) {
    result.sort();
  }

  // shows proper length
  if (Number.isInteger(options.length) && options.length > 0) {
    const length = options.length;
    if (result.length > length) {
      const displayedValue = result.slice(0, length);
      const restLength = result.length - length;

      const otherStr = restLength > 1 ? "others" : "other";
      const resultStr = `${displayedValue.join(", ")} and ${restLength} ${otherStr}`;
      return resultStr;
    }
  }

  // regular string process
  if (result.length === 0) return "";
  if (result.length === 1) return result[0];
  if (result.length === 2) return `${result[0]} and ${result[1]}`;
  return `${result.slice(0, -1).join(", ")} and ${result.slice(-1)}`;
}

listFormat([]); // ''

listFormat(["Bob"]); // 'Bob'
listFormat(["Bob", "Alice"]); // 'Bob and Alice'

listFormat(["Bob", "Ben", "Tim", "Jane", "John"]);
// 'Bob, Ben, Tim, Jane and John'

listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  length: 3,
}); // 'Bob, Ben, Tim and 2 others'

listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  length: 4,
}); // 'Bob, Ben, Tim, Jane and 1 other'

listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  length: 3,
  sorted: true,
}); // 'Ben, Bob, Jane and 2 others'

listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
  length: 3,
  unique: true,
}); // 'Bob, Ben, Tim and 2 others'

listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
  length: 3,
  unique: true,
}); // 'Bob, Ben, Tim and 2 others'

listFormat(["Bob", "Ben", "", "", "John"]); // 'Bob, Ben and John'
