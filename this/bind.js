Function.prototype.selfBind = function (context, ...args) {
  const self = this;
  const BoundFn = function (...innerArgs) {
    return self.apply(
      // 这里是为了保证 new 的优先级比较高
      this instanceof BoundFn ? this : context,
      args.concat(innerArgs)
    );
  };
  BoundFn.prototype = Object.create(this.prototype);
  return BoundFn;
};
