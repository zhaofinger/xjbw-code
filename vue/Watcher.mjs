import Dep from './Dep.mjs';

export default class Watcher {
  constructor(obj, cb) {
    this.obj = obj;
    this.cb = cb;
    this.get(obj);
  }

  get(obj, key) {
    Dep.target = this;
    // obj[key]; // 触发Observer的getter
    Object.keys(obj).forEach(key => {
      console.log(obj[key]);
    });
    Dep.target = null;
  }
}