// src/reducers/games.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
import {
  BATCH_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  STUDENTS_UPDATED,
} from '../actions/batches/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case FETCHED_ONE_BATCH :
      return [payload]

    // case FETCHED_STUDENTS :
    //   return { ...{students: payload}, ...state}
    // case FETCHED_ONE_BATCH :
    //   const batchIds = state.map(batch => batch._id)
    //   if (batchIds.indexOf(payload._id) < 0) {
    //     return [{ ...payload }].concat(state)
    //   }
    //   return state.map((batch) => {
    //     if (batch._id === payload._id) {
    //       return { ...payload }
    //     }
    //     return batch
    //   })

    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)

    case GAME_UPDATED :
      return state.map((game) => {
        if (game._id === payload._id) {
          return { ...payload }
        }
        return game
      })

    case STUDENTS_UPDATED :
      return state.map((batch) => {
        if (batch._id === payload.batch._id) {
          return {
            ...payload
          }
        }
        return batch
      })

    case GAME_REMOVED :
        return state.filter((game) => (game._id !== payload._id))

    default :
      return state

  }
}
