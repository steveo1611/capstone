<template>
  <div class="destination">
    
    <div>
      <h2>{{activeDest.title}}</h2>
      
      <img :src="activeDest.photo" alt="">
      <div v-for="todo in todos" :key="todo._id">
        <img :src="todo.photo" alt="">
        <p>{{todo.title}}</p>
      </div>
    </div>
    <select v-model="trip">
      <option disabled value=''>Add Destination to Trip: </option>
      <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
    </select>
    <button @click="addDestination(activeDest)">Add destination to trip: </button>
  <!-- <router-link :to="{name: 'Home'}">Go Home</router-link> -->
  </div>
</template>

<script>
  export default {
    name: 'Destination',
    data() {
      return {
        destination: {},
        trip: {}
      }
    },
    mounted() {
     if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
    },
    computed: {
      activeDest() {
        return this.$store.state.activeDest
      },
      trips() {
        return this.$store.state.userTrips
      },
      todos(){
        return this.$store.state.userTodos
      }

    },
    methods: {
       addDestination(result) {
        this.$store.dispatch('selectActiveTrip', this.trip)
        this.$store.dispatch('addDestination', result)
        alert("Destination added to your trip")
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>