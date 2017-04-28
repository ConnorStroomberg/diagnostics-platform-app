export const CREATE_ALERT = '__CREATE_ALERT__'
export const REMOVE_ALERT = '__REMOVE_ALERT__'
export const UPDATE_JOB = '__UPDATE_JOB__'
export const UPDATE_JOB_HREF = '__UPDATE_JOB_HREF__'
export const SET_TOKEN = '__SET_TOKEN__'
export const SET_PATIENT_TABLES = '__SET_PATIENT_TABLES__'
export const SET_PHENOTYPES = '__SET_PHENOTYPES__'
export const SET_SELECTED_PHENOTYPES = '__SET_SELECTED_PHENOTYPES__'
export const SET_PATIENT = '__SET_PATIENT__'
export const TOGGLE_SELECTED_PHENOTYPES_ACIVATION = '__TOGGLE_SELECTED_PHENOTYPES_ACIVATION__'

export default {
  /**
   * Create an active alert with a given message and type
   * @param state state of the application
   * @param alert alert object containing 1. message and 2. type
   */
  [CREATE_ALERT] (state, alert) {
    state.showAlert = true
    state.alert = alert
  },
  /**
   * Remove an active alert and set message and type back to null
   * @param state state of the application
   */
  [REMOVE_ALERT] (state) {
    state.showAlert = false
    state.alert.message = null
    state.alert.type = null
  },
  /**
   * Update the job currently registered with the state of the application
   * @param state state of the application
   * @param job the job to update the state with
   */
  [UPDATE_JOB] (state, job) {
    state.job = job
  },
  /**
   * Update job href currently registered with the state of the application
   * @param state state of the application
   * @param jobHref the jobHref to update the state with
   */
  [UPDATE_JOB_HREF] (state, jobHref) {
    state.jobHref = jobHref
  },
  /**
   * Set the token for the entire application and all subsequent API calls
   * @param state state of the application
   * @param token the token used to set the token in the state
   */
  [SET_TOKEN] (state, token) {
    state.token = token
  },
  /**
   * Set the list of EntityTypes origination from the diagnostics package
   * @param state state of the application
   * @param variantTables list of EntityTypes used to set the list of patients in the state
   */
  [SET_PATIENT_TABLES] (state, patients) {
    state.patients = patients
  },
  /**
   * Sets the list of currently selected phenotypes
   * @param state state of the application
   * @param list of selected phenotypes, may be empty
   */
  [SET_SELECTED_PHENOTYPES] (state, selectedPhenotypes) {
    // Use slice to clone selectedPhenotypes, this is needed to avoid altering the store form outside via the selectedPhenotypes
    state.selectedPhenotypes = selectedPhenotypes.slice()
  },
  [SET_PATIENT] (state, variants) {
    state.variants = variants
  },
  [TOGGLE_SELECTED_PHENOTYPES_ACIVATION] (state, selectedPhenotypeId) {
    let selectedPhenotype = state.selectedPhenotypes.find(function (selectedPhenotype) {
      return selectedPhenotype.id === selectedPhenotypeId
    })
    selectedPhenotype.isActive = !selectedPhenotype.isActive
  }
}
