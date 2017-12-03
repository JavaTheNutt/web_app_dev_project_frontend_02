<template>
  <v-data-table
    v-model="selectedAddress"
    :headers="headers"
    :items="addresses"
    :pagination.sync="pagination"
    :hide-actions="!showPagination"
    :hide-headers="true"
    item-key="text"
    class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>{{props.header}}</th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr>
        <td>{{props.item.text}}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    name: 'select-address-table',
    data(){
      return{
        selectedAddress:[],
        props:{addresses:Array},
        headers:[{header:'Address'}],
        pagination:{
          rowsPerPage: 10
        }
      };
    },
    computed:{
      showPagination(){
        return this.addresses.length >= 10;
      }
    }
  };
</script>
