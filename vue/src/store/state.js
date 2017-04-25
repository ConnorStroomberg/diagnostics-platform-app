
const message = window.__INITIAL_STATE__
const state = {
  message,
  date: new Date(),
  apiUrl: window.location.origin + '/api',
  entity: window.location.path
}

export default state
