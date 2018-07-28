import {
  ne,
  apply,
  append,
  each,
  filter,
  freeze
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
    state = Over(Prop(String(type)))((handlers) => append(handler)(handlers || []))(state)

    return void (0)
  }

  const off = (type) => (handler) => {
    state = Over(Prop(String(type)))((handlers) => filter(item => ne(item)(handler))(handlers || []))(state)

    return void (0)
  }

  return freeze({
    off,
    on,
    emit
  })
}

export default Emitter
