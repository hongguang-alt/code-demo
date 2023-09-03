// 防抖，表示在一段时间内，只执行最后一次
// 例如：用户输入，只有在用户输入完成后，才会执行

function debounce(fn, delay) {
  let timer = null;
  return function () {
    const args = arguments;
    // 如果有就删除
    if (timer) clearTimeout(timer);
    // 重新设置定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

module.exports.debounce = debounce;
