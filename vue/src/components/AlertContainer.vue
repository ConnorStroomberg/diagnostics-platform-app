<template>
  <div class="row">
    <div class="col-md-12">
      <b-alert :state="alertType" show dismissable>{{alertMessage}}</b-alert>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'alert-container',
    props: ['alertMessage', 'alertType']
  }
</script>
