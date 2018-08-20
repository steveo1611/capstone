<template>
  <div class="user-destination">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h3>{{currentDest.title}}</h3>
          <p>Author: {{currentDest.author}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button @click="toggleCreate" class="btn btn-primary">Create New Todo</button>
          <button @click="toggleAdd" class="btn btn-success">Add Todo</button>
          <create-todo v-if="displayCreate"></create-todo>
          <div class="todos">
            <add-todo v-if="displayAdd"></add-todo>
          </div>
          <todos></todos>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import todos from "./ToDos"
  import addTodo from "./AddTodo";
  import createTodo from "./CreateTodo"

  export default {
    mounted() {
    //  this.$store.dispatch('authenticate')
      this.$store.dispatch("getDestTodos", this.$route.params.id);
      this.$store.dispatch('clearResults')
    },
    name: "userDestination",
    components: {
      todos,
      addTodo,
      createTodo
    },
    data() {
      return {
        displayAdd: false,
        displayCreate: false
      };
    },
    computed: {
      currentDest() {
        return this.$store.state.activeDest
      }
    },
    methods: {
      toggleCreate() {
        this.displayCreate = !this.displayCreate
        this.displayAdd = false
      },
      toggleAdd() {
        this.displayAdd = !this.displayAdd
        this.displayCreate = false
      }
    }
  };
</script>

<style scoped>
  .toDo {
    background-color: lightseagreen;
  }

  .todos {
    width: 50vh;
    margin: auto;
  }
</style>