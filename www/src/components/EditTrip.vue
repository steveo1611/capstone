<template>
  <div class="edit-trip mb-2">
    <div class="card-body">
      <router-link @click.native="selectActiveTrip(trip)" :to="{ name: 'Trip', params: { id: trip._id }}">
        <h2 class="card-title">{{trip.title}}</h2>
        <p class="card-text">{{trip.description}}</p>
      </router-link>
      <div class="mb-2">
        <button class="btn btn-success" @click="toggleEdit()">Edit</button>
        <form @keyup="updateTrip" v-on:submit.prevent="editTrip(edit)" class="form bgform" v-if="editBool">
          <input class="input" type="text" name="title" placeholder=" Title" id="title" v-model="edit.title">
          <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="edit.description">
          <button class="btn btn-primary btn-success mb-2 mt-2" type="submit">Submit</button>
        </form>
        <button type="button" class="btn btn-primary" @click="publishTrip(trip)" v-if="!trip.published">Publish</button>
<button type="button" class="btn btn-primary" @click="publishTrip(trip)" v-if="trip.published">Unpublish</button>
        <button type="button" class="btn btn-danger" @click="deleteTrip(trip)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-trip',
    props: {
      trip: {
        type: Object,
        required: true
      }
    },
    mounted() {
   
      this.edit = {
        title: this.trip.title,
        description: this.trip.description,
        author: this.trip.author,
        userId: this.trip.userId,
        _id: this.trip._id
      }
    },
    data() {
      return {
        editBool: false,
        edit: {
          title: '',
          description: '',
          author: '',
          userId: ''
        }
      }
    },
    computed: {},
    methods: {
      selectActiveTrip(trip) {
        this.$store.dispatch('selectActiveTrip', trip)
      },
      deleteTrip(trip) {
        this.$store.dispatch('deleteTrip', trip)
      },
      editTrip(edit) {
        var tripEdit = {
          title: edit.title,
          description: edit.description,
          author: edit.author,
          userId: edit.userId,
          _id: edit._id
        }
        this.$store.dispatch("editTrip", tripEdit);
        this.editBool = !this.editBool
      },
      toggleEdit() {
        this.editBool = !this.editBool
      },
      updateTrip() {
        this.$emit('setTrip', this.edit)
      },
      publishTrip(trip) {
        this.$store.dispatch("publishTrip", trip)
      }
    }
  }

</script>

<style>
</style>