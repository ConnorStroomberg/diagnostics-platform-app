<template>
  <div>
    <h1>This is the Phenotype Selection Container</h1>
    <variant-table :items="variants"></variant-table>
  </div>
</template>

<script>
  import { GET_PATIENT } from '../store/actions'
  import VariantTable from './VariantTable'

  export default {
    name: 'phenotype-selection-container',
    components: {VariantTable},
    computed: {
      variants: {
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
