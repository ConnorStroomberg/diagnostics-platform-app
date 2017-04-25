const state = {
  message,
  date: new Date(),
  showAlert: false,
  alertMessage: '',
  alertType: '',
  apiUrl: window.location.origin + '/api',
  entity: window.location.path
}

export default state
