// src/actions/games/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { STUDENTS_UPDATED } from './subscribe'

export const FETCHED_BATCHES = 'FETCHED_BATCHES'
export const FETCHED_ONE_GAME = 'FETCHED_ONE_GAME'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/batches')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_BATCHES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchStudents = (batch) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batch._id}/students`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: STUDENTS_UPDATED,
          payload: {
            batch,
            players: result.body
          }
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const fetchOneGame = (gameId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/games/${gameId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_GAME,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
