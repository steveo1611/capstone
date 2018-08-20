<template>
  <div class="my-trips jumbotron">
    
    <create-trip></create-trip>
    <trips></trips>

  </div>
</template>

<script>
  import trips from './Trips'
  import createTrip from './CreateTrip'

  export default {
    name: 'myTrips',
    components: {
      trips,
      createTrip
    },
    mounted(){
      
      if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
    //  if(this.$store.state.user == null){
      //   this.$store.dispatch('authenticate')
     // }
     
      this.$store.dispatch('getUsersTrips')
    },
    data() {
      return {
      }
    },
    computed: {
      trips() {
        this.$store.state.trips
      }
    },
    methods: {

    }
  }

</script>

<style scoped>


  .my-trips {
    background-image: url(../assets/travel2.jpg);
  }
</style>