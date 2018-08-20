<template>
  <div id="toggleSwitches" class="carousel slide formatCarousel" data-ride="carousel" data-interval="1000" v-on:change="autoSlide()">
    <div class="carousel-inner">
      <div v-for="(img, index) in todo.gallery" v-bind:class="{active: index==activeImage, 'carousel-item': true} ">
        <img class="d-block w-100 img-fluid" style="height: 40vh;" :src="img" alt="">
      </div>
    </div>
    <span @click="prevImage()">
      <a class="carousel-control-prev" href="#toggleSwitches" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only" @click="prevImage">Previous</span>
      </a>
    </span>
    <span @click="nextImage(); autoSlide()">
      <a class="carousel-control-next" href="#toggleSwitches" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'carousel',
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeImage: 0,
        timer: null
      }
    },
    mounted() {
      this.autoSlide(false)
    },
    computed: {},
    methods: {
      nextImage() {
        this.autoSlide()
        if (this.activeImage == this.todo.gallery.length - 1) {
          this.activeImage = 0
        } else {
          this.activeImage++
        }
      },
      prevImage() {
        if (this.activeImage == 0) {
          this.activeImage = this.todo.gallery.length - 1
        } else {

          this.activeImage--
        }
      },
      autoSlide() {
        if(this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
            this.nextImage()
          }, 5000)
      }
    }
  }

</script>

<style>
</style>