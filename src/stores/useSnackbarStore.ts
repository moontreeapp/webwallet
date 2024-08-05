import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    title: string
    message: string
  } => ({
    isFaded: true,
    showComponent: false,
    title: 'Magic',
    message: 'Hello, World!'
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setTitle(newTitle: string) {
      this.title = newTitle
    },
    setMessage(newMessage: string) {
      this.message = newMessage
    },
    reset() {
      this.$reset()
    }
  }
})
