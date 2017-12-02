<template>
  <v-dialog v-model="isEdit" width="700" height="500">
    <v-card>
      <v-card-title primary-title><h3 class="headline mb-0 text-xs-center">Enter your new details</h3></v-card-title>
      <v-card-text>
        <form novalidate>
          <v-container fluid grid-list-md text-xs-center>
            <v-layout column>
              <v-flex>
                <v-radio-group v-model="editField" row>
                  <v-radio label="Name" value="name" color="primary"></v-radio>
                  <v-radio label="Profile Picture" value="profilePicture" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex v-if="editField === 'name'">
                <v-text-field
                  name="displayNameField"
                  label="Enter your name"
                  v-model="displayName"
                  type="text"
                ></v-text-field>
              </v-flex>
              <div v-if="editField === 'profilePicture'">
                <v-flex v-if="selectFileType === 'url'">
                  <v-text-field
                    name="profilePicField"
                    label="Enter an image url"
                    v-model="profilePicUrl"
                    type="text"
                  ></v-text-field>
                </v-flex>
                <v-flex v-if="selectFileType === 'file'">
                  <file-input :selectedCallback="fileSelected" title="select a profile picture"></file-input>
                </v-flex>
                <v-flex>
                  <v-radio-group v-model="selectFileType" row>
                    <v-radio label="URL" value="url" color="primary"></v-radio>
                    <v-radio label="File" value="file" color="primary"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex v-if="picUrlValid">
                  <img :src="profilePicUrl" alt="selected photo" style="max-width: 100%; max-height:150px;">
                </v-flex>
                <v-flex v-if="picFileValid">
                  <p>selected file name: {{profileFile.name}}</p>
                </v-flex>
              </div>
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
  import {updateUserName, updateUserProfilePic} from '@/app/auth/service/firebaseService';
  import FileInput from '../../widgets/fileInput/FileInput';

  export default {
    components: {FileInput},
    name: 'edit-user-dialog',
    data() {
      return {
        isEdit: false,
        displayName: '',
        profilePicUrl: '',
        selectFileType: 'url',
        editField: 'name',
        profileFile:{
          name: ''
        }
      };
    },
    computed: {
      formValid() {
        Logger.info(`display name: ${this.displayName}`);
        Logger.info(`res: ${this.displayName > 3}`);
        return this.hasUsername || this.hasPicUrl || this.hasPicFile;
      },
      hasUsername() {
        return this.editField === 'name' && this.displayName.length > 3;
      },
      hasPicUrl() {
        return this.editField === 'profilePicture'  && this.picUrlValid;
      },
      hasPicFile() {
        return this.editField === 'profilePicture'  && this.picFileValid;
      },
      picUrlValid(){
        return this.selectFileType === 'url' && /(https?:\/\/.*\.(?:png|jpe?g|svg|gif|bmp))/i.test(this.profilePicUrl);
      },
      picFileValid(){
        return this.selectFileType === 'file' && this.profileFile && this.profileFile.name && /\.(jpe?g|png|svg|gif|bmp)$/i.test(this.profileFile.name.toLowerCase());
      }
    },
    created() {
      ProfileBus.$on('edit_profile', () => this.isEdit = true);
      ProfileBus.$on('close_edit', () => this.isEdit = false);
    },
    methods: {
      saveDetails() {

      },
      saveName() {

      },
      saveProfilePicture() {

      },
      fileSelected(file) {
        Logger.info(`file ${JSON.stringify(file.name)}`);
        this.profileFile = file;
      }
    }
  };
</script>