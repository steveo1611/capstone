<template>
  <div class="add-todo todo">
    <div class="find d-flex flex-row">
      <select name="Category" class="form-control" v-model="category" v-on:change="searchTodos">
        <option value="Select a Category" hidden>Select a Category</option>
        <option v-for="category in categories" :value="category">{{category}}</option>
      </select>
    </div>
    <div class="results" v-if="usersTodos.length + googleTodos.length > 0">
      <div class="userResults">
        <a v-for="todo in usersTodos" @click="addTodo(todo)">
          <p class="todo-result">{{todo.title}}</p>
        </a>
      </div>
      <div class="googleResults">
        <a v-for="todo in googleTodos" @click="addGoogleTodo(todo)">
          <p class="todo-result">{{todo.name}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addTodo',
    data() {
      return {
        category: 'Select a Category'
      }
    },
    mounted(){
  
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      usersTodos() {
        return this.$store.state.todos
      },
      googleTodos() {
        return this.$store.state.googleTodos
      }
    },
    methods: {
      searchTodos() {
        this.$store.dispatch('findTodos', this.category)
        this.$store.dispatch('clearResults')
      },
      addTodo(todo) {
        this.$store.dispatch('addTodo', todo)
        this.$store.dispatch('clearResults')
      },
      addGoogleTodo(todo) {
        this.$store.dispatch('addGoogleTodo', todo)
        this.$store.dispatch('clearResults')
      }
    }
  }

</script>

<style scoped>

  .results {
    z-index: 1;
    position: absolute;
    display: block;
    max-height: 50vh;
    overflow: auto;
  }
  .userResults {
    background: white;
    margin-bottom: 0; 
    opacity: 0.9;
  }

  .googleResults {
    background: white;
    opacity: 0.9;
  }

  .todo-result {
    
    margin: 0;
    width: 50vh;
  }

  .googleResults :hover {
    color: white;
    background: rgb(106, 106, 243);
    cursor: pointer;
  }

  .userResults :hover {
    color: white;
    background: rgb(106, 106, 243);
    cursor: pointer;
  }

  label{
  vertical-align:top;
  }
</style>