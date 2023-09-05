// 自己实现一个call方法，本质其实是使用对象的属性来调用函数，这时候this指向的就是对象
Function.prototype.selfCall = function (context, ...args) {
  // 包装
  if (typeof context !== "objext") context = new Object(context);
  // 声明当前的上下文
  context = context || window;
  const fnKey = Symbol();
  // 修改this指向
  context[fnKey] = this;
  // 执行函数
  const result = context[fnKey](...args);
  // 删除对应的属性
  delete context[fnKey];
  return result;
};
