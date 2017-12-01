<template>
  <v-dialog persistent v-model="shown">
    <v-card>
      <v-card-title class="headline">Confirm Account Link</v-card-title>
      <v-card-text>You have attempted to sign in using {{fetchName(providers.newProviderId)}}}, but you have already
        signed up using {{fetchName(providers.preferredProviderId)}} with the same email address. Would you like to also
        link your {{fetchName(providers.newProviderId)}} account?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info darken-1" flat @click.native="cancel">Disagree</v-btn>
        <v-btn color="info darken-1" flat @click.native="linkAccount">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import {mapGetters} from 'vuex';
  import types from '../vuex/types';
  import {fetchProviderNameFromId, handleAccountLink} from '../service/firebaseService';
  import Bus from '@/app/events/bus';

  export default {
    name: 'confirm-auth-link',
    data(){
      return {
        shown: false
      };
    },
    computed: {
      ...mapGetters({providers: types.getters.getProviders})
    },
    methods: {
      fetchName(id) {
        return fetchProviderNameFromId(id);
      },
      linkAccount(){
        handleAccountLink();
        this.shown = false;
      },
      cancel(){
        this.$store.dispatch(types.actions.resetProviderIds);
        this.shown = false;
      }
    },
    created() {
      Bus.$on('confirm_account_link', () => this.shown = true);
      Bus.$on('hide_confirm_account_link', () => this.shown = false);
    }
  };
</script>
