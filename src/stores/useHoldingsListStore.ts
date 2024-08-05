import { defineStore } from 'pinia'
import type { Holding } from '../models/Holding'
import { useWebSocketStore } from './useWebSocketStore'
import { HoldingsListService } from '../services/HoldingsListService'
import { usePortfolioValueStore } from './usePortfolioValueStore'
import { plainToInstance } from 'class-transformer'
import { HoldingData } from '../models/HoldingData'

const holdingsListService = new HoldingsListService()

export const useHoldingsListStore = defineStore('holdingsList', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    holdings: Holding[]
  } => ({
    isFaded: true,
    showComponent: false,
    holdings: []
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
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
      const holdingsRequest = {
        endpoint: 'balances.get',
        params: {
          chainName: 'evrmore_mainnet',
          xpubkeys: [
            'xpub6EtVexS6kuhFVjQNB1qGSUGumEnQVF3xp3926wy92W4GJS7ymvhbWkVzBTjXQ4u8EixkRXmE8N538zei6kCdAyZkWKcZBZ7BSdYm9uNPn9i',
            'xpub6EtVexS6kuhFZ22PBCWPC97VNkZ9vufPdrTp2ZDDApasumxt8f8CREs4Zv6nDdFKByp8BPZ5tFFj6ZG4eeerNkDM7mJ2PZfBDeB5LjdRiXY'
          ]
        }
      }
      webSocketStore.send(JSON.stringify(holdingsRequest))
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
          // console.log('Parsed data:', parsedData)
          // const parsedData: HoldingData[] = [
          //   {
          //     id: null,
          //     error: null,
          //     satsConfirmed: 99588600,
          //     satsUnconfirmed: 0,
          //     symbol: 'EVR',
          //     chain: 'evrmore_mainnet'
          //   }
          // ]

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
    processAndUpdateHoldings(holdingsData: HoldingData[]) {
      console.log('Processing holdings:', holdingsData)
      const processedHoldings = holdingsListService.processHoldings(holdingsData)
      this.holdings = processedHoldings
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
