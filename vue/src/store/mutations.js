export const CREATE_ALERT = '__CREATE_ALERT__'
export const REMOVE_ALERT = '__REMOVE_ALERT__'
export const UPDATE_JOB = '__UPDATE_JOB__'
export const UPDATE_JOB_HREF = '__UPDATE_JOB_HREF__'
export const SET_TOKEN = '__SET_TOKEN__'
export const SET_PATIENT = '__SET_PATIENT__'

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
  [SET_PATIENT] (state, variants) {
    state.variants = variants
  }
}
