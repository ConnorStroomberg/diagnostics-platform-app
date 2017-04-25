const state = {
  session: {
    server: {
      apiUrl: 'http://localhost:8080/api',
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
  jobHref: null,
  variants: []
}

export default state
