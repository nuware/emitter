'use strict';

var functions = require('@nuware/functions');
var lenses = require('@nuware/lenses');

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

module.exports = Emitter;
