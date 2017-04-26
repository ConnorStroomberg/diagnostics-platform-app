<template>
  <b-table striped hover :items="items" :fields="fields">
    <template slot="username" scope="item">
      {{item.item.username}}
    </template>
    <template slot="isActive" scope="item">
      {{item.item.active?'Yes :)':'No :('}}
    </template>
    <template slot="email" scope="item">
      {{item.item.Email}}
    </template>
    <!--<template slot="actions" scope="item">-->
      <!--<b-btn size="sm" @click="details(item.item)">Details</b-btn>-->
    <!--</template>-->
  </b-table>
</template>

<script>
  export default {
    name: 'variant-table',
    props: ['items'],
    data: function () {
      return {
        fields: {
          username: {
            label: 'Username',
            sortable: true
          },
          isActive: {
            label: 'is Active'
          },
          email: {
            label: 'E-mail'
          }
        },
        filter: null
      }
    }

  }
</script>
