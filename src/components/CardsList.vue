<template>
  <div class="container">
    <h1 class="text-center text-light pt-3 mb-5">Greet API</h1>
    <div class="row mb-4">
      <div class="col-md-6 col-12">
        <label for="sortInput" class="fs-2 fw-semibold text-light">Sort by:</label>
        <select
          name="sortBy"
          id="sortInput"
          ref="sortInput"
          class="form-select"
          @change="this.productsStore[$event.target.value]()"
        >
          <option value="" selected disabled hidden>Choose</option>
          <option value="sortNameAscending">Name (Ascending)</option>
          <option value="sortNameDescending">Name (Descending)</option>
          <option value="sortPriceAscending">Price (Ascending)</option>
          <option value="sortPriceDescending">Price (Descending)</option>
        </select>
      </div>
      <div class="col-md-6 col-12">
        <label for="filterInput" class="fs-2 fw-semibold text-light">Filter by:</label>
        <select
          name="filterBy"
          id="filterInput"
          class="form-select"
          @change="filterByCategory($event.target.value)"
        >
          <option
            v-for="(category, index) in productsStore.categories"
            :key="index"
            :value="category.id"
            :selected="category.id == selectedCategoryId"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
    <ul class="row justify-content-center p-0">
      <li
        v-for="(product, index) in productsStore.products"
        :key="index"
        class="col-xl-3 col-lg-4 col-md-6 col-12 mb-5"
      >
        <ProductCard :product="product" />
      </li>
    </ul>
    <div class="row justify-content-center align-items-center flex-column">
      <LoadingSpinner v-if="isLoading" />
      <p class="text-danger fs-2 fw-bold" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ProductCard from './ProductCard.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import { mapStores } from 'pinia'
import { useProductsStore } from '../stores/products'

export default {
  name: 'CardsList',
  components: { ProductCard, LoadingSpinner },
  data() {
    return {
      page: 1,
      totalPages: null,
      isLoading: false,
      error: null,
      allDataDownloaded: false,
      selectedCategoryId: null
    }
  },
  computed: {
    ...mapStores(useProductsStore)
  },
  methods: {
    async fetchData() {
      this.isLoading = true

      try {
        const result = await axios.get(
          `/api/wp-json/wc/store/products?per_page=12&page=${this.page}&category=${
            this.selectedCategoryId || ''
          }`
        )
        this.isLoading = false
        this.productsStore.addProducts(result.data)
        this.totalPages = result.headers['x-wp-totalpages']
        this.page++
      } catch (error) {
        this.isLoading = false
        this.error = error.message
      }

      if (this.page > this.totalPages) {
        this.allDataDownloaded = true
        return
      }
    },
    handleScroll() {
      if (this.isLoading) {
        return
      }
      if (this.allDataDownloaded) {
        window.removeEventListener('scroll', this.handleScroll)
      }
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        this.fetchData()
      }
    },
    filterByCategory(categoryId) {
      this.reset()
      this.productsStore.clearProducts()
      this.selectedCategoryId = categoryId
      this.fetchData()
    },
    reset() {
      this.page = 1
      this.allDataDownloaded = false
      this.selectedCategoryId = null
      this.$refs.sortInput.value = null
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  async mounted() {
    await this.fetchData()

    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style></style>
