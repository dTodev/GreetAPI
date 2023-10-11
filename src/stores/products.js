import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  getters: {
    categories(state) {
      let uniqueCategories = []

      state.products.forEach((product) => {
        product.categories.forEach((category) => {
          !uniqueCategories.some((entry) => entry.id == category.id) &&
            uniqueCategories.push(category)
        })
      })

      return uniqueCategories
    }
  },
  actions: {
    addProducts(newProducts) {
      this.products = [...this.products, ...newProducts]
    },
    clearProducts() {
      this.products = []
    },
    sortNameAscending() {
      this.products.sort((a, b) => a.name.localeCompare(b.name))
    },
    sortNameDescending() {
      this.products.sort((a, b) => -a.name.localeCompare(b.name))
    },
    sortPriceAscending() {
      this.products.sort((a, b) => a.prices.price - b.prices.price)
    },
    sortPriceDescending() {
      this.products.sort((a, b) => b.prices.price - a.prices.price)
    }
  }
})
