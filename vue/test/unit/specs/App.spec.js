import App from 'App.vue'

App.$store = {state: {
    token: null
  },
  dispatch: sinon.spy()
}

describe('App.vue', () => {
  it('should use "molgenis-app" as name', () => {
    expect(App.name).to.equal('molgenis-app')
  })

  it('should when created try to login', () => {
    App.created()
    App.$store.dispatch.should.have.been.calledWith('__LOGIN__')
  })
})
