<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Hola msg="Bienvenido a tu proyecto.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hola from '@/components/Hola.vue'

export default {
  name: 'Home',
  components: {
    Hola
  }
}
</script>
