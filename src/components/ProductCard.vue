<template>
  <div class="card h-100 overflow-hidden border border-0 shadow-lg">
    <div class="card__image overflow-hidden">
      <img :src="product.images[0].src" alt="Product" />
    </div>
    <div class="card__details p-3 text-center d-flex flex-column align-items-center flex-grow-1">
      <h2 class="card__name">{{ product.name }}</h2>
      <p class="card__category fw-light">{{ categories }}</p>
      <p class="card__description" v-html="product.short_description"></p>
      <div class="card__price fw-semibold fs-5 mb-4">
        {{ product.prices.price / 100 }} {{ product.prices.currency_code }}
      </div>
      <AddToCart href="https://greet.bg/?add-to-cart=5589" />
    </div>
  </div>
</template>
<script>
import AddToCart from './AddToCart.vue'

export default {
  name: 'ProductCard',
  components: { AddToCart },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  computed: {
    categories() {
      return this.product.categories.map((category) => category.name).join(', ')
    }
  }
}
</script>
<style lang="scss">
.card {
  transition: all 0.3s ease;
  &:hover {
    filter: brightness(0.85);
    .card__image {
      img {
        scale: 1.05;
      }
    }
  }
  .card__image {
    height: 350px;
    img {
      width: 100%;
      transition: all 0.3s ease;
    }
  }
  .card__details {
    .card__name {
      font-size: 24px;
    }
    .card__description {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
