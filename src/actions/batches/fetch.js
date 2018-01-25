// src/actions/games/fetch.js

import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
// import { FETCHED_STUDENTS } from './subscribe'

export const FETCHED_BATCHES = 'FETCHED_BATCHES'
export const FETCHED_ONE_BATCH = 'FETCHED_ONE_BATCH'
export const FETCHED_STUDENTS = 'FETCHED_STUDENTS'

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

export const fetchOneBatch = (batchId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batchId}`)
    .then((result) => {
      // console.log(result)

      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_ONE_BATCH,
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

export const fetchStudents = (batchId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batchId}/students`)
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: FETCHED_STUDENTS,
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
