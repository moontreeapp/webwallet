import { defineStore } from 'pinia'

export const useSwapStore = defineStore('swapStore', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    baseAsset: string
    quoteAsset: string
  } => ({
    isFaded: true,
    showComponent: false,
    baseAsset: '',
    quoteAsset: ''
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setBaseAsset(newBaseAsset: string) {
      this.baseAsset = newBaseAsset
    },
    setQuoteAsset(newQuoteAsset: string) {
      this.quoteAsset = newQuoteAsset
    },
    reset() {
      this.$reset()
    }
  }
})
