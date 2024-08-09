import { defineStore } from 'pinia'
import type { Holding } from '../models/Holding'
import { useWebSocketStore } from './useWebSocketStore'
import { HoldingsListService } from '../services/HoldingsListService'
import { usePortfolioValueStore } from './usePortfolioValueStore'
import { plainToInstance } from 'class-transformer'
import { HoldingData } from '../models/HoldingData'
import { WALLET } from '../models/Wallet'
import type { Blockchain } from '../models/Blockchain'

const holdingsListService = new HoldingsListService()

export const useHoldingsListStore = defineStore('holdingsList', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    holdings: Holding[]
    pastInitialization: boolean
  } => ({
    isFaded: true,
    showComponent: false,
    holdings: [],
    pastInitialization: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
      // Fetch holdings if component is shown and not already fetched
      if (this.showComponent && this.pastInitialization) {
        console.log('Fetching holdings...')
        this.fetchHoldings()
      }
      // Set pastInitialization to true. This will only be true after first fetch.
      this.pastInitialization = true
    },
    reset() {
      this.$reset()
    },

    initializeWebSocket() {
      const webSocketStore = useWebSocketStore()
      webSocketStore.initializeWebSocket()
      this.setupHoldingsListener()
    },

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

    setupHoldingsListener() {
      const webSocketStore = useWebSocketStore()
      webSocketStore.on('message', this.handleMessage as EventListener)
    },

    removeHoldingsListener() {
      const webSocketStore = useWebSocketStore()
      webSocketStore.off('message', this.handleMessage as EventListener)
    },

    handleMessage(event: Event) {
      if (event instanceof MessageEvent) {
        console.log('Raw message received:', event.data)
        try {
          const parsedData = JSON.parse(event.data)
          if (Array.isArray(parsedData)) {
            const holdingsData: HoldingData[] = plainToInstance(HoldingData, parsedData)
            console.log('Transformed holdings data:', holdingsData)
            this.processAndUpdateHoldings(holdingsData)
          } else {
            console.error('Unexpected data structure: expected an array', parsedData)
          }
        } catch (error) {
          console.error('Error parsing or transforming message:', error)
          console.error('Problematic message:', event.data)
        }
      }
    },

    async processAndUpdateHoldings(holdingsData: HoldingData[]) {
      console.log('Processing holdings:', holdingsData)
      const processedHoldings: Holding[] = await holdingsListService.processHoldings(holdingsData)
      // get the blockchain that was updated from the first holding.
      // we can assume that all holdings are for the same blockchain.
      const blockchain: Blockchain = processedHoldings[0].blockchain
      // remove all existing holdings for the blockchain from the store
      this.holdings = this.holdings.filter((holding) => holding.blockchain.name !== blockchain.name)
      // add the new holdings to the store
      this.holdings.push(...processedHoldings)
      console.log('Holdings updated:', this.holdings)

      // Update portfolio value
      const portfolioValueStore = usePortfolioValueStore()
      const totalValue = this.holdings.reduce(
        (sum, holding) => sum + parseFloat(holding.fiatValue),
        0
      )
      portfolioValueStore.portfolioValue = totalValue.toFixed(2)
    }
  }
})
