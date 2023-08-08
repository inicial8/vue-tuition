import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    username: '',
    loginDate: '',
    loading: false,
    error: null
  }),
  actions: {
    async login(username) {
      this.loading = true
      try {
        this.username = username
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
  }
})
