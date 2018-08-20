<template>
  <div class="trips mt-2">
    <div class="row justify-content-center">
      <div class="col-md-3 ml-2 mt-3 card" style="width: 18rem;" v-for="trip in trips">
        <editTrip v-on:setTrip="setTrip" :trip="trip"></editTrip>
      </div>
    </div>
  </div>
</template>
<script>
  import editTrip from "./EditTrip"
  export default {
    name: 'trips',
    components: {
      editTrip
    },
    data() {
      return {

      }
    },
    mounted() {
   
    },
    computed: {
      trips() {
        return this.$store.state.userTrips
      }
    },
    methods: {
      setTrip(trip) {
        var index = this.trips.findIndex(t => {
          return t._id == trip._id
        })
        this.trips.splice(index, 1, trip);
      },
    }
  }

</script>

<style scoped>
  .card {
    background-color: rgba(244, 246, 247, 0.904);
    color: white;
    background-repeat: repeat
  }

  .jumbotron {
    min-height: 600px;
  }
</style>