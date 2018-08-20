<template>
  <div class="trip">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col add-destination mb-2">
          <add-destination></add-destination>
        </div>
        <!-- </div> -->
        <!-- </div> -->
      </div>
      <div class="row">
        <div class="col-12 text-center mb-5">
          <google-map name="destination" :coords="destinations"></google-map>
        </div>
      </div>
      <div class="row">
        <div class="card-columns">
          <div v-for="destination in destinations" :key="destination._id">
            <edit-destination v-on:setDest="setDest" :destination="destination"></edit-destination>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import addDestination from './AddDestination'
  import editDestination from "./EditDestination"
  import googleMap from "./Map"

  export default {
    name: 'Trip',
    mounted() {
      //this.$store.dispatch('authenticate')
      this.$store.dispatch('clearResults')
    },
    components: {
      addDestination,
      editDestination,
      googleMap
    },
    data() {
      return {

      }
    },
    computed: {
      destinations() {
        console.log(this.$store.state.destinations, "destinations")
        return this.$store.state.destinations
      }
    },
    methods: {
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
      },
      deleteDest(dest) {
        this.$store.dispatch('deleteDest', dest)
      },
      publishDest(dest) {
        dest.published = !dest.published;
        this.$store.dispatch("editDest", dest)
      },
      setDest(dest) {
        var index = this.destinations.findIndex(d => {
          return d._id == dest._id
        })
        this.destinations.splice(index, 1, dest);
      }
    }
  }


</script>

<style scoped>
  .trip {
    background-image: url(../assets/travel2.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  .add-destination {
    background-color: rgba(247, 247, 247, 0.589);
  }

  .card-columns {
    display: inline-block;
    column-count: 4;
  }

  .user-destinations {
    background-color: rgba(247, 247, 247, 0.589);
  }
</style>