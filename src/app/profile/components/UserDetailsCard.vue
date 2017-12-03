<template>
  <v-card class="elevation-16">
    <v-container fluid>
      <v-layout align-center column class="pb-0 mb-0 pt-0 pb-0">
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-title primary-title><h3 class="headline mb-0 pb-0 text-xs-center">{{displayName}}</h3></v-card-title>
          </v-flex>
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-text subtitle><p class="subheading mt-0 pt-0 text-xs-center"><em>{{email}}</em></p></v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-avatar size="128px"><img :src="photoUrl" alt="profile picture"/></v-avatar>
        </v-flex>
      </v-layout>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn fab color="primary" dark @click.stop="editProfile">
            <v-icon>edit</v-icon>
          </v-btn>
      </v-card-actions>
    </v-container>
    <edit-user-dialog></edit-user-dialog>
  </v-card>
</template>
<script>
  import {mapGetters} from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  import defaultProfilePic from '@/assets/defaultProf.png';
  import ProfileBus from '../service/ProfileBus';
  import EditUserDialog from './EditUserDetailsDialog';

  import * as profileService from '../service/profileService';

  export default {
    components: {EditUserDialog},
    name: 'user-details-card',
    computed: {
      ...mapGetters({
        displayName: authTypes.getters.getDisplayName,
        userPhotoUrl: authTypes.getters.getPhotoUrl,
        email: authTypes.getters.getEmail
      }),
      photoUrl() {
        return this.userPhotoUrl !== '' ? this.userPhotoUrl : defaultProfilePic;
      },
      isFirebasePhoto(){
        return profileService.isFirebaseProfilePic(this.userPhotoUrl);
      }
    },
    methods:{
      editProfile(){
        ProfileBus.$emit('edit_profile');
      }
    }
  };
</script>
