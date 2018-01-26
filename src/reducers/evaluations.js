// src/reducers/games.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
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
