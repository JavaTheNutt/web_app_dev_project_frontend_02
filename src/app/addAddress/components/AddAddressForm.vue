<template>
  <form novalidate>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="address01Field"
            label="Address Line One"
            v-model="addressDetails.line01"
            required
            data-vv-name="address01"
            v-validate="'required|min:5'"
            :error-messages="errors.collect('address01')"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address02Field"
            label="Address Line Two"
            v-model="addressDetails.line02"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            name="address03Field"
            label="Address Line Three"
            v-model="addressDetails.line03"
            type="text"
          ></v-text-field>
        </v-flex>
       <!-- <div v-if="editField === 'profilePicture'">
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
        </div>-->
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  export default {
    name: 'add-address-form',
    data(){
      return {
        addressDetails: {
          line01: '',
          line02: '',
          line03: '',
        }
      };
    }
  };
</script>
