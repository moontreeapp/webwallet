import { useMaestroLockStore } from '../stores/useMaestroLockStore'
import { useFrontSheetStore } from '@/stores/useFrontSheetStore'
import { usePortfolioValueStore } from '@/stores/usePortfolioValueStore'
import { useHoldingHeaderStore } from '@/stores/useHoldingHeaderStore'
import { useMaestroPlaceStore, type Place } from '@/stores/useMaestroPlaceStore'
import { useAppBarButtonStore } from '@/stores/useAppBarButtonStore'
import { useAppBarTitleStore } from '@/stores/useAppBarTitleStore'
import { useHoldingButtonsStore } from '@/stores/useHoldingButtonsStore'
import { useHistoryListItemStore } from '@/stores/useHistoryListItemStore'
import { useMenuItemStore } from '@/stores/useMenuItemStore'
import { useSignInFormStore } from '@/stores/useSignInFormStore'
import { useSendPreviewFormStore } from '@/stores/useSendPreviewFormStore'
import { useReceiveStore } from '@/stores/useReceiveStore'
import { useTransactionHistoryStore } from '@/stores/useTransactionHistoryStore'
import { useQrCodeScannerStore } from '@/stores/useQrCodeScannerStore'
import { fadeDuration, offsetDuration, slideDuration } from '@/utils/animationUtils'
import { menuItems } from '@/components/MenuItem.vue'
import { useSettingItemStore } from '../stores/useSettingItemStore'
import { settingItems } from '../components/SettingsItem.vue'
import { nextTick } from 'vue'
import { useHoldingsListStore } from '../stores/useHoldingsListStore'
import type { Holding } from '../models/Holding'
import { useHoldingStore } from '../stores/useHoldingStore'
import { useSendQrStore } from '../stores/useSendQrStore'
import { useOnboardingStore } from '../stores/useOnboardingStore'
import { useSwapStore } from '../stores/useSwapStore'
import { useMintStore } from '../stores/useMintStore'
import { useAboutStore } from '../stores/useAboutStore'
import { useBacksheetTopContainerStore } from '../stores/useBacksheetTopContainerStore'
import { useHelpStore } from '../stores/useHelpStore'

