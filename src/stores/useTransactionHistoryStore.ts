import { defineStore } from 'pinia'

export type InOrOut = 'in' | 'out'

export const useTransactionHistoryStore = defineStore('transactionHistory', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    inOrOut: InOrOut
    to: string
    amountPreceding: string
    amountTrailing: string
    date: string
    time: string
    transactionId: string
  } => ({
    isFaded: true,
    showComponent: false,
    inOrOut: 'in',
    to: 'EfJVvdbkie462r879s6RqZpubF2Rrxxget',
    amountPreceding: '1232',
    amountTrailing: '45622564',
    date: '06/12/2021',
    time: '12:34:56',
    transactionId: '65462987627267'
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setInOrOut(newInOrOut: InOrOut) {
      this.inOrOut = newInOrOut
    },
    setTo(newTo: string) {
      this.to = newTo
    },
    setAmountPreceding(newAmountPreceding: string) {
      this.amountPreceding = newAmountPreceding
    },
    setAmountTrailing(newAmountTrailing: string) {
      this.amountTrailing = newAmountTrailing
    },
    setDate(newDate: string) {
      this.date = newDate
    },
    setTime(newTime: string) {
      this.time = newTime
    },
    reset() {
      this.$reset()
    }
  }
})
