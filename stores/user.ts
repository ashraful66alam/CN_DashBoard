import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    actions: {
        setUser(userData: any) {
            this.user = userData
        },
        clearUser() {
            this.user = null
        }
    },
    persist: true // 🔥 this enables auto-persistence
})
