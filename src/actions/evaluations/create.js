import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const EVALUATION_CREATED = 'EVALUATION_CREATED'


const api = new API()

export default (batchId, studentId, newEvaluation) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/batches/${batchId}/students/${studentId}/evaluations`, newEvaluation)
      .then((evaluation) => {
        dispatch({ type: EVALUATION_CREATED, payload: evaluation.body })
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
