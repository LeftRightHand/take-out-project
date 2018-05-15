<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            <span>{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-text="food.description"></p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>¥{{food.price}}</span>
                  <span v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import {getGoodsList} from "../../api/goods";
  import {ERR_OK} from "../../api/config";
  import {iconNameList} from "../../common/js/const"

  const iconName = iconNameList();

  export default {
    name: "goods",
    props: {
      seller:{
        type: Object
      }
    },
    data() {
      return {
        goods:[]
      }
    },
    computed: {

    },
    created() {
      this.classMap = iconName;
      console.log(iconName);
      this._getGoodsList()
    },
    methods:{
        _getGoodsList() {
          getGoodsList().then((res)=>{
            if (res.error == ERR_OK) {
              this.goods = res.data
            }
          })
        }
    }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 180px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          line-height 14px
          border-1px (rgba(7,17,27,0.1))
        .icon
          display inline-block
          width 10px
          height 10px
          margin-right 2px
          background-size 10px 10px
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
  
</style>