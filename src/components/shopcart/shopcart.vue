<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></span>
          </div>
          <div v-show="totalCount>0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightlight':totalPrice>0}">¥{{totalPrice}}元</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "shopcart",
      props: {
        selectFoods: {
          type: Array,
          default() {
            return [
              {
                price: 0,
                count: 0
              }
            ];
          }
        },
        deliveryPrice:{
          type: Number,
          default: 0
        },
        minPrice:{
          type: Number,
          default: 0
        }
      },
      computed: {
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food)=>{
            total += food.price * food.count;
          });
          return total
        },
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food)=>{
            count += food.count;
          });
          return count
        },
        payDesc() {
          if (this.totalPrice === 0) {
            return `¥${this.minPrice}元起送`
          } else if (this.totalPrice<this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            return `还差¥${diff}元起送`
          } else {
            return '去结算'
          }
        },
        payClass() {
          if (this.totalPrice < this.minPrice) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          background #141d27
          border-radius 50%
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.hightlight
              background rgb(0,160,220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
              &.hightlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            background rgb(240,20,20)
            color white
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.2)
          font-size 16px
          font-weight 700
          color: rgba(255,255,255,0.4)
          &.hightlight
            color white
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
          color: rgba(255,255,255,0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          color: rgba(255,255,255,0.4)
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color white
</style>
