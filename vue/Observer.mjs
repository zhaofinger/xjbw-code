import Dep from './Dep.mjs';

export default class Observer {
  constructor(data) {
    this.data = data;
    this.bindData(data);
  }

  bindData(data) {
    Object.keys(data).forEach(key => {
      let value = this.data[key];
      if (typeof value === 'object') {
        this.bindData(value);
      }
      const dep = new Dep()
      Object.defineProperty(data, key, {
        get() {
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return value;
        },
        set(newVal) {
          if (newVal !== value) {
            if (typeof newVal === 'object') {
              this.bindData(newVal);
            }
            dep.notify(key, value, newVal);
            value = newVal;
          }
        }
      })
    });
  }
}