// src/reducers/games.js
import { FETCHED_BATCHES, FETCHED_ONE_GAME } from '../actions/batches/fetch'
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

    case FETCHED_ONE_GAME :
      const batchIds = state.map(batch => batch._id)
      if (batchIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

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
      return state.map((game) => {
        if (game._id === payload.game._id) {
          return {
            ...payload.game,
            playerOne: payload.players[0],
            playerTwo: payload.players[1]
          }
        }
        return game
      })

    case GAME_REMOVED :
        return state.filter((game) => (game._id !== payload._id))

    default :
      return state

  }
}
