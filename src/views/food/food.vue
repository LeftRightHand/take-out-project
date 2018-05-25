<template>
  <transition name="slide">
    <div class="food" @click="back">
      <img :src="food.image">
    </div>
  </transition>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    name: "food",
    props: {

    },
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      ...mapGetters([
        'food',
      ])
    },
    methods: {
      back() {
        this.$router.back()
      },
      show() {
        this.showFlag = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .food
    position fixed
    z-index: 100
    top 0
    left 0
    bottom 0
    right 0
    background #fff

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)

</style>
