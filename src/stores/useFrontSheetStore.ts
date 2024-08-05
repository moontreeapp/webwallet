import { defineStore } from 'pinia'

export type SheetState = 'low' | 'mid' | 'high' | 'full'
export type RadiusState = '0px' | '16px'
export type ColorState = 'dark' | 'light'

export const useFrontSheetStore = defineStore('useFrontSheet', {
  state: (): {
    heightState: SheetState
    radiusState: RadiusState
    scrollable: boolean
    colorState: ColorState
  } => ({
    heightState: 'full',
    radiusState: '0px',
    scrollable: false,
    colorState: 'dark'
  }),
  actions: {
    toggleHeight() {
      console.log('Toggling state')
      if (this.heightState === 'low') {
        this.heightState = 'mid'
      } else if (this.heightState === 'mid') {
        this.heightState = 'low'
      } else if (this.heightState === 'high') {
        this.heightState = 'low'
      }
    },
    setHeight(newState: SheetState) {
      this.heightState = newState
    },
    setRadius(newState: RadiusState) {
      this.radiusState = newState
    },
    setScrollable(newState: boolean) {
      this.scrollable = newState
    },
    setColor(newState: ColorState) {
      this.colorState = newState
    },
    reset() {
      this.$reset()
    }
  },
  getters: {
    height(state) {
      return state.heightState
    },
    radius(state) {
      if (state.radiusState === '0px') {
        return state.radiusState
      } else if (state.radiusState === '16px') {
        return '16px 16px 0 0'
      }
    },
    scrollable(state) {
      return state.scrollable
    },
    color(state) {
      if (state.colorState === 'dark') {
        return '#121212'
      } else {
        return '#2E2E2E'
      }
    }
  }
})

// setup() {
//   const frontSheetStore = useFrontSheetHeightStore()

//   const toggleFrontSheetHeight = () => {
//     if (frontSheetStore.heightState === 'low') {
//       frontSheetStore.setState('mid')
//     } else if (frontSheetStore.heightState === 'high') {
//       frontSheetStore.setState('low')
//     } else {
//       frontSheetStore.setState('low') // Defaults to 'low' if it's currently 'mid'
//     }
//   }

//   const toggleExpand = () => {
//     // Define what toggling expand should do
//     console.log('Expand toggle clicked')
//   }

//   return { toggleFrontSheetHeight, toggleExpand }
// }
