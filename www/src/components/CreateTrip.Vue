<template>
  
  <div class="row justify-content-center"> 

  <div class="create-trip col-md-9 ">
  <center><button class="btn btn-primary btn-success mt-3 mb-2" @click="newTrip">Start New Trip</button></center>
    <div class="create-trip" v-if="toggleForm">
      <form v-on:submit.prevent="createTrip" class="form bgform">
        <input class="input" type="text" name="title" placeholder=" Title" id="email" v-model="trip.title">
        <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="trip.description">
        <button class="btn btn-primary btn-success mb-2 mt-2" type="submit">Create</button>
      </form>
    </div>
    
  </div>
</div>
</template>

<script>
  export default {
    name: 'CreateTrip',
    data() {
      return {
        trip: {
          title: "",
          description: ""
        },
        toggleForm: false
      }
    },
    mounted() {
    if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
    },
    computed: {},
    methods: {
      createTrip() {
        this.$store.dispatch("createTrip", this.trip);
        this.toggleForm = !this.toggleForm
      },
      newTrip() {
        this.toggleForm = !this.toggleForm
      },
      
    }
  }

</script>

<style scoped>
  .card {
   
   background-color: rgba(122, 122, 122, 0.795);
   color: white;

 }
</style>