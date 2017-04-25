<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <b-form-file choose-label="Select a VCF file" v-model="file"></b-form-file>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <b-input-group>
          <b-form-input v-model="entityTypeId"></b-form-input>

          <b-button v-if="(entityTypeId === null && file === null)" slot="right" disabled>Upload</b-button>
          <b-button v-else slot="right">Upload</b-button>
        </b-input-group>
        <small class="text-muted">Specify the identifier for this VCF</small>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'upload-container',
    data () {
      return {
        entityTypeId: null,
        file: null
      }
    }
  }

  //  setFile (event) {
  //    const file = event.target.files[0]
  //    var fileName = file.name.toLowerCase()
  //    var showNameField = fileName.endsWith('.vcf') || fileName.endsWith('.vcf.gz')
  //    if (this.props.validExtensions && !this.props.validExtensions.find((extension) => fileName.endsWith(extension))) {
  //      this.setState({ warning : 'Invalid file name, extension must be ' + this.props.validExtensions })
  //    } else {
  //      let entityName = null
  //      if (showNameField) {
  //        // Remove extension
  //        entityName = fileName.replace(/\.vcf|\.vcf\.gz/, '')
  //        // Maximum length is 30 chars, but we need to take into account that the samples are post fixed "_SAMPLES"
  //        entityName = entityName.substring(0, 21)
  //        // Remove illegal chars
  //        entityName = entityName.replace(/-|\.|\*|\$|&|%|\^|\(|\)|#|!|@|\?/g, '_')
  //        // Don't allow entity names starting with a number
  //        entityName = entityName.replace(/^[0-9]/g, '_')
  //      }
  //      this.setState({ file, showNameField, entityName, warning : undefined })
  //    }
  //  }
  //
  //  setEntityName (entityName) {
  //    console.log('setEntityname', entityName)
  //    this.setState({ entityName : entityName.value })
  //  }
  //
  //  onSubmit () {
  //    const data = new FormData()
  //    data.append('file', this.state.file)
  //    data.append('entityName', this.state.entityName)
  //    data.append('action', this.state.action)
  //    data.append('notify', false)
  //    this.props.importFile(data)
  //  }
</script>
