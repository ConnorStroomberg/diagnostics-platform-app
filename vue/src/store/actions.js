import { get, login, submitForm } from '../MolgenisApi'
import { CREATE_ALERT, SET_PATIENT, SET_TOKEN, UPDATE_JOB, UPDATE_JOB_HREF } from './mutations'

export const GET_PATIENT = '__GET_PATIENT__'
export const IMPORT_FILE = '__IMPORT_FILE__'
export const FETCH_JOB = '__FETCH_JOB__'
export const LOGIN = '__LOGIN__'

const actions = {
  [LOGIN] (store) {
    const {username, password} = store.state.session
    login(username, password).then((response) => {
      store.commit(SET_TOKEN, response.token)
    })
  },
  [IMPORT_FILE] (store, formData) {
    store.commit(UPDATE_JOB, null)
    const token = store.state.token
    submitForm('/plugin/importwizard/importFile', 'post', formData, token).then((response) => {
      response.json().then((jobHref) => {
        store.commit(UPDATE_JOB_HREF, jobHref)
        store.dispatch(FETCH_JOB)
      }, (error) => {
        console.log(error)
        store.commit(CREATE_ALERT, {
          message: 'Failed to import file, cause: ' + error.message,
          type: 'danger'
        })
      })
    })
  },
  [FETCH_JOB] (store) {
    const token = store.state.token
    const interval = setInterval(() => {
      get({apiUrl: store.state.jobHref}, '', token).then((job) => {
        if (job.status === 'FINISHED') {
          clearInterval(interval)
          store.commit(CREATE_ALERT, {message: 'Import succeeded ' + job.importedEntities, type: 'info'})
          store.commit(UPDATE_JOB, null)
          // TODO: go to screen 2, but for which of them?
        } else if (job.status === 'FAILED') {
          clearInterval(interval)
          store.commit(CREATE_ALERT, {message: 'Import failed. cause: ' + job.message, type: 'warning'})
          store.commit(UPDATE_JOB, null)
        } else {
          store.commit(UPDATE_JOB, job)
        }
      })
    }, 1000)
  },
  [GET_PATIENT] ({commit, state}) {
    const {token, apiUrl, entity} = state
    get(`${apiUrl}/v2/${entity}`, token)
      .then(response => {
        commit(SET_PATIENT, response.items)
      })
  }
}

export default actions
