import { defineStore } from 'pinia'

export const useReceiveStore = defineStore('receiveStore', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    qrCode: string
    holding: string
  } => ({
    isFaded: true,
    showComponent: false,
    qrCode: 'EfJVvdbkie462r879s6RqZpubF2Rrxxget',
    holding: ''
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    setQRCode(newQRCode: string) {
      this.qrCode = newQRCode
    },
    setHolding(newHolding: string) {
      this.holding = newHolding
    },
    reset() {
      this.$reset()
    }
  }
})
