<template>
  <div>
    <h1>This is the Phenotype Selection Container</h1>
    {{patients}}
  </div>
</template>

<script>
  import { GET_PATIENT } from '../store/actions'

  export default {
    name: 'phenotype-selection-container',
    computed: {
      patients: {
        get: function () {
          return this.$store.state.variants
        }
      }
    },
    created: function () {
      const entityTypeId = this.$route.params.entityTypeId
      this.$store.dispatch(GET_PATIENT, entityTypeId)
    }

  }
</script>
