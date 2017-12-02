<template>
  <v-dialog v-model="isEdit">
    <v-card>
      <v-card-title primary-title><h3 class="headline mb-0 text-xs-center">Enter your new details</h3></v-card-title>
      <v-card-text>
        <form novalidate>
          <v-container fluid grid-list-md text-xs-center>
            <v-layout column>
              <v-flex>
                <v-text-field
                  name="displayNameField"
                  label="Enter your name"
                  v-model="displayName"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click.stop="isEdit = false">Dismiss</v-btn>
        <v-btn color="primary" :disabled="!formValid" @click.stop="saveDetails">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import ProfileBus from '../service/ProfileBus';
  import * as Logger from 'loglevel';
  import {updateUserName} from '@/app/auth/service/firebaseService';

  export default {
    name: 'edit-user-dialog',
    data() {
      return {
        isEdit: false,
        displayName: ''
      };
    },
    computed: {
      formValid() {
        Logger.info(`display name: ${this.displayName}`);
        Logger.info(`res: ${this.displayName > 3}`);
        return this.displayName.length > 3;
      }
    },
    created() {
      ProfileBus.$on('edit_profile', () => this.isEdit = true);
      ProfileBus.$on('close_edit', () => this.isEdit = false);
    },
    methods: {
      saveDetails() {
        updateUserName(this.displayName);
      }
    }
  };
</script>
