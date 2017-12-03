<template>
  <v-data-table
    v-model="selectedAddress"
    :headers="headers"
    :items="addresses"
    item-key="text"
    class="elevation-1">
    <template slot="headers" slot-scope="props">
      <tr>
        <th>{{props.header}}</th>
      </tr>
    </template>
    <template slot="addresses" slot-scope="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
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
        selected:[],
        props:{addresses:Array},
        headers:[{header:'Address'}]
      };
    }
  };
</script>
