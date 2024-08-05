import { defineStore } from 'pinia'

export type Position = 'left' | 'center' | 'right'

export const useOnboardingStore = defineStore('onboarding', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    dotActive: number
    isWelcomeToMagicFaded: boolean
    showWelcomeToMagicComponent: boolean
    welcomeToMagicPosition: Position
    isConnectYourPhoneFaded: boolean
    showConnectYourPhoneComponent: boolean
    connectYourPhonePosition: Position
    isInstallPhoneAppFaded: boolean
    showInstallPhoneAppComponent: boolean
    installPhoneAppPosition: Position
    showPairToPhoneComponent: boolean
    pairToPhonePosition: Position
    isPairToPhoneFaded: boolean
    installAppQrCode: string
  } => ({
    isFaded: false,
    showComponent: true,
    dotActive: 0,
    isWelcomeToMagicFaded: false,
    showWelcomeToMagicComponent: true,
    welcomeToMagicPosition: 'center',
    isConnectYourPhoneFaded: true,
    showConnectYourPhoneComponent: false,
    connectYourPhonePosition: 'right',
    isInstallPhoneAppFaded: true,
    showInstallPhoneAppComponent: false,
    installPhoneAppPosition: 'right',
    showPairToPhoneComponent: false,
    pairToPhonePosition: 'right',
    isPairToPhoneFaded: true,
    installAppQrCode: 'string-qr-code'
  }),
  actions: {
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    setDotActive(dotActive: number) {
      this.dotActive = dotActive
    },
    toggleWelcomeToMagicShow() {
      this.showWelcomeToMagicComponent = !this.showWelcomeToMagicComponent
    },
    setWelcomeToMagicPosition(newPosition: Position) {
      this.welcomeToMagicPosition = newPosition
    },
    toggleWelcomeToMagicOpacity() {
      this.isWelcomeToMagicFaded = !this.isWelcomeToMagicFaded
    },
    toggleConnectYourPhoneShow() {
      this.showConnectYourPhoneComponent = !this.showConnectYourPhoneComponent
    },
    setConnectYourPhonePosition(newPosition: Position) {
      this.connectYourPhonePosition = newPosition
    },
    toggleConnectYourPhoneOpacity() {
      this.isConnectYourPhoneFaded = !this.isConnectYourPhoneFaded
    },
    toggleInstallPhoneAppShow() {
      this.showInstallPhoneAppComponent = !this.showInstallPhoneAppComponent
    },
    setInstallPhoneAppPosition(newPosition: Position) {
      this.installPhoneAppPosition = newPosition
    },
    toggleInstallPhoneAppOpacity() {
      this.isInstallPhoneAppFaded = !this.isInstallPhoneAppFaded
    },
    togglePairToPhoneShow() {
      this.showPairToPhoneComponent = !this.showPairToPhoneComponent
    },
    setPairToPhonePosition(newPosition: Position) {
      this.pairToPhonePosition = newPosition
    },
    togglePairToPhoneOpacity() {
      this.isPairToPhoneFaded = !this.isPairToPhoneFaded
    },
    reset() {
      this.$reset()
    }
  }
})
