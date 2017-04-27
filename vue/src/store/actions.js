import { get, login, submitForm } from '../MolgenisApi'
import {
  CREATE_ALERT,
  SET_PATIENT,
  SET_PATIENT_TABLES,
  SET_PHENOTYPES,
  SET_TOKEN,
  UPDATE_JOB,
  UPDATE_JOB_HREF
} from './mutations'

export const GET_PATIENT = '__GET_PATIENT__'
export const IMPORT_FILE = '__IMPORT_FILE__'
export const FETCH_JOB = '__FETCH_JOB__'
export const FETCH_PATIENT_TABLES = '__FETCH_PATIENT_TABLES__'
export const FETCH_HPO_ONTOLOGIES = '__FETCH_HPO_ONTOLOGIES__'
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
  [FETCH_JOB] ({commit, dispatch, state}) {
    const interval = setInterval(() => {
      get({apiUrl: state.jobHref}, '', state.token).then((job) => {
        if (job.status === 'FINISHED') {
          clearInterval(interval)
          commit(CREATE_ALERT, {message: 'Import succeeded ' + job.importedEntities, type: 'info'})
          commit(UPDATE_JOB, null)
          dispatch(FETCH_PATIENT_TABLES)
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
  [FETCH_PATIENT_TABLES] ({commit, state}) {
    get(state.session.server, '/v2/sys_md_Package?q=id==' + state.diagnosticsPackageId + '&attrs=entityTypes')
      .then(response => {
        if (response.items && response.items[0]) {
          commit(SET_PATIENT_TABLES, response.items[0].entityTypes)
        }
      })
  },
  [GET_PATIENT] ({commit, state}, patientId) {
    get(state.session.server, `/v2/${patientId}`, state.token)
      .then(response => {
        commit(SET_PATIENT, response.items)
      })
  },
  [FETCH_HPO_ONTOLOGIES] ({commit, state}, query) {
    get(state.session.server, '/v2/sys_ont_OntologyTerm?q=ontology.ontologyName==hp;(ontologyTermName=q=' + query + ',ontologyTermSynonym.ontologyTermSynonym=q=' + query + ',ontologyTermIRI=q=' + query + ')')
      .then(response => {
        commit(SET_PHENOTYPES, response.items)
      })
  }
}

export default actions
