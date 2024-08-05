import { defineStore } from 'pinia'

export const useHistoryListItemStore = defineStore('historyListItem', {
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
