// 第一种，最简单的
function simpleCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 第二种，基础版
function baseCopy(obj) {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 处理对象的情况
      if (typeof obj[key] === "object" && obj[key] !== null) {
        newObj[key] = baseCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

// 第三种，比较详细的深拷贝
/**
 * 1. 针对能够遍历对象的不可枚举以及 Symbol 类型的属性，使用 Reflect.ownKeys 方法
 * 2. 当参数是 Date/RegExp 的时候，直接生成一个实例返回
 * 3. 创建对象的时候，获取之前对象的信息，然后进行创建
 * 4. 使用 weakMap 作为 hash 表，解决循环依赖的问题
 */
function deepCopy(obj, hash = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 解决循环依赖的问题
  if (hash.has(obj)) return hash.get(obj);
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      typeof obj[key] === "object" && obj[key] !== null
        ? deepCopy(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
}

module.exports = {
  deepCopy,
};
