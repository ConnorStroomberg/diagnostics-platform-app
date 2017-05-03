// Import Vue and the component being tested
import Vue from 'vue'
import App from 'App.vue'

describe('App.vue', () => {
  it('should use "molgenis-app" as name', () => {
    expect(App.name).to.equal('molgenis-app')
  })
})
