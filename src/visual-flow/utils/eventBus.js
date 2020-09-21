/* eslint-disable */ 

const __EventPool = Symbol('__EventPool');
const __on = Symbol('__on');
class Event {
  constructor() {
    this[__EventPool] = {}; // 事件队列
  }

  /**
   * 一次性注册
   */
  $once(...args) {
    this[__on](...args, true);
  }

  /**
   * 持久性注册
   */
  $on(...args) {
    this[__on](...args);
  }

  /**
   * 注册事件
   * @param {String} type 事件类型
   * @param {Function} callback 事件回调方法
   * @param {Boolean} once 注册类型，默认false，持久性注册
   */
  [__on](type, callback, once = false) {
    // 回调验证
    if (typeof callback !== 'function') {
      console.error(
        '2 arguments required, the callback provided as parameter 2 is not an function.',
      );
      return;
    }
    // 首次注册
    if (!this[__EventPool][type]) {
      this[__EventPool][type] = new Map();
    }
    if (!this[__EventPool][type].has(callback)) {
      const content = {
        once,
        cb: callback,
      };
      this[__EventPool][type].set(callback, content);
    }
  }

  /**
   * 解除绑定
   * @param {String} type 事件类型
   * @param {Function | Boolean} flag 事件回调方法 | 是否强制解绑某个type下的所有方法
   */
  $off(type, flag) {
    if (this[__EventPool][type]) {
      if (arguments.length > 1 && flag === true) {
        // 将该type下的绑定全部清空
        delete this[__EventPool][type];
      } else if (arguments.length > 1 && typeof flag === 'function') {
        // 删除该回调
        this[__EventPool][type].delete(flag);
        // 回调为空时，删掉map
        this[__EventPool][type].size === 0 && delete this[__EventPool][type];
      } else {
        console.error(
          '2 arguments required, the param 2 should be Function or Boolean.',
        );
      }
    }
  }

  /**
   * 触发事件绑定
   * @param {String} type 事件类型
   * @param {Any} data 数据
   */
  $emit(type, data) {
    this[__EventPool][type]
      && this[__EventPool][type].forEach((item, key) => {
        // 先删除再执行，以防止死循环
        item.once && this.off(type, key);
        item.cb(data);
      });
  }
}

export default new Event();
