function setInterval(callback, timer) {
  let timerId = null;
  let isEnd = false;
  function fn() {
    if (isEnd) return;
    callback();
    timerId = setTimeout(fn, timer);
  }
  fn();
  return {
    cancel: () => {
      // 清空定时器，并且不去新建新的定时器
      clearTimeout(timerId);
      isEnd = true;
    },
  };
}

module.exports = setInterval;
