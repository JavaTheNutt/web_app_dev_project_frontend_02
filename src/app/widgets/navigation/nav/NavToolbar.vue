<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
  import NavBus from './nav_bus';
  export default {
    name: 'nav-toolbar',
    methods:{
      emitClick(){
        NavBus.$emit('leftNavToggled');
      }
    }
  };
</script>
