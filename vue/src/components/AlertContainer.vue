<template>
  <div class="row">
    <div class="col-md-12">
      <b-alert :state="alert.type" show dismissable>{{alert.message}}</b-alert>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alert-container',
    computed: {
      alert: {
        get: function () {
          return this.$store.state.alert
        }
      }
    }
  }
</script>
