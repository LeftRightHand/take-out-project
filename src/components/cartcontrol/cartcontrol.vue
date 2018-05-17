<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food.count>0">
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>

  import vue from 'vue'

    export default {
      name: "cartcontrol",
      props: {
        food:{
          type: Object
        }
      },
      methods: {
        decreaseCart() {
          if (this.food.count) {
            this.food.count--
          }
        },
        addCart() {
          console.log('click')
          if (!this.food.count) {
            vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-weight 0
    .cart-decrease
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
      transition all 0.4s linear
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 200)

  &.move-enter-active, &.move-leave-active
    opacity 1
    transform: translate3d(0, 0, 0) rotate(0)
  &.move-enter, &.move-leave-to
    opacity: 0
    transform: translate3d(24px, 0, 0) rotate(360deg)

</style>
