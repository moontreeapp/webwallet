import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center' | 'right'

export const useSettingItemStore = (id: string) => {
  return defineStore(`settingItem-${id}`, {
    state: (): {
      isFaded: boolean
      showComponent: boolean
      pivotComponent: boolean
      hasPosition: Alignment
    } => ({
      isFaded: false,
      showComponent: false,
      pivotComponent: false,
      hasPosition: 'right'
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
      toggleOpacity() {
        this.isFaded = !this.isFaded
      },
      reset() {
        this.$reset()
      }
    }
  })
}
