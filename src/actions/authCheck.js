import { push } from 'react-router-redux'
import API from '../api/client'
import { AUTH_ERROR } from './loading'

export const CONNECTED_TO_WEBSOCKET = 'CONNECTED_TO_WEBSOCKET'
export const DISCONNECTED_FROM_WEBSOCKET = 'DISCONNECTED_FROM_WEBSOCKET'

const api = new API()

export default () => {
  return dispatch => {

    if (!api.isAuthenticated()) {
      dispatch({ type: AUTH_ERROR })
      dispatch(push('/sign-in'))
      return
    }
  }
}
