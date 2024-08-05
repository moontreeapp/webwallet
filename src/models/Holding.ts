import type { Blockchain } from './Blockchain'
import type { HoldingType } from './HoldingType'

export class Holding {
  constructor(params: {
    name: string
    satConfirmed: number
    satsUnconfirmed: number
    satsTotal: number
    amountConfirmed: string
    amountUnconfirmed: string
    amountTotal: string
    amountTotalRounded: string
    amountPrecedingConfirmed: string
    amountPrecedingUnconfirmed: string
    amountPrecedingTotal: string
    amountTrailingConfirmed: string
    amountTrailingUnconfirmed: string
    amountTrailingTotal: string
    fiatValue: string
    hasAdmin: boolean
    holdingType: HoldingType
    // pubKey: string
    blockchain: Blockchain
    canMint: boolean
    // metadata?: HoldingMetadata;
    iconImageUrl?: string
    iconColor?: string
  }) {
    this.name = params.name
    this.satsConfirmed = params.satConfirmed
    this.satsUnconfirmed = params.satsUnconfirmed
    this.satsTotal = params.satsTotal
    this.amountConfirmed = params.amountConfirmed
    this.amountUnconfirmed = params.amountUnconfirmed
    this.amountTotal = params.amountTotal
    this.amountTotalRounded = params.amountTotalRounded
    this.amountPrecedingConfirmed = params.amountPrecedingConfirmed
    this.amountPrecedingUnconfirmed = params.amountPrecedingUnconfirmed
    this.amountPrecedingTotal = params.amountPrecedingTotal
    this.amountTrailingConfirmed = params.amountTrailingConfirmed
    this.amountTrailingUnconfirmed = params.amountTrailingUnconfirmed
    this.amountTrailingTotal = params.amountTrailingTotal
    this.fiatValue = params.fiatValue
    this.hasAdmin = params.hasAdmin
    this.holdingType = params.holdingType
    // this.pubKey = params.pubKey
    this.blockchain = params.blockchain
    this.canMint = params.canMint
    // this.metadata = params.metadata ?? '';
    this.iconImageUrl = params.iconImageUrl ?? ''
    this.iconColor = params.iconColor ?? ''
  }

  name: string
  satsConfirmed: number
  satsUnconfirmed: number
  satsTotal: number
  amountConfirmed: string
  amountUnconfirmed: string
  amountTotal: string
  amountTotalRounded: string
  amountPrecedingConfirmed: string
  amountPrecedingUnconfirmed: string
  amountPrecedingTotal: string
  amountTrailingConfirmed: string
  amountTrailingUnconfirmed: string
  amountTrailingTotal: string
  fiatValue: string
  hasAdmin: boolean
  holdingType: HoldingType
  // pubKey: string
  blockchain: Blockchain
  canMint: boolean
  // metadata: HoldingMetadata;
  iconImageUrl: string
  iconColor: string
}
