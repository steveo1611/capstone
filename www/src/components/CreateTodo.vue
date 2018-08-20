<template>
  <div class="create-todo">
    <div>CreateToDo Component</div>
    <form v-on:submit.prevent="addTodo" class="form">
      <input class="input" type="text" name="title" placeholder=" title" id="email" v-model="todo.title">
      <input class="input" type="text" name="description" placeholder=" description" id="email" v-model="todo.description">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
    <div>
      <select name="Category" class="form-control" v-model="category">
        <option selected disabled>Select a Category</option>
        <option v-for="category in categories" :value="category">{{category}}</option>
      </select>
      <button @click="addCatergory">Add</button>
    </div>
    <div class="d-flex align-items-row">
      <p class="ml-3" v-for="(cat, index) in todo.categories" style="color: blue;">{{cat}}
        <a style="color: red;" @click="removeCategory(index)">x</a>
      </p>
    </div>
    <button @click=toggleImg>Add image</button>
    <div class="row">
      <div class="col" v-for="img in todo.gallery">
        <img :src="img" alt="">
      </div>
    </div>
    <form v-if="newImg" v-on:submit.prevent="addImg">
      <input type="url" name="img" placeholder="Image Url" id="img" v-model="todo.img">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'createTodo',
    data() {
      return {
        newImg: false,
        category: '',
        todo: {
          title: '',
          description: '',
          img: '',
          gallery: [],
          categories: []
        },
        lat: 0,
        long: 0
      }
    },
    mounted() {
      //  this.$store.dispatch('authenticate')
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getPos);
        }
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
    },
    methods: {
      toggleImg() {
        this.newImg = !this.newImg
      },
      addImg() {
        this.todo.gallery.unshift(this.todo.img)
        this.todo.img = ''
      },
      addTodo() {
        var newTodo = {
          title: this.todo.title,
          description: this.todo.description,
          gallery: this.todo.gallery,
          categories: this.todo.categories,
          lat: this.lat,
          long: this.long
        }
        this.$store.dispatch('addTodo', newTodo)
        this.todo = {
          title: '',
          description: '',
          img: '',
          gallery: [],
          categories: []
        }
      },
      getPos(position) {
        this.lat = position.coords.latitude
        this.long = position.coords.longitude
      },
      addCatergory() {
        if (this.category && !this.todo.categories.includes(this.category)) {
          this.todo.categories.push(this.category);
        }
      },
      removeCategory(i) {
        this.todo.categories.splice(i, 1)
      }
    }
  }

</script>

<style scoped>
</style>