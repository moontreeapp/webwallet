import { defineStore } from 'pinia'

export const useSignInFormStore = defineStore('signInForm', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
  } => ({
    isFaded: true,
    showComponent: false
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    reset() {
      this.$reset()
    }
  }
})
