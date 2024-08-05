import { defineStore } from 'pinia'

export type Area = 'wallet' | 'mint' | 'swap'

export const useNavBarStore = defineStore('navBar', {
  state: (): {
    currentArea: Area
    showComponent: boolean
  } => ({
    currentArea: 'wallet',
    showComponent: false
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    changeArea(newArea: Area) {
      this.currentArea = newArea
    },
    reset() {
      this.$reset()
    }
  }
})
