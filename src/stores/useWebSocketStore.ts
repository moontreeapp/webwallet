import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/useSnackbarStore'
import { offsetDuration, snackbarDuration, fadeDuration } from '@/utils/animationUtils'

export const useWebSocketStore = defineStore('webSocketStore', {
  state: (): {
    connected: boolean
    socket: WebSocket | null
    connectionAttempt: boolean
    reconnectInterval: number | null
    reconnectAttempts: number
  } => ({
    connected: false,
    socket: null,
    connectionAttempt: false,
    reconnectInterval: null,
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

      console.log('WebSocket initialized')
    },
    reconnect() {
      if (this.reconnectInterval === null && this.reconnectAttempts < 5) {
        this.reconnectInterval = window.setInterval(async () => {
          console.log('Attempting to reconnect...')
          this.reconnectAttempts++
          this.initializeWebSocket()

          if (this.reconnectAttempts >= 5) {
            await this.showConnectionError()
            this.closeConnection()
          }
        }, 5000) as unknown as number
      }
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
    on(event: string, listener: EventListener) {
      if (this.socket) {
        this.socket.addEventListener(event, listener)
      } else {
        console.error('WebSocket is not initialized')
        this.initializeWebSocket()
      }
    },
    off(event: string, listener: EventListener) {
      if (this.socket) {
        this.socket.removeEventListener(event, listener)
      }
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
    }
  }
})
