// 深浅拷贝
const { deepCopy } = require("./deepCopy");
const obj = {
  a: 10,
  b: [1, 2, 3],
  c: function () {
    console.log("xxx");
  },
  d: null,
  f: undefined,
};

const obj2 = deepCopy(obj);
console.log(obj, obj2);
