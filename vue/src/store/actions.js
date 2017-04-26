import { get, login, submitForm } from '../MolgenisApi'
import { CREATE_ALERT, SET_PATIENT, SET_TOKEN, SET_VARIANT_TABLES, UPDATE_JOB, UPDATE_JOB_HREF } from './mutations'

export const GET_PATIENT = '__GET_PATIENT__'
export const IMPORT_FILE = '__IMPORT_FILE__'
export const FETCH_JOB = '__FETCH_JOB__'
export const FETCH_VARIANT_TABLES = '__FETCH_VARIANT_TABLES__'
export const LOGIN = '__LOGIN__'

const actions = {
  [LOGIN] ({commit, state}) {
    const {username, password} = state.session
    login(username, password).then((response) => {
      commit(SET_TOKEN, response.token)
    })
  },
  [IMPORT_FILE] ({commit, dispatch, state}, formData) {
    commit(UPDATE_JOB, null)
    submitForm('/plugin/importwizard/importFile', 'post', formData, state.token)
      .then(response => {
        commit(UPDATE_JOB_HREF, response)
        dispatch(FETCH_JOB)
      })
      .catch(function (error) {
        commit(CREATE_ALERT, {
          message: 'Failed to import file, cause: ' + error,
          type: 'danger'
        })
      })
  },
  [FETCH_JOB] ({commit, state}) {
    const interval = setInterval(() => {
      get({apiUrl: state.jobHref}, '', state.token).then((job) => {
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
  },
  [FETCH_VARIANT_TABLES] ({commit, state}) {
    get(state.session.server, '/v2/sys_md_Package?q=id==' + state.diagnosticsPackageId + '&attrs=entityTypes')
      .then(response => {
        commit(SET_VARIANT_TABLES, response.items[0].entityTypes)
      })
  },
  [GET_PATIENT] ({commit, state}, entityTypeId) {
    get(state.session.server, `/v2/${entityTypeId}`, state.token)
      .then(response => {
        commit(SET_PATIENT, response.items)
      })
  }
}

export default actions
