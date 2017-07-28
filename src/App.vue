<template>
  <div id="app">
    <router-view></router-view>
    <Loading :isShow="loadShow"></Loading>
  </div>
</template>

<script>
import login from '@/api/login/index'
import Loading from '@/components/Loading'
export default {
  name: 'app',
  computed: {
    loadShow() {
      return this.$store.state.loadShow
    }
  },
  mounted() {
    // login.getToken().then((data) => {
    //   this.$store.dispatch('saveToken', data.data.data)
    // })
  },
  beforeDestroy(){
   
  },
  components: {
    Loading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
