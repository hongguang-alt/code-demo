const { debounce } = require("./debounce");
const { throttle1, throttle } = require("./throttle");
const debounceFn = debounce(() => {
  console.log(111);
}, 500);

const throttleFn = throttle(() => {
  console.log("throttle");
}, 200);

const throttleFn1 = throttle1(() => {
  console.log("throttle1");
}, 200);

let index = 1;
let timer = setInterval(() => {
  if (index > 5) {
    clearInterval(timer);
    return;
  }
  index++;
  console.log("触发");
  debounceFn();
}, 100);

let a = 1;
let timer1 = setInterval(() => {
  if (a > 10) {
    clearInterval(timer1);
    return;
  }
  a++;
  console.log("触发");
  throttleFn();
  throttleFn1();
}, 50);
