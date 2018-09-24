import {
  eq,
  ne,
  has,
  apply,
  append,
  each,
  filter,
  find,
  isFunction,
  isDefined,
  dissoc
} from '@nuware/functions'

import {
  Prop,
  Over,
  Get
} from '@nuware/lenses'

const Emitter = () => {
  let state = {}

  const emit = (type) => (...args) => {
    const le = Prop(String(type))
    const handlers = Get(le)(state) || []
    return each((handler) => apply(handler)(args))(handlers)
  }

  const off = (type) => (handler) => {
    const le = Prop(String(type))
    state = isFunction(handler)
      ? Over(le)((handlers = []) => filter(ne(handler))(handlers))(state)
      : dissoc(String(type))(state)
    return void (0)
  }

  const on = (type) => (handler) => {
    const le = Prop(String(type))
    state = Over(le)((handlers = []) => isFunction(handler)
      ? append(handler)(handlers)
      : handlers
    )(state)
    return () => off(type)(handler)
  }

  const once = (type) => (handler) => {
    const le = Prop(String(type))
    const fn = (...args) => {
      off(type)(fn)
      apply(handler)(args)
    }

    state = Over(le)((handlers = []) => append(fn)(handlers))(state)
    return void (0)
  }

  const have = (type, handler) => {
    const le = Prop(String(type))
    const handlers = Get(le)(state) || []
    return isFunction(handler)
      ? isDefined(find(eq(handler))(handlers))
      : has(type)(state)
  }

  return {
    off,
    on,
    once,
    emit,
    has: have
  }
}

export default Emitter
