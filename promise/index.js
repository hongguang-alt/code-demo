const PromiseA = require("./promiseA");

// 执行 promise
const p1 = new PromiseA((reslove, reject) => {
  console.log("create promise");
  setTimeout(() => {
    // reslove("success");
    reject("err");
  }, 3000);
})
  .then(
    (res) => {
      console.log(res, "success");
      return "xx";
    },
    (err) => {
      console.log(err, "err");
      return "xxo";
    }
  )
  .then(
    (res) => {
      console.log(res, "xx");
      return new PromiseA((res) => res("adsfasdf"));
      // return "adsfasdf";
    },
    (err) => {
      console.log(err, "xxo");
    }
  )
  .then((res) => {
    console.log(res);
  });
