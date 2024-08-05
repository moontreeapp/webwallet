import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center'

export const usePortfolioValueStore = defineStore('portfolioValue', {
  state: (): {
    isFaded: boolean
    hasPosition: Alignment
    portfolioValue: string
  } => ({
    isFaded: true,
    hasPosition: 'center',
    portfolioValue: '0'
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    setAlignment(newAlignment: Alignment) {
      this.hasPosition = newAlignment
    },
    setPortfolioValue(newPortfolioValue: string) {
      this.portfolioValue = newPortfolioValue
    },
    reset() {
      this.$reset()
    }
  }
})
