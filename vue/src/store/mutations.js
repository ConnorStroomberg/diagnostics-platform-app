export const CREATE_ALERT = '__CREATE_ALERT__'

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
  }
}
