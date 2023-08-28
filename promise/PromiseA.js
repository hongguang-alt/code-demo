// 手动实现一个 Promise

/**
 * 实现的几个点
 * 1. 三种状态
 * 2. then 方法返回 promise，可以链式调用
 * 3. 关于规范处理参数
 */

/**
 * 遇到的几个问题
 * 第一个promise的错误处理怎么处理
 * 后面then里面的错误处理怎么处理
 */

const PENDING = "pending";
const RESLOVED = "resloved";
const REJECTED = "rejected";

module.exports = class PromiseA {
  constructor(executor) {
    this.status = PENDING;
    this.successValue = undefined;
    this.errorValue = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      executor(this.reslove.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  reslove(val) {
    // if (val instanceof PromiseA) {
    //   return val.then(resolve, reject);
    // }

    if (this.status !== PENDING) return;
    this.status = RESLOVED;
    this.successValue = val;
    this.onFulfilledCallbacks.forEach((fn) => fn(this.successValue));
  }
  reject(val) {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.errorValue = val;
    this.onRejectedCallbacks.forEach((fn) => fn(this.errorValue));
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 添加 回调函数，返回一个 promise 是上一次的结果
    let p = new PromiseA((reslove, reject) => {
      // 进行执行了
      if (this.status === RESLOVED) {
        try {
          let x = onFulfilled(this.successValue);
          resolvePromise(p, x, reslove, reject);
        } catch (e) {
          reject(e);
        }
      }

      if (this.status === REJECTED) {
        try {
          let x = onRejected(this.errorValue);
          resolvePromise(p, x, reslove, reject);
        } catch (e) {
          reject(e);
        }
      }

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push((val) => {
          try {
            // 执行
            let res = onFulfilled(val);
            resolvePromise(p, res, reslove, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push((val) => {
          try {
            let res = onRejected(val);
            resolvePromise(p, res, reslove, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return p;
  }
};

function resolvePromise(p, x, reslove, reject) {
  if (p === x) {
    return reject(
      new new TypeError("Chaining cycle detected for promise #<Promise>")()
    );
  }
  let called;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 继续解析到对应的 then
            resolvePromise(p, y, reslove, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        reslove(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    reslove(x);
  }
}
