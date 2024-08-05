import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center' | 'right'

export const useMenuItemStore = (id: string) => {
  return defineStore(`menuItem-${id}`, {
    state: (): {
      showComponent: boolean
      pivotComponent: boolean
      hasPosition: Alignment
    } => ({
      showComponent: true,
      pivotComponent: false,
      hasPosition: 'center'
    }),
    actions: {
      toggleShow() {
        this.showComponent = !this.showComponent
      },
      togglePivot() {
        this.pivotComponent = !this.pivotComponent
      },
      setPosition(newPosition: Alignment) {
        this.hasPosition = newPosition
      },
      reset() {
        this.$reset()
      }
    }
  })
}
