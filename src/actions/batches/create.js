import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const BATCH_CREATED = 'BATCH_CREATED'


const api = new API()

export default (newBatch) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/batches', newBatch)
      .then((batch) => {
        dispatch({ type: BATCH_CREATED, payload: batch.body })
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
