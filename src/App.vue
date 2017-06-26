<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import login from '@/api/login/index'
export default {
  name: 'app',
  mounted() {
    login.getToken().then((data) => {
      this.$store.dispatch('saveToken', data.data.data)
    })
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
