import { defineStore } from 'pinia'

export const useBacksheetTopContainerStore = defineStore('backsheetTopContainerStore', {
  state: (): {
    showComponent: boolean
  } => ({
    showComponent: true
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    reset() {
      this.$reset()
    }
  }
})
