import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import { offsetDuration, snackbarDuration, fadeDuration } from '@/utils/animationUtils'
import mitt from 'mitt'

// Create a typed emitter
type Events = {
  'subscribe.wallets': any
  'transactions.get': any
}

const emitter = mitt<Events>()

export const useWebSocketStore = defineStore('webSocketStore', {
  state: () => ({
    connected: false,
    socket: null as WebSocket | null,
    connectionAttempt: false,
    reconnectInterval: null as number | null,
    reconnectAttempts: 0
  }),
  actions: {
    initializeWebSocket() {
      if (this.socket?.readyState === WebSocket.OPEN || this.connectionAttempt) {
        console.log('WebSocket already connected or connection attempt in progress')
        return
      }
      this.connectionAttempt = true
      console.log('Initializing WebSocket...')
      this.socket = new WebSocket('ws://app.moontree.com:8181/socket')
      this.socket.onopen = () => {
        console.log('Connected to WebSocket')
        this.connected = true
        this.connectionAttempt = false
        if (this.reconnectInterval !== null) {
          clearInterval(this.reconnectInterval)
          this.reconnectInterval = null
        }
        this.subscribeToWallets()
      }
      this.socket.onclose = () => {
        console.log('Disconnected from WebSocket')
        this.connected = false
        this.connectionAttempt = false
        this.reconnect()
      }
      this.socket.onerror = (error) => {
        console.error('WebSocket Error:', error)
        this.connectionAttempt = false
      }
      this.socket.onmessage = (event) => {
        this.handleIncomingMessage(event.data)
      }

      console.log('WebSocket initialized')
    },

    reconnect() {
      if (this.reconnectInterval === null && this.reconnectAttempts < 3) {
        this.reconnectInterval = window.setInterval(async () => {
          console.log('Attempting to reconnect...')
          this.reconnectAttempts++

          if (this.reconnectAttempts === 1) {
            await this.showReconnectingMessage()
          }

          this.initializeWebSocket()

          if (this.reconnectAttempts >= 3) {
            await this.showConnectionError()
            this.closeConnection()
          }
        }, 5000) as unknown as number
      }
    },

    async showReconnectingMessage() {
      const snackbarStore = useSnackbarStore()
      snackbarStore.setTitle('Reconnecting')
      snackbarStore.setMessage('Attempting to connect...')
      snackbarStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      snackbarStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, snackbarDuration))
      snackbarStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      snackbarStore.reset()
    },
    async showConnectionError() {
      const snackbarStore = useSnackbarStore()
      snackbarStore.setTitle('Connection Error')
      snackbarStore.setMessage('Please check your connection')
      snackbarStore.toggleShow()
      await new Promise((resolve) => setTimeout(resolve, offsetDuration))
      snackbarStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, snackbarDuration))
      snackbarStore.toggleOpacity()
      await new Promise((resolve) => setTimeout(resolve, fadeDuration))
      snackbarStore.reset()
    },

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(data)
      } else {
        console.error('WebSocket is not connected')
        this.initializeWebSocket()
      }
    },
    // Methods for event subscription
    on<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
      emitter.on(event, callback)
    },
    off<K extends keyof Events>(event: K, callback: (data: Events[K]) => void) {
      emitter.off(event, callback)
    },

    closeConnection() {
      if (this.socket) {
        this.socket.close()
        this.socket = null
      }
      if (this.reconnectInterval !== null) {
        clearInterval(this.reconnectInterval)
        this.reconnectInterval = null
      }
    },

    // TODO update to use actual wallets
    subscribeToWallets() {
      if (this.socket?.readyState === WebSocket.OPEN) {
        const subscriptionMessage = {
          endpoint: 'subscribe.wallets',
          params: {
            xpubkeys: [
              'xpub6EPLto1UvaKqiJSsBntBY6F4yb8Z68u9ZA6v2Jd37pTto3HzRWrrELDR6zVUXQhr3AvVwDq3CnqiQzod1cgpyHrKD3CbUBotsoBfn5bnKCg',
              'xpub6EPLto1UvaKqmsbMMs1ppw6jGLFsKYhTMRjUwZcTW8WiDBwvSPAfGmvm9HwS9LXRir8B8XnKQbmj4FkGBpSXLK5E5BV66eUsu6BsLLK6wNU'
            ]
          }
        }
        this.socket.send(JSON.stringify(subscriptionMessage))
        console.log('Subscribed to wallets')
      } else {
        console.error('WebSocket is not connected. Cannot subscribe to wallets.')
      }
    },

    handleIncomingMessage(data: string) {
      try {
        const message = JSON.parse(data)
        console.log('Received message:', message)
        switch (message.endpoint) {
          case 'balances.get':
            emitter.emit('subscribe.wallets', message.result)
            break
          case 'subscribe.wallets':
            emitter.emit('subscribe.wallets', message.result)
            break
          // Add more cases for different message types
          default:
            console.log('Unhandled message type:', message.type)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
  }
})
