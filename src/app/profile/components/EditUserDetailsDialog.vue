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
        <v-btn color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import ProfileBus from '../service/ProfileBus';

  export default {
    name: 'edit-user-dialog',
    data() {
      return {
        isEdit: false,
        displayName: ''
      };
    },
    created() {
      ProfileBus.$on('edit_profile', () => this.isEdit = true);
      ProfileBus.$on('close_edit', () => this.isEdit = false);
    }
  };
</script>
