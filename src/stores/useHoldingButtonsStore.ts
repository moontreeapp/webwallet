import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center' | 'right'

export const useHoldingButtonsStore = defineStore('holdingButtons', {
  state: (): {
    showComponent: boolean
    isFaded: boolean
    hasPosition: Alignment
    canMint: boolean
  } => ({
    showComponent: true,
    isFaded: false,
    hasPosition: 'right',
    canMint: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    setAlignment(newAlignment: Alignment) {
      this.hasPosition = newAlignment
    },
    setCanMint(canMint: boolean) {
      this.canMint = canMint
    },
    toggleShowComponent() {
      this.showComponent = !this.showComponent
    },
    reset() {
      this.$reset()
    }
  }
})
