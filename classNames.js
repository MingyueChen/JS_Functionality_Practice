// classNames combine all the truth values with an empty string in between
// It accepts string, number, object, and array
function classNames(...args) {
  const result = [];

  function process(arg) {
    // falsy value
    if (!arg) return;

    // string or number value
    if (typeof arg === "string" || typeof arg === "number") {
      result.push(arg);
      return;
    }

    // array value
    if (Array.isArray(arg)) {
      // process each value in the array
      arg.forEach(process);
      return;
    }

    // object value
    if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) {
          result.push(key);
        }
      }
      return;
    }
  } // end of process()

  args.forEach(process);
  return result.join(" ");
}

// result: 'root child active 2'
console.log(
  classNames("root", ["child", [{ active: true, hidden: false }], 2], null),
);