export const MaestroService = {
  async goToSignIn() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Sign In')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('sign-in')
    } catch (error) {
      console.error('Error in goToSignIn:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToWelcomeToMagic() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Welcome to Magic')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('welcome-to-magic')
      const onboardingStore = useOnboardingStore()
      onboardingStore.setDotActive(0)
    } catch (error) {
      console.error('Error in goToWelcomeToMagic:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToConnectYourPhone() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Safe Simple Secure')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('safe-simple-secure')
      const onboardingStore = useOnboardingStore()
      onboardingStore.toggleWelcomeToMagicOpacity()
      onboardingStore.setWelcomeToMagicPosition('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      onboardingStore.toggleWelcomeToMagicShow()
      onboardingStore.toggleConnectYourPhoneShow()
      onboardingStore.toggleConnectYourPhoneOpacity()
      onboardingStore.setConnectYourPhonePosition('center')
      onboardingStore.setDotActive(1)
    } catch (error) {
      console.error('Error in goToConnectYourPhone:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToInstallPhoneApp() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Install App')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('install-phone-app')
      const onboardingStore = useOnboardingStore()
      onboardingStore.toggleConnectYourPhoneOpacity()
      onboardingStore.setConnectYourPhonePosition('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      onboardingStore.toggleConnectYourPhoneShow()
      onboardingStore.toggleInstallPhoneAppShow()
      onboardingStore.toggleInstallPhoneAppOpacity()
      onboardingStore.setInstallPhoneAppPosition('center')
      onboardingStore.setDotActive(2)
    } catch (error) {
      console.error('Error in goToInstallPhoneApp:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToPairToPhone() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Pair Phone')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('pair-to-phone')
      const onboardingStore = useOnboardingStore()
      onboardingStore.toggleInstallPhoneAppOpacity()
      onboardingStore.setInstallPhoneAppPosition('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      onboardingStore.toggleInstallPhoneAppShow()
      onboardingStore.togglePairToPhoneShow()
      onboardingStore.togglePairToPhoneOpacity()
      onboardingStore.setPairToPhonePosition('center')
      onboardingStore.setDotActive(3)
    } catch (error) {
      console.error('Error in goToPairToPhone:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToHoldings() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      const maestroPlaceStore = useMaestroPlaceStore()
      await goToHoldingsFrom(maestroPlaceStore.place)
      maestroPlaceStore.changePlace('holdings')
    } catch (error) {
      console.error('Error in goToHoldings:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToHistory(holding?: Holding) {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log(`Navigating to ${history}`)
      const holdingStore = useHoldingStore()
      if (holding) {
        holdingStore.setHolding(holding)
      }
      const maestroPlaceStore = useMaestroPlaceStore()
      await goToHistoryFrom(maestroPlaceStore.place)
      maestroPlaceStore.changePlace('history')
    } catch (error) {
      console.error('Error in goToHistory:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToTransaction() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Transaction')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('transaction')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle('Transaction')
      const historyListItemStore = useHistoryListItemStore()
      historyListItemStore.toggleOpacity()
      const holdingButtonsStore = useHoldingButtonsStore()
      holdingButtonsStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingButtonsStore.toggleShowComponent()
      historyListItemStore.toggleShow()
      const transactionHistoryStore = useTransactionHistoryStore()
      transactionHistoryStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      transactionHistoryStore.toggleOpacity()
    } catch (error) {
      console.error('Error in goToTransaction:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToSendPreview() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Send Preview')
      const maestroPlaceStore = useMaestroPlaceStore()
      await goToSendPreviewFrom(maestroPlaceStore.place)
      maestroPlaceStore.changePlace('send-preview')
    } catch (error) {
      console.error('Error in goToSendPreview:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToSendQr() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Send QR')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('send-qr')
      const holdingHeaderStore = useHoldingHeaderStore()
      holdingHeaderStore.toggleTitleOpacity()
      const sendPreviewFormStore = useSendPreviewFormStore()
      sendPreviewFormStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingHeaderStore.setTitle('Send')
      holdingHeaderStore.setTitleTrailing('')
      holdingHeaderStore.setSubTitle('Scan to Approve')
      holdingHeaderStore.setSubTitleIcon('mdi-cellphone-key')
      holdingHeaderStore.setShowSubTitle(true)
      sendPreviewFormStore.toggleShow()
      const sendQrStore = useSendQrStore()
      sendQrStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      sendQrStore.toggleOpacity()
      holdingHeaderStore.toggleTitleOpacity()
      holdingHeaderStore.toggleSubTitleOpacity()
    } catch (error) {
      console.error('Error in goToSendQr:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToQrCodeScanner() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to QR Code Scanner')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('qr-code-scanner')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle('Scan')
      const sendPreviewFormStore = useSendPreviewFormStore()
      sendPreviewFormStore.toggleOpacity()
      const holdingHeaderStore = useHoldingHeaderStore()
      const holdingStore = useHoldingStore()
      holdingHeaderStore.toggleTitleOpacity()
      holdingHeaderStore.toggleSubTitleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingHeaderStore.setTitle('Send To')
      holdingHeaderStore.setTitleTrailing('')
      holdingHeaderStore.setSubTitle(holdingStore.holding.blockchain.name)
      holdingHeaderStore.toggleTitleOpacity()
      holdingHeaderStore.toggleSubTitleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      sendPreviewFormStore.toggleShow()
      const qRcodeScannerStore = useQrCodeScannerStore()
      qRcodeScannerStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      qRcodeScannerStore.toggleOpacity()
    } catch (error) {
      console.error('Error in goToQrCodeScanner:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToReceive() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Receive')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('receive')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle(`Receive`)
      const holdingButtonsStore = useHoldingButtonsStore()
      holdingButtonsStore.toggleOpacity()
      const historyListItemStore = useHistoryListItemStore()
      historyListItemStore.toggleOpacity()
      const holdingHeaderStore = useHoldingHeaderStore()
      const holdingStore = useHoldingStore()
      holdingHeaderStore.toggleTitleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingHeaderStore.setShowSubTitle(true)
      holdingHeaderStore.setTitle('Send To Me')
      holdingHeaderStore.setTitleTrailing('')
      holdingHeaderStore.setSubTitle(holdingStore.holding.name)
      historyListItemStore.toggleShow()
      holdingButtonsStore.toggleShowComponent()
      const receiveStore = useReceiveStore()
      receiveStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      holdingHeaderStore.toggleTitleOpacity()
      holdingHeaderStore.toggleSubTitleOpacity()
      receiveStore.toggleOpacity()
    } catch (error) {
      console.error('Error in goToReceive:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToHelp() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Help')
      const maestroPlaceStore = useMaestroPlaceStore()
      const portfolioValueStore = usePortfolioValueStore()
      const menuItemStore = useMenuItemStore('help')()
      const appBarTitleStore = useAppBarTitleStore()
      const helpStore = useHelpStore()
      const appBarButtonStore = useAppBarButtonStore()
      const backsheetTopContainerStore = useBacksheetTopContainerStore()
      maestroPlaceStore.changePlace('help')
      await togglePivotOtherMenuItems('help')
      portfolioValueStore.setAlignment('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      menuItemStore.togglePivot()
      appBarButtonStore.changeIcon('left-chevron')
      appBarTitleStore.setTitle('Help')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      await toggleShowOtherMenuItems('help')
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      helpStore.toggleShow()
      backsheetTopContainerStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      helpStore.toggleOpacity()
      helpStore.setPosition('center')
    } catch (error) {
      console.error('Error in goToHelp:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToSettings() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Settings')
      await togglePivotOtherMenuItems('settings')
      const portfolioValueStore = usePortfolioValueStore()
      portfolioValueStore.setAlignment('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      const menuItemStore = useMenuItemStore('settings')()
      menuItemStore.togglePivot()
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('settings')
      const appBarButtonStore = useAppBarButtonStore()
      appBarButtonStore.changeIcon('left-chevron')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle('Settings')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      await toggleShowOtherMenuItems('settings')
      await toggleShowSettingItems()
      await togglePositionSettingItems()
    } catch (error) {
      console.error('Error in goToSettings:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToAbout() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to About')
      const maestroPlaceStore = useMaestroPlaceStore()
      const portfolioValueStore = usePortfolioValueStore()
      const menuItemStore = useMenuItemStore('about')()
      const appBarTitleStore = useAppBarTitleStore()
      const aboutStore = useAboutStore()
      const appBarButtonStore = useAppBarButtonStore()
      const backsheetTopContainerStore = useBacksheetTopContainerStore()
      maestroPlaceStore.changePlace('about')
      await togglePivotOtherMenuItems('about')
      portfolioValueStore.setAlignment('left')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      menuItemStore.togglePivot()
      appBarButtonStore.changeIcon('left-chevron')
      appBarTitleStore.setTitle('About')
      await new Promise((resolve) => setTimeout(resolve, slideDuration))
      await toggleShowOtherMenuItems('about')
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      aboutStore.toggleShow()
      backsheetTopContainerStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      aboutStore.toggleOpacity()
      aboutStore.setPosition('center')
    } catch (error) {
      console.error('Error in goToAbout:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToMenu() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Menu')
      const maestroPlaceStore = useMaestroPlaceStore()
      await goToMenuFrom(maestroPlaceStore.place)
    } catch (error) {
      console.error('Error in goToMenu:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToSwap() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Swap')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('swap')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle('Swap')
      const holdingButtonsStore = useHoldingButtonsStore()
      holdingButtonsStore.toggleOpacity()
      const historyListItemStore = useHistoryListItemStore()
      historyListItemStore.toggleOpacity()
      const holdingHeaderStore = useHoldingHeaderStore()
      holdingHeaderStore.toggleTitleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingButtonsStore.toggleShowComponent()
      historyListItemStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      const swapStore = useSwapStore()
      swapStore.toggleShow()
      holdingHeaderStore.setTitle('Coming Soon')
      holdingHeaderStore.setTitleTrailing('')
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      holdingHeaderStore.toggleTitleOpacity()
      swapStore.toggleOpacity()
    } catch (error) {
      console.error('Error in goToSwap:', error)
    } finally {
      maestroLockStore.unlock()
    }
  },

  async goToMint() {
    const maestroLockStore = useMaestroLockStore()
    if (maestroLockStore.isLocked) return
    maestroLockStore.lock()

    try {
      console.log('Navigating to Mint')
      const maestroPlaceStore = useMaestroPlaceStore()
      maestroPlaceStore.changePlace('mint')
      const appBarTitleStore = useAppBarTitleStore()
      appBarTitleStore.setTitle('Mint')
      const holdingButtonsStore = useHoldingButtonsStore()
      holdingButtonsStore.toggleOpacity()
      const historyListItemStore = useHistoryListItemStore()
      historyListItemStore.toggleOpacity()
      const holdingHeaderStore = useHoldingHeaderStore()
      holdingHeaderStore.toggleTitleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      holdingButtonsStore.toggleShowComponent()
      historyListItemStore.toggleShow()
      holdingHeaderStore.setTitle('Coming Soon')
      holdingHeaderStore.setTitleTrailing('')
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      const mintStore = useMintStore()
      mintStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      holdingHeaderStore.toggleTitleOpacity()
      mintStore.toggleOpacity()
    } catch (error) {
      console.error('Error in goToMint:', error)
    } finally {
      maestroLockStore.unlock()
    }
  }
}

// -----------------------------------------------------------------------------
// Private Helper Functions
// -----------------------------------------------------------------------------
async function goToHoldingsFrom(place: Place) {
  if (place === 'menu') {
    // Set the front sheet height
    const frontSheetHeightStore = useFrontSheetStore()
    frontSheetHeightStore.toggleHeight()
    // Set the portfolio value visibility
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.toggleOpacity()
  } else if (place === 'sign-in') {
    // Set the sign in form opacity
    const signInFormStore = useSignInFormStore()
    signInFormStore.toggleOpacity()
    // Set the front sheet radius
    const frontSheetHeightStore = useFrontSheetStore()
    frontSheetHeightStore.setRadius('16px')
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    // Set the sign in form visibility
    signInFormStore.toggleShow()
    // Set the front sheet color
    frontSheetHeightStore.setColor('light')
    // Set the front sheet height
    frontSheetHeightStore.setHeight('mid')
    // Wait for slide animation
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    // Set the portfolio value visibility
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.toggleOpacity()
    // Set the holding amount alignment
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.setAlignment('right')
    // Set the holding amount visibility
    holdingHeaderStore.toggleOpacity()
    // Set the holding list item visibility
    const holdingsListStore = useHoldingsListStore()
    holdingsListStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingsListStore.toggleOpacity()
  } else if (place === 'pair-to-phone') {
    // Set the sign in form opacity
    const onboardingStore = useOnboardingStore()
    onboardingStore.toggleOpacity()
    // Set the front sheet radius
    const frontSheetHeightStore = useFrontSheetStore()
    frontSheetHeightStore.setRadius('16px')
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    // Set the sign in form visibility
    onboardingStore.toggleShow()
    // Set the front sheet color
    frontSheetHeightStore.setColor('light')
    // Set the front sheet height
    frontSheetHeightStore.setHeight('mid')
    // Wait for slide animation
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    // Set the portfolio value visibility
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.toggleOpacity()
    // Set the holding amount alignment
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.setAlignment('right')
    // Set the holding amount visibility
    holdingHeaderStore.toggleOpacity()
    // Set the holding list item visibility
    const holdingsListStore = useHoldingsListStore()
    holdingsListStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingsListStore.toggleOpacity()
  } else if (place === 'history') {
    // Set the appbar button icon
    const appBarButtonStore = useAppBarButtonStore()
    appBarButtonStore.changeIcon('menu')
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle('Magic')
    // Set the holding amount alignment
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.setAlignment('right')
    // Set the holding amount visibility
    holdingHeaderStore.toggleOpacity()
    // Set the portfolio value alignment
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.setAlignment('center')
    // Set the portfolio value visibility
    portfolioValueStore.toggleOpacity()
    // Set the history item visibility
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleOpacity()
    const holdingsListStore = useHoldingsListStore()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    historyListItemStore.toggleShow()
    // Set the holding item visibility
    holdingsListStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingsListStore.toggleOpacity()
  }
}

// Private Menu Helper Functions
async function togglePivotOtherMenuItems(clickedId: Place) {
  const backMenuItems = menuItems
  for (const item of backMenuItems) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    if (item.id !== clickedId) {
      console.log(`Toggling ${item.id}`)
      const menuItemStore = useMenuItemStore(item.id)()
      if (menuItemStore.hasPosition === 'left') {
        menuItemStore.setPosition('center')
      } else {
        menuItemStore.setPosition('left')
      }
    }
  }
}

async function toggleShowSettingItems() {
  const backSettingItems = settingItems
  for (const item of backSettingItems) {
    // await new Promise((resolve) => setTimeout(resolve, 50))
    await nextTick()
    const settingItemStore = useSettingItemStore(item.id)()
    settingItemStore.toggleShow()
  }
}

async function togglePositionSettingItems() {
  const backSettingItems = settingItems
  for (const item of backSettingItems) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const settingItemStore = useSettingItemStore(item.id)()
    if (settingItemStore.hasPosition === 'right') {
      settingItemStore.setPosition('center')
    } else {
      settingItemStore.setPosition('right')
    }
  }
}

async function toggleShowOtherMenuItems(clickedId: Place) {
  const backMenuItems = menuItems
  for (const item of backMenuItems) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    // await nextTick()
    if (item.id !== clickedId) {
      console.log(`Toggling ${item.id}`)
      const menuItemStore = useMenuItemStore(item.id)()
      menuItemStore.toggleShow()
    }
  }
}

async function goToMenuFrom(place: Place) {
  console.log(`Navigating to Menu from ${place}`)
  if (place === 'holdings') {
    // Set the maestro place state
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('menu')
    // Set the front sheet height
    const frontSheetHeightStore = useFrontSheetStore()
    frontSheetHeightStore.toggleHeight()
    // Set the portfolio value visibility
    const portfolioValueStore = usePortfolioValueStore()
    // Wait for fade animation

    portfolioValueStore.toggleOpacity()
  } else if (place === 'about') {
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('menu')
    const aboutStore = useAboutStore()
    aboutStore.setPosition('right')
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    aboutStore.toggleOpacity()
    aboutStore.toggleShow()
    const backsheetTopContainerStore = useBacksheetTopContainerStore()
    backsheetTopContainerStore.toggleShow()
    const menuItemStore = useMenuItemStore(place)()
    menuItemStore.togglePivot()
    const appBarButtonStore = useAppBarButtonStore()
    appBarButtonStore.changeIcon('menu')
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle('Magic')
    await toggleShowOtherMenuItems(place)
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    await togglePivotOtherMenuItems(place)
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.setAlignment('center')
  } else if (place === 'help') {
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('menu')
    const helpStore = useHelpStore()
    helpStore.setPosition('right')
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    helpStore.toggleOpacity()
    helpStore.toggleShow()
    const backsheetTopContainerStore = useBacksheetTopContainerStore()
    backsheetTopContainerStore.toggleShow()
    const menuItemStore = useMenuItemStore(place)()
    menuItemStore.togglePivot()
    const appBarButtonStore = useAppBarButtonStore()
    appBarButtonStore.changeIcon('menu')
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle('Magic')
    await toggleShowOtherMenuItems(place)
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    await togglePivotOtherMenuItems(place)
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.setAlignment('center')
  } else if (place === 'settings') {
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('menu')
    await togglePositionSettingItems()
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    await nextTick()
    await toggleShowSettingItems()
    await toggleShowOtherMenuItems(place)
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    const menuItemStore = useMenuItemStore(place)()
    menuItemStore.togglePivot()
    const appBarButtonStore = useAppBarButtonStore()
    appBarButtonStore.changeIcon('menu')
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle('Magic')
    await new Promise((resolve) => setTimeout(resolve, slideDuration))
    await togglePivotOtherMenuItems(place)
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.setAlignment('center')
  }
}

async function goToHistoryFrom(place: Place) {
  const holdingStore = useHoldingStore()
  if (place === 'holdings' && holdingStore.holding) {
    console.log('Navigating to History from Holdings')
    // Set the portfolio value alignment
    const portfolioValueStore = usePortfolioValueStore()
    portfolioValueStore.setAlignment('left')
    // Set the portfolio value visibility
    portfolioValueStore.toggleOpacity()
    // Set the holding amount icon
    const holdingHeaderStore = useHoldingHeaderStore()
    // Set the holding buttons
    holdingHeaderStore.setHolding(holdingStore.holding.name)
    holdingHeaderStore.setTitle(holdingStore.holding.amountPrecedingTotal)
    holdingHeaderStore.setTitleTrailing(holdingStore.holding.amountTrailingTotal)
    // if (holdingStore.holding.fiatValue === '0') {
    //   holdingHeaderStore.setShowSubTitle(false)
    // } else {
    //   holdingHeaderStore.setShowSubTitle(true)
    //   holdingHeaderStore.setSubTitle(holdingStore.holding.fiatValue)
    // }
    const holdingButtonsStore = useHoldingButtonsStore()
    if (
      (holdingStore.holding.name === 'Evrmore' &&
        holdingStore.holding.blockchain.name === 'Evrmore') ||
      (holdingStore.holding.name === 'Ravencoin' &&
        holdingStore.holding.blockchain.name === 'Ravencoin')
    ) {
      holdingButtonsStore.setCanMint(true)
    } else {
      holdingButtonsStore.setCanMint(false)
    }
    // Set the holding amount alignment
    holdingHeaderStore.setAlignment('center')
    // Set the portfolio value visibility
    holdingHeaderStore.toggleOpacity()
    // Set the appbar button icon
    const appBarButtonStore = useAppBarButtonStore()
    appBarButtonStore.changeIcon('left-chevron')
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle(holdingStore.holding.name)
    // Set the holding list item visibility
    const holdingsListStore = useHoldingsListStore()
    holdingsListStore.toggleOpacity()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    // Set the holding list show component
    holdingsListStore.toggleShow()
    // Set the history list item visibility
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    historyListItemStore.toggleOpacity()
  } else if (place === 'receive') {
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    const holdingHeaderStore = useHoldingHeaderStore()
    const holdingStore = useHoldingStore()
    appBarTitleStore.setTitle(holdingHeaderStore.holding)
    holdingHeaderStore.toggleTitleOpacity()
    holdingHeaderStore.toggleSubTitleOpacity()
    const receiveStore = useReceiveStore()
    receiveStore.toggleOpacity()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    receiveStore.toggleShow()
    holdingHeaderStore.setTitle(holdingStore.holding.amountPrecedingTotal)
    holdingHeaderStore.setTitleTrailing(holdingStore.holding.amountTrailingTotal)
    // holdingHeaderStore.setSubTitle(holdingStore.holding.fiatValue)
    holdingHeaderStore.toggleTitleOpacity()
    holdingHeaderStore.setShowSubTitle(false)
    // holdingHeaderStore.toggleSubTitleOpacity()

    const holdingButtonsStore = useHoldingButtonsStore()
    holdingButtonsStore.toggleShowComponent()
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    historyListItemStore.toggleOpacity()
    holdingButtonsStore.toggleOpacity()
    holdingHeaderStore.setShowSubTitle(false)
  } else if (place === 'send-preview') {
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    const holdingHeaderStore = useHoldingHeaderStore()
    appBarTitleStore.setTitle(holdingHeaderStore.holding)
    const sendPreviewFormStore = useSendPreviewFormStore()
    sendPreviewFormStore.toggleOpacity()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    sendPreviewFormStore.toggleShow()
    const holdingButtonsStore = useHoldingButtonsStore()
    holdingButtonsStore.toggleShowComponent()
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    historyListItemStore.toggleOpacity()
    holdingButtonsStore.toggleOpacity()
    sendPreviewFormStore.reset()
  } else if (place === 'transaction') {
    console.log('Navigating to History from Transaction')
    // Set the maestro place state
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('history')
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    const holdingHeaderStore = useHoldingHeaderStore()
    appBarTitleStore.setTitle(holdingHeaderStore.holding)
    const transactionHistoryStore = useTransactionHistoryStore()
    const historyListItemStore = useHistoryListItemStore()
    const holdingButtonsStore = useHoldingButtonsStore()
    transactionHistoryStore.toggleOpacity()
    holdingButtonsStore.toggleShowComponent()
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    holdingButtonsStore.toggleOpacity()
    transactionHistoryStore.toggleShow()
    historyListItemStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    historyListItemStore.toggleOpacity()
  } else if (place === 'swap' || place === 'mint') {
    console.log('Navigating to History from Swap')
    // Set the maestro place state
    const maestroPlaceStore = useMaestroPlaceStore()
    maestroPlaceStore.changePlace('history')
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    const holdingStore = useHoldingStore()
    appBarTitleStore.setTitle(holdingStore.holding.name)
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.toggleTitleOpacity()
    const holdingButtonsStore = useHoldingButtonsStore()
    holdingButtonsStore.toggleShowComponent()
    const swapStore = useSwapStore()
    const mintStore = useMintStore()
    if (place === 'swap') {
      swapStore.toggleOpacity()
    } else if (place === 'mint') {
      mintStore.toggleOpacity()
    }
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    if (place === 'swap') {
      swapStore.toggleShow()
    } else if (place === 'mint') {
      mintStore.toggleShow()
    }
    holdingHeaderStore.setHolding(holdingStore.holding.name)
    holdingHeaderStore.setTitle(holdingStore.holding.amountPrecedingTotal)
    holdingHeaderStore.setTitleTrailing(holdingStore.holding.amountTrailingTotal)
    if (
      (holdingStore.holding.name === 'Evrmore' &&
        holdingStore.holding.blockchain.name === 'Evrmore') ||
      (holdingStore.holding.name === 'Ravencoin' &&
        holdingStore.holding.blockchain.name === 'Ravencoin')
    ) {
      holdingButtonsStore.setCanMint(true)
    } else {
      holdingButtonsStore.setCanMint(false)
    }
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingHeaderStore.toggleTitleOpacity()
    holdingButtonsStore.toggleOpacity()
    historyListItemStore.toggleOpacity()
  }
}

async function goToSendPreviewFrom(place: Place) {
  if (place === 'history') {
    console.log('Navigating to Send Preview')
    // Set the appbar title
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle(`Send`)
    // Set the holding amount buttons visibility
    const holdingButtonsStore = useHoldingButtonsStore()
    holdingButtonsStore.toggleOpacity()
    const historyListItemStore = useHistoryListItemStore()
    historyListItemStore.toggleOpacity()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    holdingButtonsStore.toggleShowComponent()
    // Set the history list item visibility
    historyListItemStore.toggleShow()
    // Set the Send Preview Form visibility
    const sendPreviewFormStore = useSendPreviewFormStore()
    sendPreviewFormStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    // Set the send preview form opacity
    sendPreviewFormStore.toggleOpacity()
  } else if (place === 'send-qr') {
    console.log('Navigating to Send Preview')
    const sendQrStore = useSendQrStore()
    sendQrStore.toggleOpacity()
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.toggleTitleOpacity()
    holdingHeaderStore.toggleSubTitleOpacity()
    // Wait for fade animation
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    sendQrStore.toggleShow()
    const holdingStore = useHoldingStore()
    holdingHeaderStore.setHolding(holdingStore.holding.name)
    holdingHeaderStore.setTitle(holdingStore.holding.amountPrecedingTotal)
    holdingHeaderStore.setTitleTrailing(holdingStore.holding.amountTrailingTotal)
    holdingHeaderStore.setSubTitleIcon('')
    holdingHeaderStore.setShowSubTitle(false)
    const sendPreviewFormStore = useSendPreviewFormStore()
    sendPreviewFormStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingHeaderStore.toggleTitleOpacity()
    sendPreviewFormStore.toggleOpacity()
  } else if (place === 'qr-code-scanner') {
    console.log('Navigating to Send Preview')
    const appBarTitleStore = useAppBarTitleStore()
    appBarTitleStore.setTitle('Send')
    const qRcodeScannerStore = useQrCodeScannerStore()
    qRcodeScannerStore.toggleOpacity()
    const holdingHeaderStore = useHoldingHeaderStore()
    holdingHeaderStore.toggleTitleOpacity()
    await new Promise((resolve) => setTimeout(resolve, fadeDuration))
    qRcodeScannerStore.toggleShow()
    const holdingStore = useHoldingStore()
    holdingHeaderStore.setHolding(holdingStore.holding.name)
    holdingHeaderStore.setTitle(holdingStore.holding.amountPrecedingTotal)
    holdingHeaderStore.setTitleTrailing(holdingStore.holding.amountTrailingTotal)
    const sendPreviewFormStore = useSendPreviewFormStore()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    holdingHeaderStore.toggleTitleOpacity()
    sendPreviewFormStore.toggleShow()
    await new Promise((resolve) => setTimeout(resolve, offsetDuration))
    sendPreviewFormStore.toggleOpacity()
  }
}
