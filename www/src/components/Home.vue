<script>
  import router from "../router";
  import destination from "./Destination";
  import mytrip from "./MyTrip";
  import createTrip from "./CreateTrip"

  export default {
    name: "Home",
    data() {
      return {
        destination: {
          title: ""
        },
        trip: {}
      };
    },
    components: {
      destination,
      mytrip,
      createTrip
    },
    computed: {
      userResults() {
        return this.$store.state.userResults;
      },
      apiResults() {
        return this.$store.state.apiResults;
      },
      trips() {
        var trips = this.$store.state.userTrips;
        console.log(trips, "this trips");
        return trips;
      }
    },
    mounted() {


      if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        router.push({ name: "User" }); //
      }
      this.$store.dispatch("getUsersTrips");
      this.$store.dispatch('clearResults')
    },
    methods: {
      getResults() {
        console.log(this.destination);
        this.$store.dispatch("findDestination", this.destination.title); // incomplete only has a title at the moment
        this.title = "";
      },
      addDestination(result) {
        this.$store.dispatch("selectActiveTrip", this.trip);
        this.$store.dispatch("addDestination", result);
      },
      selectActiveDest(userResult) {
        this.$store.dispatch("selectActiveDest", userResult);
        this.$router.push("Destination");
      }
    }
  };
</script>



<template>
  <div class="home">
    <!-- <h1>/test</h1> -->

    <section class="search vertical-center jumbotron bghome">

      <div class="container-fluid">

        <div class="textcolor mgmenu">


          <div class="row justify-content-center mx-auto bgmenu">
            <!-- create trip shit -->
            <div class="col-sm-2 justify-content-center">
              <create-trip></create-trip>
            </div>

            <div class="col-sm-2 mt-2 mb-2">
              <h5>Select Existing Trip</h5>
              <select v-model="trip">
                <option disabled value=''>Add Destination to Trip: </option>
                <option v-for="trip in trips" :key="trip._id" :value="trip">{{trip.title}}</option>
              </select>
            </div>

            <div class="col-sm-2 mt-2 ml-4">
              <form @submit.prevent="getResults">
                <input type="text" name="destination" id="destination" placeholder=" Where To?" v-model="destination.title">
                <button class="btn btn-primary btn-success btn-sm mt-2 mb-2" type="submit">Search</button>
              </form>
            </div>
            <!-- <div class="row">
                    <div class="col-12 mt-2">
                      <h4>Looking for destination ideas? Here are some ideas from other travelers.</h4>
                      <h4>Add new destinations below! </h4>
                    </div>
                  </div> -->

          </div>
        </div>

        <!-- </section>
      <section class="results jumbotron"> -->

        <!-- EVERYTHING BELOW IS THE SEARCH RESULT LAYOUT -->
        <!-- USER RESULTS -->
        <div class="rowing ur mt-2">

          <div class="column userResults" v-for="userResult in userResults" :key="userResult._id">
            <img :src="userResult.photo" alt="">
            <div class="test">
              <a @click="selectActiveDest(userResult)">
                <strong>{{userResult.title}}</strong>
              </a>
            </div>
            <p>Author: {{userResult.author}}</p>
          </div>

        </div>

        <!-- GOOGLE RESULTS -->
        <div class="rowing gr mt-2">
          <div class="column googleResults d-flex flex-row flex-wrap">
            <div v-for="result in apiResults" :key="result._id">
              <img :src="result.photo" alt="">
              <div class="test">
                <strong>{{result.name}}</strong>
                <button class="btn btn-primary btn-success btn-sm" @click="addDestination(result)" v-if="trips.length != 0">Add To Trip</button>
              </div>
              <mytrip v-if="trips.length == 0"></mytrip>
            </div>
          </div>

        </div>


      </div>
    </section>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .userResults {
    flex: 50%;
  min-width: 50%;
  padding: 0 4px; */

  .rowing {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* background: rgba(247, 247, 247, 0.589);
      color: white;
      border: 1px solid black;
      margin: 5px;
      padding: 10px; */

  /* float: left; */

  column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
  }

  @media screen and (max-width: 800px) {
    .column {
      flex: 50%;
      max-width: 50%;
    }
  }

  @media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }


  /* background: rgba(247, 247, 247, 0.589);
      color: white;
      border: 1px solid black;
      margin: 5px;
      padding: 10px; */

  /* float: left; */

  .userResults img {
    margin-top: 8px;
    vertical-align: top;
    float: top;

    /* height: 100px;
        width: auto; */
    /* float: right; */
  }

  .googleResults img {
    margin-top: 8px;
    vertical-align: middle;
    display: inline-block;
    /* height: 100px;
        width: auto; */
    /* float: right; */
  }

  /* .ur {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4px;
    }
    
    .gr {
      display: flex;
      flex-wrap: wrap;
      padding: 0 4px;
    }   */

  .bghome {
    background: url(../assets/tresting.jpg);
    /* background-repeat: no-repeat; */
    margin-top: 2em;
  }

  .textcolor {
    color: black;
  }

  .jumbotron {
    min-height: 600px;
    /* justify-content: center; */
  }


  .bgmenu {
    background: rgba(247, 247, 247, 0.589);
    border-color: rgba(0, 0, 0, 0.479);
    border-width: 0.2mm;
    border-style: solid;
    /* justify-content: center; */
  }

  .results {
    background: url(../assets/tresting.jpg);
  }

  /* h1,h2 {
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
} */

  /* select active destination */
</style>

<!-- Image Gallery Link https://www.w3schools.com/css/css_image_gallery.asp -->