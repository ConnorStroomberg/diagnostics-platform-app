import { login, get, submitForm } from '../MolgenisApi'
import { CREATE_ALERT, UPDATE_JOB, UPDATE_JOB_HREF, SET_TOKEN } from './mutations'

export const IMPORT_FILE = '__IMPORT_FILE__'
export const FETCH_JOB = '__FETCH_JOB__'
export const LOGIN = '__LOGIN__'

const actions = {
  [LOGIN] (store) {
    const { server, username, password } = store.state.session
    login(server, username, password).then((response) => {
      store.commit(SET_TOKEN, response.token)
    })
  },
  [IMPORT_FILE] (store, formData) {
    store.commit(UPDATE_JOB, null)
    const token = store.state.token
    submitForm('/plugin/importwizard/importFile', 'post', formData, token).then((response) => {
      response.json().then(jobHref => {
        store.commit(UPDATE_JOB_HREF, jobHref)
        store.dispatch(FETCH_JOB, jobHref)
      })
    }, (error) => store.commit(CREATE_ALERT, {
      message: 'Failed to import file, cause: ' + error.message,
      type: 'danger'
    }))
  },
  [FETCH_JOB] (store, commit, jobHref) {
    const { server } = store.state.session
    const token = store.state.token
    const interval = setInterval(() => {
      get(server, jobHref, token).then((job) => {
        if (job.status === 'FINISHED') {
          clearInterval(interval)
          commit(CREATE_ALERT, {message: 'Import succeeded ' + job.importedEntities, type: 'info'})
          commit(UPDATE_JOB, null)
          // TODO: go to screen 2, but for which of them?
        } else if (job.status === 'FAILED') {
          clearInterval(interval)
          commit(CREATE_ALERT, {message: 'Import failed. cause: ' + job.message, type: 'warning'})
          commit(UPDATE_JOB, null)
        } else {
          commit(UPDATE_JOB, job)
        }
      })
    }, 1000)
  }
}

export default actions
