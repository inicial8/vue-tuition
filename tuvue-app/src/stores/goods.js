import { defineStore } from 'pinia'

export const useGoodsStore = defineStore({
  id: 'goods',
  state: () => ({
    goodsList: [],
    product: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchGoods() {
      this.goodsList = []
      this.loading = true
      try {
        this.goodsList = await fetch('https://fakestoreapi.com/products')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id) {
      this.product = null
      this.loading = true
      try {
        this.product = await fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})