import Observer from './Observer.mjs';
import Watcher from './Watcher.mjs';

const data = {
  name: '赵finger',
  age: 20,
  gender: 1,
};

const observer = new Observer(data);

new Watcher(data, (key, oldVal, newVal) => {
  console.log(key, `${oldVal} -> ${newVal}`);
});

setTimeout(() => {
  observer.data.name = 'zasdfasdf';
}, 1 * 1000);

setTimeout(() => {
  observer.data.age = { num: 10 };
}, 2 * 1000);

setTimeout(() => {
  observer.data.gender = 0;
}, 3 * 1000);