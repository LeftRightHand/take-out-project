<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/goods">
      <span class="tab-link">商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/comment">
      <span class="tab-link">评论</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">商家</span>
    </router-link>
  </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"

  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: 16px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: rgb(77, 85, 93)
      &.router-link-active
        .tab-link
          color: rgb(240, 20, 20)
          border-bottom: 2px solid rgb(240, 20, 20)
</style>
