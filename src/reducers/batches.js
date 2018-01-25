// src/reducers/games.js
import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_STUDENTS } from '../actions/batches/fetch'
import {
  GAME_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  STUDENTS_UPDATED,
} from '../actions/batches/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case FETCHED_ONE_BATCH :
    // console.log(state);
    // console.log(payload);
      return payload

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

    case GAME_CREATED :
      const newGame = { ...payload }
      return [newGame].concat(state)

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
