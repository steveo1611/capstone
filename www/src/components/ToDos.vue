<template>
  <div class="current-todos">
    <!-- This will be the display for a users current todos at each destination -->
    <p>Fun activities for your destination!</p>
    <div class="row">
      <div class="col-12">
        <google-map name="todos" :coords="todos"></google-map>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-for="(todo, todoIndex) in todos" :key="todo._id">
          <h4>{{todo.title}}</h4>
          <h5>{{todo.description}}</h5>
          <p>Author: {{todo.author}}</p>

          <div v-if="todo.gallery.length > 0">
              <carousel :todo="todo"></carousel>
          </div>

          <button @click="toggleEdit">Edit</button>
          <form v-on:submit.prevent="editTodo(todo)" class="form" v-if="toggle">
            <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="todo.title">
            <input class="input" type="text" name="description" placeholder="description" id="descroption" v-model="todo.description">
            <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="img">
            <button class="btn btn-primary btn-success" type="submit">Make Change</button>
          </form>
        </div>
        <comment :todo="todo"></comment>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from "./Comment"
  import googleMap from "./Map"
  import carousel from "./Carousel"

  export default {
    name: 'Todos',
    components: {
      Comment,
      googleMap,
      carousel
    },
    data() {
      return {
        isActive: true,
        toggle: false,
        img: '',
        todo: {
          title: "",
          description: "",
          gallery: [],
        }
      }
    },
    mounted() {
      if (!this.$store.state.user._id) {
        // if no user id kick to the Login page
        this.$router.push({ name: "User" }); //
      }
      this.$store.dispatch('getDestTodos', this.$store.state.activeDest._id)
    },
    computed: {
      todos() {
        var todos = this.$store.state.userTodos
        console.log(this.$store.state.userTodos, "todos are computing and should be empty for now")
        return todos
      }
    },
    methods: {
      deleteTodo(todo) {
        this.$store.dispatch('deleteTodo', todo)
      },
      editTodo(todo) {
        todo.gallery.unshift(this.img)
        this.$store.dispatch('editTodo', todo)
        // this.todo.img = ''
      },
      toggleEdit() {
        this.toggle = !this.toggle;
      }
    }
  }

</script>

<style scoped>
  .formatCarousel {
    width: 60vh;
    margin: auto;
  }
</style>