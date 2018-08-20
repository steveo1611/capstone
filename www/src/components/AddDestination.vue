<template>
  <div class="add-destination tracker">
    <div class="row">
      <div class="col-12">
        <h1> {{currentTrip.title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col mb-2 search-box">
        <div class="d-flex flex-row justify-content-center">
          <div>
            <form v-on:submit.prevent="getDestination" class="form">
              <input class="input" type="text" name="title" :placeholder="placeholder" id="email" v-model="query">
            </form>
            <div class="results">
              <search-results></search-results>
            </div>
          </div>
          <button class="btn btn-primary btn-success submit-btn" @click="getDestination">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import searchResults from "./SearchResults"

  export default {
    name: "addDestination",

    mounted() {

      this.$store.dispatch('getTripDestinations', this.$route.params.id)
    },
    components: {
      searchResults
    },
    data() {
      return {
        toggleForm: false,
        query: '',
        placeholder: ' Where to?'
      };
    },
    computed: {
      currentTrip() {
        return this.$store.state.activeTrip
      }
    },
    methods: {
      toggleCreate() {
        this.toggleForm = !this.toggleForm;
      },
      getDestination() {
        var search = this.query
        this.$store.dispatch('findDestination', search)
        this.query = ''
        this.placeholder = search
      }
    }
  };
</script>

<style scoped>
  .results {
    z-index: 1;
    position: absolute;
    display: block;
    width: 30vh;
    border: 1px black;
    height: 50vh;
    overflow: auto;
  }

  .search-box {
    width: 100%;
  }

  input {
    width: 30vh;
  }
</style>