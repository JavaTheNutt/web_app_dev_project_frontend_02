<template>
  <v-snackbar
    :timeout="timeout"
    bottom
    v-model="snackbarShown"
  >{{message}}
    <v-btn flat color="accent" @click.stop="snackbarShown = false">Close</v-btn>
  </v-snackbar>
</template>
<script>
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';
  export default {
    name: 'snackbar',
    data() {
      return {
        snackbarShown: false,
        timeout: 4000,
        bottom: true,
        message: '',
      };
    },
    created(){
      Bus.$on('show_snack', msg => {
        Logger.info('show snack message recived');
        this.showSnack(msg);
      });
    },
    methods:{
      showSnack(msg){
        Logger.info(`show snack message recived. showing "${msg}"`);
        this.message = msg;
        this.snackbarShown = true;
      }
    }

  };
</script>
