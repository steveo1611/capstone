<template>
  <div class="edit-destination">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <img class="card-img-top" :src="destination.photo" alt="Card image cap">
          <router-link @click.native="selectActiveDest(destination)" :to="{ name: 'myDestination', params: { id: destination._id }}"
            :key="destination._id">
            <div class="card-body">
              <h5 class="card-title">{{destination.title}}</h5>
              <p>Author: {{destination.author}}</p>
            </div>
          </router-link>

          <div class="card-text">
              <button class="btn btn-success" @click="toggleEdit">Edit</button>
              <form @keyup="updateDest" v-on:submit.prevent="editDestination(edit)" class="form bgform d-flex flex-column" style="width: 80%; margin: auto;" v-if="editBool">
                <input class="input" type="text" name="title" placeholder=" Title" id="title" v-model="edit.title">
                <input class="input mt-2" type="text" name="description" placeholder=" Description" id="name" v-model="edit.photo">
                <button class="btn btn-primary btn-success mb-2 mt-2" type="submit">Submit</button>
              </form>
      
              <button type="button" class="btn btn-primary" @click="publishDest(destination)" v-if="!destination.published">Publish</button>
              <button type="button" class="btn btn-primary" @click="publishDest(destination)" v-if="!destination.published">Unpublish</button>
              <button type="button" class="btn btn-danger" @click="deleteDest(destination)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-destination',
    props: {
      destination: {
        type: Object,
        required: true
      }
    },
    mounted() {
      //  this.$store.dispatch('authenticate')
      this.edit = {
        title: this.destination.title,
        photo: this.destination.photo,
        place_id: this.destination.place_id,
        published: this.destination.published,
        tripId: this.destination.tripId,
        userId: this.destination.userId,
        lat: this.destination.lat,
        long: this.destination.long,
        _id: this.destination._id
      }
    },
    data() {
      return {
        editBool: false,
        edit: {
          title: "",
          photo: "",
          place_id: "",
          published: "",
          tripId: "",
          userId: "",
          lat: "",
          long: "",
          _id: ""
        }
      }
    },
    computed: {
      destinations() {
        return this.$store.state.destinations
      }
    },
    methods: {
      selectActiveDest(dest) {
        this.$store.dispatch('selectActiveDest', dest)
      },
      deleteDest(dest) {
        this.$store.dispatch('deleteDest', dest)
      },
      publishDest(dest) {
        dest.published = !dest.published;
        this.$store.dispatch("editDest", dest)
      },
      toggleEdit() {
        this.editBool = !this.editBool
      },
      editDestination(edit) {
        var editDest = {
          title: edit.title,
          photo: edit.photo,
          place_id: edit.place_id,
          published: edit.published,
          tripId: edit.tripId,
          userId: edit.userId,
          lat: edit.lat,
          long: edit.long,
          _id: edit._id
        }
        this.$store.dispatch("editDest", editDest);
        this.editBool = !this.editBool
      },
      updateDest() {
        this.$emit('setDest', this.edit)
      }
    }
  }

</script>

<style scoped>
</style>