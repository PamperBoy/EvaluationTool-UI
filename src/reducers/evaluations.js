// src/reducers/games.js
import { EVALUATION_CREATED } from '../actions/evaluations/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case EVALUATION_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)

    default :
      return state

  }
}
