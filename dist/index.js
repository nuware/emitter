(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@nuware/functions'), require('@nuware/lenses')) :
  typeof define === 'function' && define.amd ? define(['@nuware/functions', '@nuware/lenses'], factory) :
  (global.Emitter = factory(global.F,global.L));
}(this, (function (functions,lenses) { 'use strict';

  const Emitter = () => {
    let state = {};

    const emit = (type) => (...args) => {
      functions.each((handler) => functions.apply(handler)(args))(lenses.Get(lenses.Prop(String(type)))(state) || []);

      return void (0)
    };

    const on = (type) => (handler) => {
      state = lenses.Over(lenses.Prop(String(type)))((handlers) => functions.append(handler)(handlers || []))(state);

      return void (0)
    };

    const off = (type) => (handler) => {
      state = lenses.Over(lenses.Prop(String(type)))((handlers) => functions.filter(item => functions.ne(item)(handler))(handlers || []))(state);

      return void (0)
    };

    return functions.freeze({
      off,
      on,
      emit,
      state: () => state
    })
  };

  return Emitter;

})));
