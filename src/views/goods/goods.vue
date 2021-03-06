<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods"
              class="menu-item"
              :class="{'current':currentIndex === index}"
              @click="selectMenu(index)" ref="menuItem">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            <span >{{item.name}}</span>
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodsGroup">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectItem(food)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-text="food.description"></p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @cart-add="cartAdd" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
          <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
      </div>
      <shopcart :select-foods="selectFoods"
                :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice" ref="shopcart">
      </shopcart>
      <router-view></router-view>
    </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import {getGoodsList} from "../../api/goods";
  import {ERR_OK} from "../../api/config";
  import {iconNameList} from "../../common/js/const"
  import Shopcart from "../../components/shopcart/shopcart";
  import Cartcontrol from "../../components/cartcontrol/cartcontrol";
  import Food from "../food/food";
  import {mapMutations} from 'vuex'

  const iconName = iconNameList();

  const TILTLE_HEIGHT = 25;

  export default {
    components: {
      Food,
      Cartcontrol,
      Shopcart},
    name: "goods",
    props: {
      seller:{
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeigth:[],
        scrollY: 0,
        diff: -1
      }
    },
    watch: {
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TILTLE_HEIGHT) ? newVal - TILTLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      },
    },
    computed: {
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.goods[this.currentIndex] ? this.goods[this.currentIndex].name : ""
      },
      currentIndex() {
        for (let i = 0; i < this.listHeigth.length; i++) {
          let height1 = this.listHeigth[i];
          let height2 = this.listHeigth[i+1];
          if (!height2 || (-this.scrollY >= height1 && -this.scrollY < height2)) {
            this.diff = height2 + this.scrollY;
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if (food.count) {
              foods.push(food)
            }
          })
        });
        return foods
      }
    },
    created() {
      this.classMap = iconName;
      console.log(iconName);
      this._getGoodsList()
    },
    methods:{
      selectItem(item) {
        this.$router.push({
          path: '/goods/detail'
        })
        this.setFood(item)
      },
      cartAdd(target) {
        this.$refs.shopcart.drop(target)
      },
      selectMenu(index) {
        console.log(index);
        let foodList = this.$refs.foodsGroup;
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      _getGoodsList() {
        getGoodsList().then((res)=>{
          if (res.error == ERR_OK) {
            this.goods = res.data
            this.$nextTick(()=>{
              this._initScroll();
              this._calulateHeight()
            });
          }
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
          probeType: 3,
          click: true
        })
        this.foodScroll.on('scroll', (pos)=>{
          this.scrollY = pos.y
        })
      },
      _calulateHeight() {
        let foodList = this.$refs.foodsGroup
        let height = 0;
        this.listHeigth.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeigth.push(height)
        }
      },
      ...mapMutations({
        setFood: 'SET_FOOD'
      })
    },
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
        &.current
          background white
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          line-height 14px
          font-weight 200
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
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            font-weight bold
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 8px
            font-size 8px
            color rgb(147, 153, 159)
          .desc
            line-height 14px
            margin-bottom 8px
          .extra
            .count
              margin-right 14p
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 14px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
    .list-fixed
      position absolute
      top -1px
      left 80px
      width 100%
      .fixed-title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
</style>
