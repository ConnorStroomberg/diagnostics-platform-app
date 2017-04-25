export const SET_MESSAGE = '__SET_MESSAGE__'

export default {
  [SET_MESSAGE] (state, message) {
    state.message = message
  }
}
