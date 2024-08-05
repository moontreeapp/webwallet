import { defineStore } from 'pinia'

export const useAppBarTitleStore = defineStore('appBarTitleStore', {
  state: (): {
    title: string
  } => ({
    title: 'Magic'
  }),
  actions: {
    setTitle(newTitle: string) {
      this.title = newTitle
    },
    reset() {
      this.$reset()
    }
  }
})
