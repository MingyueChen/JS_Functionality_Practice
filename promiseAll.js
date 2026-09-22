// write a promiseAll function that takes an array of promises,
// return an array of fulfilled value
// once there is an error from any promise, reject
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    const result = [];
    let completed = 0;
    // empty input results []
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          completed++;
          // all the values are fulfilled, return the resolved result
          if (completed === promises.length) {
            resolve(result);
          }
        })
        // an error happened, reject
        .catch((err) => {
          reject(err);
        });
    });
  });
}

/**
 * Promise.resolve(promise) can keep the original state of the promise. If the promise parameter is rejected, Promise.resolve() will also reject it.
 */

//Resolved example.
async function testResolve() {
  const p0 = Promise.resolve(3);
  const p1 = 42;
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 100);
  });

  const testResult_1 = await promiseAll([p0, p1, p2]); // [3, 42, 'foo']
  console.log(testResult_1);
}
testResolve();

// Rejection example.
async function testReject() {
  const p0 = Promise.resolve(30);
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("An error occurred!");
    }, 100);
  });

  try {
    await promiseAll([p0, p1]);
  } catch (err) {
    console.log(err); // 'An error occurred!'
  }
}
testReject();
