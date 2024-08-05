import { defineStore } from 'pinia'
import { nextTick } from 'vue'

export const useSendPreviewFormStore = defineStore('sendPreviewForm', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    to: string
    holding: string
    valid: boolean
    resetTrigger: boolean
  } => ({
    isFaded: true,
    showComponent: false,
    to: '',
    holding: '',
    valid: true,
    resetTrigger: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    async setTo(newSendTo: string) {
      //! add security/validation checks here
      this.to = newSendTo
    },
    setHolding(newHolding: string) {
      this.holding = newHolding
    },
    setValid(newValid: boolean) {
      this.valid = newValid
    },
    async reset() {
      console.log('resetting')
      this.resetTrigger = !this.resetTrigger // triggers the listeners to reset
      await nextTick() // wait for the next tick to ensure the listeners have reset
      this.$reset()
    }
  }
})
