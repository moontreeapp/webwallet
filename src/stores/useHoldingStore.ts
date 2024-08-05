import { defineStore } from 'pinia'
import { Holding } from '../models/Holding'
import { Blockchain } from '../models/Blockchain'
import { HoldingType } from '../models/HoldingType'

const placeholderBlockchain = new Blockchain({
  name: '',
  port: 0,
  ticker: '',
  maxSupply: 0,
  decimalPlaces: 0,
  iconUrl: '',
  addressTypes: []
})

const placeholderHolding = new Holding({
  name: '',
  satConfirmed: 0,
  satsUnconfirmed: 0,
  satsTotal: 0,
  amountConfirmed: '',
  amountUnconfirmed: '',
  amountTotal: '',
  amountTotalRounded: '',
  amountPrecedingConfirmed: '',
  amountPrecedingUnconfirmed: '',
  amountPrecedingTotal: '',
  amountTrailingConfirmed: '',
  amountTrailingUnconfirmed: '',
  amountTrailingTotal: '',
  hasAdmin: false,
  fiatValue: '',
  holdingType: HoldingType.ASSET,
  pubKey: '',
  blockchain: placeholderBlockchain,
  canMint: false,
  // metadata: HoldingMetadata;,
  iconImageUrl: '',
  iconColor: ''
})

export const useHoldingStore = defineStore('holding', {
  state: (): {
    isFaded: boolean
    showComponent: boolean
    holding: Holding
  } => ({
    isFaded: true,
    showComponent: false,
    holding: placeholderHolding
  }),
  actions: {
    toggleOpacity() {
      this.isFaded = !this.isFaded
    },
    toggleShow() {
      this.showComponent = !this.showComponent
    },
    setHolding(newHolding: Holding) {
      this.holding = newHolding
    },
    reset() {
      this.$reset()
    }
  }
})
