import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const STUDENT_CREATED = 'STUDENT_CREATED'


const api = new API()

export default (batchId, newStudent) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/batches/${batchId}/students`, newStudent)
      .then((student) => {
        dispatch({ type: STUDENT_CREATED, payload: student.body })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
