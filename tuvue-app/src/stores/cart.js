import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    goodsListInCart: [],
    loading: false,
    error: null,
  }),
  getters: {
    getGoodsTotal() {
      let total = 0
      this.goodsListInCart.forEach(item => total += item.count-1)
      return this.goodsListInCart.length + total
    }
  }, 
  actions: {
    async add(item) {
      this.loading = true
      try {
        let index = this.goodsListInCart.findIndex(obj => obj.id === item.id)
        if(index !== -1) {
          this.goodsListInCart[index].count += 1
        } else {
          item.count = 1
          this.goodsListInCart.push(item)
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async remove(id) {
      this.loading = true
      try {
        this.goodsListInCart = this.goodsListInCart.filter((goods) => goods.id === id)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
