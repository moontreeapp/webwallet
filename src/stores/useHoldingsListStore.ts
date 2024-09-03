import { defineStore } from 'pinia'
import type { Holding } from '../models/Holding'
import { useWebSocketStore } from './useWebSocketStore'
import { HoldingsListService } from '../services/HoldingsListService'
import { usePortfolioValueStore } from './usePortfolioValueStore'
import { plainToInstance } from 'class-transformer'
import { HoldingData } from '../models/HoldingData'
import { WALLET } from '../models/Wallet'
import type { Blockchain } from '../models/Blockchain'
import { watch } from 'vue'

const holdingsListService = new HoldingsListService()

export const useHoldingsListStore = defineStore('holdingsList', {
  state: () => ({
    isFaded: true,
    showComponent: false,
    holdings: [] as Holding[],
    pastInitialization: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
      // Fetch holdings if component is shown and not already fetched
      if (this.showComponent && !this.pastInitialization) {
        console.log('Fetching holdings...')
        this.fetchHoldings()
      }
      // Set pastInitialization to true. This will only be true after first fetch.
      this.pastInitialization = true
    },
    reset() {
      this.$reset()
    },

    // fetchHoldings is used to manually fetch holdings from the server
    fetchHoldings() {
      console.log('Fetching holdings...')
      const webSocketStore = useWebSocketStore()

      for (const holdingChain of WALLET) {
        const holdingsRequest = {
          endpoint: 'balances.get',
          params: holdingChain
        }
        webSocketStore.send(JSON.stringify(holdingsRequest))
      }
    },

    setupWalletUpdateListener() {
      const webSocketStore = useWebSocketStore()

      watch(
        () => webSocketStore.connected,
        (isConnected) => {
          if (isConnected) {
            console.log('WebSocket connected, setting up listener')
            webSocketStore.on('subscribe.wallets', this.handleWalletUpdate)
          } else {
            console.log('WebSocket disconnected, removing listener')
            this.removeWalletUpdateListener()
          }
        },
        { immediate: true }
      )
    },

    removeWalletUpdateListener() {
      const webSocketStore = useWebSocketStore()
      webSocketStore.off('subscribe.wallets', this.handleWalletUpdate)
    },

    handleWalletUpdate(walletData: any) {
      console.log('Wallet update received:', walletData)
      let holdingsData: HoldingData[]
      // Check if the data is an array or an object, depends on if we triggered
      // a manual fetch or if it is a websocket subscription update
      if (Array.isArray(walletData)) {
        holdingsData = plainToInstance(HoldingData, walletData)
        this.processAndUpdateHoldings(holdingsData)
      } else if (typeof walletData === 'object' && walletData !== null) {
        // * Subscription update is an object, not an array. Currently we are just
        // * using this as a trigger to manually fetch the holdings.
        // TODO - update server's subscription code to send accurate sats data.
        // holdingsData = plainToInstance(HoldingData, [walletData])
        this.fetchHoldings()
      } else {
        console.error('Unexpected data structure: expected an array or object', walletData)
        return
      }
    },

    async processAndUpdateHoldings(holdingsData: HoldingData[]) {
      console.log('Processing holdings:', holdingsData)
      const processedHoldings: Holding[] = await holdingsListService.processHoldings(holdingsData)

      if (processedHoldings.length > 0) {
        const blockchain: Blockchain = processedHoldings[0].blockchain
        // Create a set of token addresses from the processed holdings
        const updatedTokenAddresses = new Set(processedHoldings.map((holding) => holding.name))
        // Remove only the holdings that are being updated for this blockchain
        this.holdings = this.holdings.filter(
          (holding) =>
            holding.blockchain.name !== blockchain.name || !updatedTokenAddresses.has(holding.name)
        )
        // Add the new processed holdings
        this.holdings.push(...processedHoldings)
      }

      console.log('Holdings updated:', this.holdings)

      const portfolioValueStore = usePortfolioValueStore()
      const totalValue = this.holdings.reduce(
        (sum, holding) => sum + parseFloat(holding.fiatValue),
        0
      )
      portfolioValueStore.portfolioValue = totalValue.toFixed(2)
    }
  }
})
