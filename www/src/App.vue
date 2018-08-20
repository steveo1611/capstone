<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary top-header format">
        <a href="#" class="navbar-left">
        <router-link :to="{ name: 'Home'}" class="navbar-brand">
            <a>Home</a>
        </router-link>
        <router-link :to="{ name: 'myTrips'}" class="navbar-brand">
            <a>My Trips</a>
        </router-link>
        </a>

        <img src="./assets/whitelogo.png" width="280px">
     
      <a class="navbar-brand" @click="login" v-if="!(user._id)"><button type="button" class="btn btn-outline-light">Sign In/Login</button></a>
      <div v-if="user._id" class="d-flex flex-column">
        <a class="navbar-brand">User: {{user.displayName}}</a>
        <a class="navbar-brand btn btn-outline-light" @click="signOut">Sign out</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created() {
      this.$store.dispatch('endDemo')
      window.addEventListener('beforeunload', () => {
        if (this.$store.state.user.email == 'demo@demo.com') {
          this.$store.dispatch('endDemo')
          this.$store.dispatch('signOut')
        }
      })
    },
    methods: {
      login() {
        this.$router.push({ name: 'User' })
      },
      signOut() {
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;

}
/* .navbar-left{
   position: absolute;
   
} */

.format{
   /* box-shadow: 0px 5px 10px black; */
   /* margin-bottom: 15px; */
   
}
</style>
