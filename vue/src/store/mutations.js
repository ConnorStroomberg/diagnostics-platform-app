export const CREATE_ALERT = '__CREATE_ALERT__'
export const SET_PATIENT = '__SET_PATIENT__'

export default {
  /**
   * Create an active alert with a given message and type
   * @param state state of the application
   * @param alert alert object containing 1. message and 2. type
   */
  [CREATE_ALERT] (state, alert) {
    state.showAlert = true
    state.alertMessage = alert.message
    state.alertType = alert.type
  },
  [SET_PATIENT] (state, variants) {
    console.log(variants)
    state.variants = variants
  }
}
