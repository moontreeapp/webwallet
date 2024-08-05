import { defineStore } from 'pinia'

export type Place =
  | 'sign-in'
  | 'welcome-to-magic'
  | 'safe-simple-secure'
  | 'install-phone-app'
  | 'pair-to-phone'
  | 'holdings'
  | 'history'
  | 'transaction'
  | 'send-preview'
  | 'send-qr'
  | 'qr-code-scanner'
  | 'receive'
  | 'menu'
  | 'help'
  | 'settings'
  | 'about'
  | 'swap'
  | 'mint'

export const useMaestroPlaceStore = defineStore('maestroPlace', {
  state: (): {
    place: Place
  } => ({
    place: 'sign-in'
  }),
  actions: {
    changePlace(newPlace: Place) {
      this.place = newPlace
    },
    reset() {
      this.$reset()
    }
  }
})
