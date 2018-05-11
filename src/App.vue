<template>
  <div>
    <n-header :seller="seller"></n-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

import NHeader from 'components/header/n-header'
import Tab from "./components/tab/tab";
import {getGoodsList, getSeller} from "./api/goods";
import {ERR_OK} from "./api/config";

export default {

  name: 'App',
  components: {
    NHeader,
    Tab
  },
  data() {
    return {
      seller:{}
    }
  },
  created() {
    this._getSeller();
    this._getGoodsList()
  },
  methods: {
    _getSeller() {
      getSeller().then((res)=>{
        if (res.error == ERR_OK) {
          this.seller = res.data;
          console.log(res.data)
        }
      })
    },
    _getGoodsList() {
      getGoodsList().then((res)=>{
        if (res.error == ERR_OK) {
          console.log(res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
