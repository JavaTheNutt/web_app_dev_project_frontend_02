<template>
  <v-layout wrap>
    <v-navigation-drawer
      temporary
      v-model="shown"
      light
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="redirect(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
  import NavBus from './nav_bus';

  export default {
    name: 'nav-drawer',
    data() {
      return {
        shown: false
      };
    },
    props: {
      items: Array
    },
    created() {
      NavBus.$on('leftNavToggled', () => this.shown = !this.shown);
    },
    methods:{
      redirect(route){
        this.$router.push(route);
      }
    }
  };

</script>
