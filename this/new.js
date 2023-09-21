// 实现 newFn
// new 做了那些事情
/**
 * 1.创建一个新对象，原型指向当前对象的原型对象 prototype
 * 2.this指向当前对象，执行函数
 * 3.返回对象
 */
function myNew(constructor, ...args) {
  // 第一步
  const newObj = Object.create(constructor.prototype);
  // 第二步
  const res = constructor.apply(newObj, args);
  // 第三步
  return typeof res === "object" ? res : newObj;
}
