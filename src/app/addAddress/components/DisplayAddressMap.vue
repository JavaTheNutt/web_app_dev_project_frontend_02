<template>
<div>
  <gmap-map :center="{lat:1.38, lng:103.8}" :zoom="12">
    <gmap-marker :position="{lat:1.38, lng:103.8}">
    </gmap-marker>
    <gmap-info-window :position="{lat:1.38, lng:103.8}">
      Hello world!
    </gmap-info-window>
  </gmap-map>
</div>
</template>
<script>
  export default{
    name: 'display-address-map'
  };
</script>
