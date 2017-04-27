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
  import { get } from '../MolgenisApi'
  import { SET_SELECTED_PHENOTYPES } from '../store/mutations'
  import { COMPUTE_SCORE } from '../store/actions'

  export default {
    name: 'hpo-select',
    data: function () {
      return {
        phenotypes: []
      }
    },
    methods: {
      queryOntologies (query) {
        get(this.$store.state.session.server, '/v2/sys_ont_OntologyTerm?q=ontology.ontologyName==hp;(ontologyTermName=q=' + query + ',ontologyTermSynonym.ontologyTermSynonym=q=' + query + ',ontologyTermIRI=q=' + query + ')')
          .then(response => { this.phenotypes = response.items })
      },
      selectionChanged (selected) {
        this.$store.commit(SET_SELECTED_PHENOTYPES, selected)
        this.$store.dispatch(COMPUTE_SCORE, selected.slice()[0])
      }
    },
    components: {
      vSelect
    }
  }
</script>
