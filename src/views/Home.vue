<template>
  <div class="home">
    <Index msg="Welcome a tu proyecto.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Index from '@/components/Index.vue'

export default {
  name: 'Home',
  components: {
    Index
  }
}
</script>
