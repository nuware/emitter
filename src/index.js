import {
  ne,
  apply,
  append,
  each,
  filter,
  freeze,
  isFunction,
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
    each((handler) => apply(handler)(args))(Get(Prop(String(type)))(state) || [])

    return void (0)
  }

  const on = (type) => (handler) => {
    state = Over(Prop(String(type)))((handlers = []) => isFunction(handler) ? append(handler)(handlers) : handlers)(state)

    return void (0)
  }

  const off = (type) => (handler) => {
    state = isFunction(handler)
      ? Over(Prop(String(type)))((handlers = []) => filter(ne(handler))(handlers))(state)
      : dissoc(String(type))(state)

    return void (0)
  }

  return freeze({
    off,
    on,
    emit,
    state: () => state
  })
}

export default Emitter
