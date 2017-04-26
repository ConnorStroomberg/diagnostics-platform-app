<template>
  <div>
    <v-select
      :on-search="queryOntologies"
      :options="phenotypes"
      placeholder="Search HPO Ontology..."
      label="ontologyTermName"
    >
    </v-select>
  </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { FETCH_HPO_ONTOLOGIES } from '../store/actions'

  export default {
    name: 'hpo-select',
    methods: {
      queryOntologies (query) {
        this.$store.dispatch(FETCH_HPO_ONTOLOGIES, query)
      }
    },
    computed: {
      ontologies: {
        get: function () {
          return []
        }
      },
      phenotypes: {
        get: function () {
          return this.$store.state.phenotypes
        }
      }
    },
    components: {
      vSelect
    }
  }
</script>
