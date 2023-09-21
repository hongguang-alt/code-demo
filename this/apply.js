Function.prototype.selfApplay = function (context, args) {
  if (typeof context !== "object") context = new Object(context);
  context = context || window;
  const fnKey = Symbol();
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};
