// create a function that implements filter() functionality in JS
Array.prototype.myFilter = function (callbackFn, thisArg) {
  const result = [];
  // this refers to the array which calls myFilter
  for (let i = 0; i < this.length; i++) {
    // empty values are ignored
    if (i in this) {
      // pass value, index, array (which is what filter() does)
      if (callbackFn.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};

const test_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(test_array.myFilter((val) => val % 3 === 2));
