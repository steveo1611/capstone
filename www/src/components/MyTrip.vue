<template>
  
  <div class="my-trip">
    <div class="mb-2 mt-2"><h4>First Trip?</h4>
    
      <button class="btn btn-primary btn-success btn-sm" type="submit" @click="newTrip">Click Here</button> To Create A New Trip</div>

    <div class="create-trip" v-if="toggleForm"> 
      <form v-on:submit.prevent="createTrip" class="form">
        <input class="input" type="text" name="title" placeholder=" Title" id="email" v-model="trip.title">
        <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="trip.description">
        <div class="mb-2"></div>
        <button class="btn btn-primary btn-success mb-2" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
    name: 'myTrip',
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
  //    this.$store.dispatch('authenticate')
    },
    computed: {
  
    },
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
