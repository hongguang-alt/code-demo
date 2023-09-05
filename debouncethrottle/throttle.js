// 节流，一段时间只触发一次

// 事件戳实现，第一次会执行
function throttle(fn, delay) {
  let before = Date.now();
  return function () {
    const args = arguments;
    const now = Date.now();
    if (now - before < delay) return;
    before = now;
    fn.apply(this, args);
  };
}

// 定时器实现，第一次不会执行，在触发之后会最后执行一次
function throttle1(fn, delay) {
  let timer = null;
  return function () {
    const args = arguments;
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

module.exports.throttle1 = throttle1;
module.exports.throttle = throttle;
