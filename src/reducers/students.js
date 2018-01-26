// src/reducers/games.js
import { FETCHED_STUDENTS } from '../actions/students/fetch'
import {
  BATCH_CREATED,
  GAME_UPDATED,
  GAME_REMOVED,
  STUDENTS_UPDATED,
} from '../actions/batches/subscribe'

import { STUDENT_CREATED } from '../actions/students/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {

    case FETCHED_STUDENTS :
      return payload
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

    case STUDENT_CREATED :
      const newStudent = { ...payload }
      return [newStudent].concat(state)

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
