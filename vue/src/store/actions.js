import {get} from '../molgenisApi'
import 'url-polyfill'

export const GET_PATIENT = '__GET_PATIENT__'
export const SET_PATIENT = '__SET_PATIENT__'
export const START_IMPORT = '__START_IMPORT__'
export const UPDATE_JOB = '__UPDATE_JOB__'

const actions = {
  [GET_PATIENT] ({ commit, state }) {
    const {token, apiUrl, entity} = state
    console.log(token, apiUrl, entity)
    get(`${apiUrl}/v2/${entity}`, token)
      .then(response => {
        commit(SET_PATIENT, response.items)
      })
  }
}

export default actions
