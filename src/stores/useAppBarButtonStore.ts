import { defineStore } from 'pinia'

export type AppBarIcon = 'menu' | 'left-chevron'

export const useAppBarButtonStore = defineStore('appBarButtonStore', {
  state: (): {
    icon: AppBarIcon
    showComponent: boolean
  } => ({
    icon: 'menu',
    showComponent: true
  }),
  actions: {
    changeIcon(newIcon: AppBarIcon) {
      this.icon = newIcon
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    reset() {
      this.$reset()
    }
  }
})
