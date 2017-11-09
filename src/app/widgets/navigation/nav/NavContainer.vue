<template>
  <div>
    <nav-drawer :items="items"></nav-drawer>
    <nav-toolbar></nav-toolbar>
  </div>
</template>
<script>
  import NavDrawer from './NavDrawer';
  import NavToolbar from './NavToolbar.vue';

  export default {
    name: 'nav-container',
    components:{NavDrawer, NavToolbar},
    data() {
      return {
        name: 'navigation',
        drawer: false,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ]
      };
    }
  };
</script>
