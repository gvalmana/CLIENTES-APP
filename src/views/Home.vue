<template>
  <div class="home">
    <router-view></router-view>
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
