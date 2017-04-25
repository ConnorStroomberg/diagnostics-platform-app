<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <b-card show-header class="mb-2">
          <h2 align="center" slot="header" class="text-muted">Diagnostics platform</h2>
          Diagnostics platform created with MOLGENIS, used by UMCG Genetics department.
          <span v-if="entityTypeId != null">Currently viewing patient <strong>{{entityTypeId}}</strong></span>
        </b-card>
      </div>
    </div>
    <alert-container v-if="showAlert" alertMessage="test" alertType="success"></alert-container>
    <div class="row">
      <div class="col-md-3">
        <b-nav vertical>
          <b-nav-item>
            <router-link to="/">Import patient data</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/view/sys_sec_User">View patient</router-link>
          </b-nav-item>
        </b-nav>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AlertContainer from './components/AlertContainer'

  export default {
    name: 'molgenis-app',
    computed: {
      entityTypeId: {
        get: function () {
          return this.$route.params.entityTypeId
        }
      }
    },
    components: {
      AlertContainer
    }
  }
</script>
