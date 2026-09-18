// throttle can run at most once every wait milliseconds.
function throttle(func, wait) {
  let lastTime = -Infinity;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      func.call(this, ...args);
    }
  };
}
