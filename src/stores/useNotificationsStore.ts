import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: (): {
    notification: boolean
    icon: string
  } => ({
    notification: true,
    icon: 'mdi-volume-high'
  }),
  actions: {
    toggleNotification() {
      this.notification = !this.notification
      this.icon = this.notification ? 'mdi-volume-high' : 'mdi-volume-off'
    },
    reset() {
      this.$reset()
    }
  }
})
