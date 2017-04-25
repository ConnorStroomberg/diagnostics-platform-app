import {get} from '../molgenisApi'
import 'url-polyfill'

export const GET_PATIENT = '__GET_PATIENT__'
export const SET_PATIENT = '__SET_PATIENT__'
export const START_IMPORT = '__START_IMPORT__'
export const UPDATE_JOB = '__UPDATE_JOB__'

const actions = {
  [GET_PATIENT] ({ commit, state }, entityTypeId) {
    const {token, apiUrl} = state
    get(`${apiUrl}/v2/${entityTypeId}`, token)
      .then(response => {
        commit(SET_PATIENT, response.items)
      })
  }
}

export default actions
