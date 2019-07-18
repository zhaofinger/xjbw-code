let uid = 0;

export default class Dep {

  // static target;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  removeSub(watcher) {
    const index = this.subs.indexOf(watcher);
    if (index > -1) {
      this.subs.splice(index, 1);
    }
  }

  notify(key, oldVal, newVal) {
    this.subs.forEach(watcher => {
      watcher.cb(key, oldVal, newVal);
    });
  }

}

Dep.target = null;