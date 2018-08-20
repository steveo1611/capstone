<template>
  <div class="comment">
    <button @click="toggleComment">Add Comment</button>
    <form v-on:submit.prevent="addComment(todo)" class="form" v-if="newComment">
      <input class="input" type="text" name="comment" placeholder=" comment" id="comment" v-model="comment.comment">
      <input class="input" type="url" name="image" placeholder=" image" id="image" v-model="comment.photo">
      <button class="btn btn-primary btn-success" type="submit">Add</button>
    </form>
      <div v-for="comment in todo.comments" :key="comment._id">
          <p>{{comment.comment}}</p>
          <img :src="comment.photo" alt="">
          <p>Author: {{comment.author}}</p>
          <button @click="deleteComment(todo)">Delete Comment</button>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        newComment: false,
        comment: {
          comment: '',
          photo: ''
        }
      }
    },
    mounted() {
  //   this.$store.dispatch('authenticate')
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      addComment(todo) {
        this.comment["author"] = this.user.displayName
        todo.comments.unshift(this.comment)
        this.$store.dispatch('editTodo', todo)
      },
      toggleComment() {
        this.newComment = !this.newComment
      },
     
      deleteComment(todo){
        console.log(todo.comments)
        todo.comments.splice(todo.comments._id, 1)
        console.log(todo.comments)
        this.$store.dispatch('deleteComment', todo)
      },
    }
  }

</script>

<style scoped>
</style>