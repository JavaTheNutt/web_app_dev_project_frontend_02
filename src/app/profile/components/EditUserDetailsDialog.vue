<template>
  <v-dialog v-model="isEdit" max-width="700" persistent>
    <v-card>
      <v-card-title primary-title><h3 class="headline mb-0 text-xs-center">Enter your new details</h3></v-card-title>
      <v-card-text>
        <form novalidate @submit.stop.prevent="submit">
          <v-container fluid grid-list-md text-xs-center>
            <v-layout column>
              <v-flex>
                <v-radio-group v-model="editField" row>
                  <v-radio label="Name" value="name" color="primary"></v-radio>
                  <v-radio label="Profile Picture" value="profilePicture" color="primary"></v-radio>
                  <v-radio label="Countries" value="countries" color="primary"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex v-if="editField === 'countries'">
                <manage-default-countries @countryAdded="countryAdded"></manage-default-countries>
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
        <div v-if="!loading">
          <v-btn flat color="primary" @click.stop="isEdit = false">Dismiss</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click.stop="saveDetails">Save</v-btn>
        </div>
        <div v-else>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import ProfileBus from '../service/ProfileBus';
  import * as Logger from 'loglevel';
  import {updateUserName, updateUserProfilePic} from '@/app/auth/service/firebaseService';
  import FileInput from '../../widgets/fileInput/FileInput';
  import * as profileService from '../service/profileService';
  import ManageDefaultCountries from './ManageDefaultCountries';

  export default {
    components: {
      ManageDefaultCountries,
      FileInput
    },
    name: 'edit-user-dialog',
    data() {
      return {
        isEdit: false,
        displayName: '',
        profilePicUrl: '',
        selectFileType: 'url',
        editField: 'name',
        profileFile: {
          name: ''
        },
        countriesChanged: false,
        newCountries: [],
        loading: false
      };
    },
    computed: {
      formValid() {
        Logger.info(`display name: ${this.displayName}`);
        Logger.info(`res: ${this.displayName > 3}`);
        return this.hasUsername || this.hasPicUrl || this.hasPicFile || this.countriesValid;
      },
      hasUsername() {
        return this.editField === 'name' && this.displayName.length > 3;
      },
      hasPicUrl() {
        return this.editField === 'profilePicture' && this.picUrlValid;
      },
      hasPicFile() {
        return this.editField === 'profilePicture' && this.picFileValid;
      },
      picUrlValid() {
        return this.selectFileType === 'url' && /(https?:\/\/.*\.(?:png|jpe?g|svg|gif|bmp))/i.test(this.profilePicUrl);
      },
      picFileValid() {
        return this.selectFileType === 'file' && this.profileFile && this.profileFile.name && /\.(jpe?g|png|svg|gif|bmp)$/i.test(this.profileFile.name.toLowerCase());
      },
      countriesValid() {
        return this.editField === 'countries' && this.countriesChanged;
      }
    },
    created() {
      ProfileBus.$on('edit_profile', () => this.isEdit = true);
      ProfileBus.$on('close_edit', () => this.isEdit = false);
    },
    methods: {
      submit() {
      },
      saveDetails() {
        this.loading = true;
        if (this.hasUsername) {
          return this.saveName();
        } else if (this.hasPicUrl || this.hasPicFile) {
          return this.saveProfilePicture();
        }
        return this.saveCountries();
      },
      async saveCountries() {
        await profileService.addDefaultCountries(this.newCountries);
        this.loading = false;
        this.isEdit = false;
      },
      async saveName  () {
        await updateUserName(this.displayName);
        this.loading = false;
        this.isEdit = false;
      },
      async saveProfilePicture() {
        if (this.picUrlValid) {
          Logger.info('picture url is valid, saving');
          await updateUserProfilePic(this.profilePicUrl);
        } else if (this.picFileValid) {
          Logger.info('pic file is valid, saving');
          await profileService.savePhoto(this.profileFile);
        } else{
          Logger.info('nothing to save');
        }
        this.loading = false;
        this.isEdit = false;
      },
      fileSelected(file) {
        Logger.info(`file ${JSON.stringify(file.name)}`);
        this.profileFile = file;
      },
      countryAdded(hasChanged, newCountries) {
        this.countriesChanged = hasChanged;
        this.newCountries     = newCountries;
      },
      resetValues(){
        //found at: https://stackoverflow.com/a/40856312/4108556 resets data object to initial
        Object.assign(this.$data, this.$options.data.call(this));
        //found at: https://github.com/baianat/vee-validate/issues/285
        this.$nextTick(function () {
          const self = this;
          Object.keys(this.fields).some(key => {
            self.$validator.flag(key, {
              untouched: true
            });
          });
          this.errors.clear();
        });
      }
    },
    watch:{
      isEdit(){
        if(!this.isEdit) this.resetValues();
      }
    }
  };
</script>
