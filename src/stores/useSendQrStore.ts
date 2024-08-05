import { defineStore } from 'pinia'
import { SendQrCode } from '../models/SendQrCode'

const placeholderQrCode = new SendQrCode({ to: '', amount: '' })

export const useSendQrStore = defineStore('sendQrStore', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    qrCode: SendQrCode
  } => ({
    isFaded: true,
    showComponent: false,
    qrCode: placeholderQrCode
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    setQrCode(newQRCode: SendQrCode) {
      this.qrCode = newQRCode
    },
    reset() {
      this.$reset()
    }
  }
})
