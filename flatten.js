// write a function to flatten an array
function flatten(value) {
  const flattened_array = [];
  for (const val of value) {
    if (Array.isArray(val)) {
      flattened_array.push(...flatten(val));
    } else {
      flattened_array.push(val);
    }
  }
  return flattened_array;
}

const test_array = [1, 2, [3, 4], [[5]]];
console.log(flatten(test_array));
