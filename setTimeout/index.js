/**
 * 通过setTimeout 实现 setInterval
 */
const setInterval = require("./setInterval");

let index = 0;
const { cancel } = setInterval(() => {
  index++;
  console.log(index);
  if (index >= 5) {
    cancel();
  }
}, 1000);
