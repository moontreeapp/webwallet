import { defineStore } from 'pinia'

export const useSendFormStore = defineStore('sendForm', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    to: string
    amount: string
    fee: string
    total: string
    holding: string
    valid: boolean
  } => ({
    isFaded: true,
    showComponent: false,
    to: '',
    amount: '',
    fee: '005',
    total: '452',
    holding: '',
    valid: true
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
    async setAmount(newSendAmount: string) {
      //! add security/validation checks here
      this.amount = newSendAmount
    },
    setHolding(newHolding: string) {
      this.holding = newHolding
    },
    setValid(newValid: boolean) {
      this.valid = newValid
    },
    reset() {
      this.$reset()
    }
  }
})
