<template>
  <div>
      <v-Content></v-Content>
      <v-Footer></v-Footer>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'

export default {
  components:{
      'v-Content':Content,
      'v-Footer':Footer
  }
}
</script>

