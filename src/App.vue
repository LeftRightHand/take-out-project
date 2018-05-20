<template>
  <div>
    <n-header :seller="seller"></n-header>
    <tab></tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">

import NHeader from 'components/header/n-header'
import Tab from "./components/tab/tab";
import {getSeller} from "./api/goods";
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
  },
  methods: {
    _getSeller() {
      getSeller().then((res)=>{
        if (res.error == ERR_OK) {
          this.seller = res.data;
        }
      })
    },

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
