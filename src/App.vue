<template>
  <CardsList />
</template>

<script>
import CardsList from './components/CardsList.vue'

export default {
  name: 'App',
  components: { CardsList }
}
</script>

<style>
#app {
  background: #2c3e50;
  background: -webkit-linear-gradient(to right, #3498db, #2c3e50);
  background: linear-gradient(to right, #3498db, #2c3e50);
}
</style>
