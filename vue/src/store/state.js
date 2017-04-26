const state = {
  session: {
    server: {
      apiUrl: '/api',
      version: '4.0.0'
    },
    username: 'admin',
    password: 'admin'
  },
  showAlert: false,
  token: '',
  alert: {
    message: null,
    type: null
  },
  job: null,
  jobHref: null,
  variants: []
}

export default state
