<template>
  <div class="map" v-if="coords.length > 0">
    <div class="google-map" :id="mapName"></div>
  </div>
</template>

<script>
  export default {
    name: 'googleMap',
    props: {
      coords: {
        type: Array,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    mounted() {

    },
    updated() {
      this.buildMap()
    },
    data() {
      return {
        mapName: this.name + "-map",
        coordinates: this.coords,
        markers: [],
        bounds: null,
        map: null
      }
    },
    computed: {

    },
    methods: {
      buildMap() {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)

        this.map = new google.maps.Map(element);
        this.coords.forEach((coord) => {
          const position = new google.maps.LatLng(coord.lat, coord.long);
          const marker = new google.maps.Marker({
            position,
            map: this.map,
            animation: google.maps.Animation.DROP,
            destination: coord
          });
          if (this.name == "destination") {
            google.maps.event.addListener(marker, "click", (e) => {
              this.selectActiveDest(marker.destination)
            });
          }
          this.markers.push(marker)
          this.map.fitBounds(this.bounds.extend(position))
        });
        this.map.setCenter(this.bounds.getCenter())

        if (this.coords.length == 1 && this.name == "destination") {
          this.map.setZoom(10)
        }
      },
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
        this.$router.push({ name: 'myDestination', params: { id: dest._id } })
      },
    }
  }

</script>

<style>
  .google-map {
    width: 80%;
    height: 50vh;
    margin: 0 auto;
    background: gray;
  }
</style>