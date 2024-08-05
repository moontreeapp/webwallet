import { defineStore } from 'pinia'

export const useMintStore = defineStore('mintStore', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
  } => ({
    isFaded: true,
    showComponent: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    reset() {
      this.$reset()
    }
  }
})
