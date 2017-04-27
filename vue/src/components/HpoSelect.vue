<template>
  <div class="form">
    <div class="row form-group">
      <div class="col">
        <label for="hpo-select">Add HPO</label>
        <v-select
        id="hpo-select"
        :on-search="queryOntologies"
        :options="phenotypes"
        :onChange="selectionChanged"
        multiple
        placeholder="Search HPO Ontology..."
        label="ontologyTermName"
        >
        </v-select>
      </div>
    </div>
  </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { FETCH_HPO_ONTOLOGIES } from '../store/actions'
  import { SET_SELECTED_PHENOTYPES } from '../store/mutations'

  export default {
    name: 'hpo-select',
    methods: {
      queryOntologies (query) {
        this.$store.dispatch(FETCH_HPO_ONTOLOGIES, query)
      },
      selectionChanged (selected) {
        console.log(selected)
        this.$store.commit(SET_SELECTED_PHENOTYPES, selected)
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
