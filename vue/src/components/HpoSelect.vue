<template>
  <div class="form phenotype-selection-container">
    <h3 for="selected-phenotype-list">Phenotypes</h3>

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

    <div class="row form-group">
      <div class="col">
        <ul id="selected-phenotype-list">
          <li v-for="phenotype in selectedPhenotypes" class="row">
            <div class="col">
              {{ phenotype.ontologyTermName }}
            </div>
            <b-form-checkbox :checked="phenotype.isActive" @change="activationChanged(phenotype.id)" class="col">
              active
            </b-form-checkbox>
          </li>
          <li v-show="selectedPhenotypes.length === 0" class="row">
            <em class="col">No phenotypes selected</em>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<style scoped>
  #selected-phenotype-list {
    /* indent within select to indicate child relation */
    margin-left: 1rem;
  }

  .phenotype-selection-container {
    /* add space to indicate is a seperate component */
    padding-bottom: 2rem;
  }
</style>

<script>
  import vSelect from 'vue-select'
  import { get } from '../MolgenisApi'
  import { SET_SELECTED_PHENOTYPES, TOGGLE_SELECTED_PHENOTYPES_ACIVATION } from '../store/mutations'
  // import { COMPUTE_SCORE } from '../store/actions'

  export default {
    name: 'hpo-select',
    data: function () {
      return {
        phenotypes: []
      }
    },
    computed: {
      selectedPhenotypes: {
        get: function () {
          return this.$store.state.selectedPhenotypes
        }
      }
    },
    methods: {
      queryOntologies (query) {
        get(this.$store.state.session.server, '/v2/sys_ont_OntologyTerm?q=ontology.ontologyName==hp;(ontologyTermName=q=' + query + ',ontologyTermSynonym.ontologyTermSynonym=q=' + query + ',ontologyTermIRI=q=' + query + ')')
          .then(response => {
            this.phenotypes = response.items.map(function (item) {
              item.isActive = true
              return item
            })
          })
      },
      selectionChanged (selected) {
        this.$store.commit(SET_SELECTED_PHENOTYPES, selected)
        // this.$store.dispatch(COMPUTE_SCORE, selected.slice()[0])
      },
      activationChanged (phenotypeId) {
        this.$store.commit(TOGGLE_SELECTED_PHENOTYPES_ACIVATION, phenotypeId)
        // this.$store.dispatch(COMPUTE_SCORE, selected.slice()[0])
      }
    },
    components: {
      vSelect
    }
  }
</script>
