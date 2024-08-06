import { defineStore } from 'pinia'

export const useMaestroLockStore = defineStore('maestroLockStore', {
  state: (): {
    isLocked: boolean
  } => ({
    isLocked: false
  }),
  actions: {
    lock() {
      console.log('lock')
      this.isLocked = true
    },
    unlock() {
      console.log('unlock')
      this.isLocked = false
    },
    reset() {
      this.$reset()
    }
  }
})
