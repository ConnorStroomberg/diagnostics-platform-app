<template>
  <div>
    <h1>This is the Phenotype Selection Container</h1>
    {{variants}}
  </div>
</template>

<script>
  import { GET_PATIENT } from '../store/actions'

  export default {
    name: 'phenotype-selection-container',
    computed: {
      variants: {
        get: function () {
          console.log(this.$store.state.variants)
          return this.$store.state.variants
        }
      }
    },
    created: function () {
      const entityTypeId = this.$route.params.entityTypeId
      console.log(entityTypeId)
      this.$store.dispatch(GET_PATIENT, entityTypeId)
    }

  }
</script>
