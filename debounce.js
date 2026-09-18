"use strict";

// implement debounce

/*
Debounce:  it runs only after wait milliseconds have elapsed since the debounced function was last called.
*/
function debounce(func, wait) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
}

// Test
const search = function (text) {
  console.log("Mingyue: " + text);
};

const debounceSearch = debounce(search, 500);
debounceSearch("I'm here.");
debounceSearch("Where are you?");
debounceSearch("See you.");
