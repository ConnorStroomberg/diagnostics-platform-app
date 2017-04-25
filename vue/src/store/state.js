const state = {
  session: {
    server: {
      apiUrl: 'api/',
      version: '4.0.0'
    },
    username: 'admin',
    password: 'admin'
  },
  token: null,
  showAlert: false,
  alert: {
    message: null,
    type: null
  },
  job: null,
  jobHref: null
}

export default state
