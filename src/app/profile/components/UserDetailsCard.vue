<template>
  <v-card>
    <v-container fluid>
      <v-layout align-center column>
        <v-flex xs12>
          <v-card-title primary-title><h3 class="headline mb-0 text-xs-center">{{displayName}}</h3></v-card-title>
        </v-flex>
        <v-flex xs12>
          <v-avatar size="128px"><img :src="photoUrl" alt="profile picture"/></v-avatar>
        </v-flex>
      </v-layout>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn fab color="primary" dark>
            <v-icon>edit</v-icon>
          </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  import defaultProfilePic from '@/assets/defaultProf.png';

  export default {
    name: 'user-details-card',
    computed: {
      ...mapGetters({
        displayName: authTypes.getters.getDisplayName,
        userPhotoUrl: authTypes.getters.getPhotoUrl
      }),
      photoUrl() {
        return this.userPhotoUrl !== '' ? this.userPhotoUrl : defaultProfilePic;
      }
    }
  };
</script>
