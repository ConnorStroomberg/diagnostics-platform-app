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
  diagnosticsPackageId: window.__INITIAL_STATE__.diagnosticsPackageId,
  variantTables: [],
  variants: []
}

export default state
