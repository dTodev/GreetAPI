<template>
  <a :href="href" target="_blank" class="btn btn-dark w-50 my-3 rounded-pill mt-auto"
    >Add to cart</a
  >
</template>
<script>
export default {
  name: 'AddToCart',
  props: {
    href: {
      type: String,
      default: '#'
    }
  }
}
</script>
<style></style>
