import {get} from '../molgenisApi'
import 'url-polyfill'

export const GET_PATIENTS = 'GET_PATIENTS'
export const START_IMPORT = '__START_IMPORT__'
export const UPDATE_JOB = '__UPDATE_JOB__'

const actions = {
  [GET_PATIENTS] ({ commit, state }) {
    const {token, apiUrl, entity} = state
    get(`${apiUrl}/v2/${entity}`, token)
      .then(response => { console.log(entity) })
  }
}

export default actions
