<template>
  <div>
    <div class="btn-container">
      <v-btn dark color="error" fab><i class="fa fa-google fa-3x"></i></v-btn>
      <v-btn dark color="primary" fab><i class="fa fa-facebook fa-3x"></i></v-btn>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'social-login'
  };
</script>
<style scoped>
.btn-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
