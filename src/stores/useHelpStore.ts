import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center' | 'right'

export const useHelpStore = defineStore('helpStore', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    hasPosition: Alignment
  } => ({
    isFaded: true,
    showComponent: false,
    hasPosition: 'right'
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setPosition(newPosition: Alignment) {
      this.hasPosition = newPosition
    },
    reset() {
      this.$reset()
    }
  }
})
