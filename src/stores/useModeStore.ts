import { defineStore } from 'pinia'

export type Mode = 'easy' | 'advanced'

export const useModeStore = defineStore('mode', {
  state: (): { mode: Mode; icon: string } => ({
    mode: 'easy',
    icon: 'mdi-sledding'
  }),
  actions: {
    toggleMode() {
      if (this.mode === 'easy') {
        this.mode = 'advanced'
        this.icon = 'mdi-snowboard'
      } else {
        this.mode = 'easy'
        this.icon = 'mdi-sledding'
      }
    },
    reset() {
      this.$reset()
    }
  },
  getters: {
    text(state) {
      return `Mode: ${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}`
    }
  }
})
