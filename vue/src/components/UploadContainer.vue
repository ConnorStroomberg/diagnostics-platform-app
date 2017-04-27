<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-form-file choose-label="Select a VCF file" v-model="file"></b-form-file><br>
        <small class="text-muted">Select a .vcf or .vcf.gz file from your hard drive</small>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <b-form-input :formatter="format" v-model="entityTypeId"></b-form-input>
        <small class="text-muted">Specify the identifier for this VCF. Should not start with a number</small>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="float-right">
          <b-button v-if="(entityTypeId === null && file === null)" slot="right" disabled>Upload</b-button>
          <b-button v-else slot="right" @click="upload">Upload</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { IMPORT_FILE } from '../store/actions'

  export default {
    name: 'upload-container',
    data () {
      return {
        entityTypeId: null,
        file: null
      }
    },
    methods: {
      /**
       * Remove illegal chars
       * Don't allow entity names starting with a number
       */
      format: function (value) {
        value = value.replace(/[-.*$&%^()#!@?]/g, '_')
        value = value.replace(/^[0-9]/g, '_')

        return value
      },
      /**
       * Handles @click event from the upload button
       * Dispatches: IMPORT_FILE
       */
      upload: function () {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('entityTypeId', this.entityTypeId)
        formData.append('packageName', this.$store.state.diagnosticsPackageId)
        formData.append('action', 'ADD')
        formData.append('notify', false)

        this.$store.dispatch(IMPORT_FILE, formData)
      }
    }
  }
</script>
