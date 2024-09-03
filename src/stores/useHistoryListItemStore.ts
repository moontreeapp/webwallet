import { defineStore } from 'pinia'
import { useWebSocketStore } from './useWebSocketStore'
import { watch } from 'vue'
import { WALLET } from '../models/Wallet'

export const useHistoryListItemStore = defineStore('historyListItem', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
  } => ({
    isFaded: true,
    showComponent: false
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
      // Fetch transactions if component is shown and not already fetched
      if (this.showComponent) {
        console.log('Fetching transactions...')
        this.fetchTransactions()
      }
    },
    reset() {
      this.$reset()
    },

    // fetchTransactions is used to manually fetch transactions from the server
    fetchTransactions() {
      console.log('Fetching transactions...')
      const webSocketStore = useWebSocketStore()

      for (const holdingChain of WALLET) {
        const transactionsRequest = {
          endpoint: 'transactions.get',
          params: holdingChain
        }
        console.log('Transactions Request', JSON.stringify(transactionsRequest))
        webSocketStore.send(JSON.stringify(transactionsRequest))
      }
    },

    setupTransactionsUpdateListener() {
      const webSocketStore = useWebSocketStore()

      watch(
        () => webSocketStore.connected,
        (isConnected) => {
          if (isConnected) {
            console.log('WebSocket connected, setting up transactions listener')
            webSocketStore.on('transactions.get', this.handleTransactionsUpdate)
          } else {
            console.log('WebSocket disconnected, removing transactions listener')
            this.removeTransactionsUpdateListener()
          }
        },
        { immediate: true }
      )
    },

    removeTransactionsUpdateListener() {
      const webSocketStore = useWebSocketStore()
      webSocketStore.off('transactions.get', this.handleTransactionsUpdate)
    },

    handleTransactionsUpdate(transactionsData: any) {
      console.log('Transactions update received:', transactionsData)
      // TODO: Implement logic to process and update transactions
      // If the received data is not in the expected format, you might want to trigger a manual fetch
      // if (/* check if data is not in the expected format */) {
      //   this.fetchTransactions()
      // } else {
      //   // Process and update the transactions
      // }
    }
  }
})
