import { defineStore } from 'pinia'

export type Alignment = 'left' | 'center' | 'right'

export const useHoldingHeaderStore = defineStore('holdingHeader', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    showSubTitle: boolean
    isTitleFaded: boolean
    isSubTitleFaded: boolean
    hasPosition: Alignment
    holding: string
    title: string
    titleTrailing: number | string
    subTitle: string
    subTitleIcon: string
    iconColor: string
  } => ({
    isFaded: false,
    showComponent: true,
    showSubTitle: false,
    isTitleFaded: false,
    isSubTitleFaded: true,
    hasPosition: 'right',
    holding: '',
    title: '',
    titleTrailing: 0,
    subTitle: '',
    subTitleIcon: '',
    iconColor: ''
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setShowSubTitle(showSubTitle: boolean) {
      if (showSubTitle) {
        this.showSubTitle = true
      } else {
        this.showSubTitle = false
      }
    },
    toggleTitleOpacity() {
      this.isTitleFaded = !this.isTitleFaded
    },
    toggleSubTitleOpacity() {
      this.isSubTitleFaded = !this.isSubTitleFaded
    },
    setAlignment(newAlignment: Alignment) {
      this.hasPosition = newAlignment
    },
    setHolding(newHolding: string) {
      this.holding = newHolding
    },
    setTitle(newQuant: string) {
      this.title = newQuant
    },
    setTitleTrailing(newTrailing: number | string) {
      this.titleTrailing = newTrailing
    },
    setSubTitle(newSubTitle: string) {
      this.subTitle = newSubTitle
    },
    setSubTitleIcon(newIcon: string) {
      this.subTitleIcon = newIcon
    },
    reset() {
      this.$reset()
    }
  }
})
