import { Holding } from '../models/Holding'
import { evrmore, evrmoreTestnet, ravencoin, ravencoinTestnet } from '../models/Blockchains'
import { HoldingType } from '../models/HoldingType'
import type { HoldingData } from '../models/HoldingData'
import { getIconImageUrl } from '../utils/iconUtils'
import { ExchangeFiatValueService } from './ExchangeFiatValueService'
// import { usePortfolioValueStore } from '../stores/usePortfolioValueStore'
// todo - update the portfolio value store to use the new total value

export class HoldingsListService {
  generateRandomHSLColor() {
    const hue = Math.floor(Math.random() * 300)
    const saturation = Math.floor(Math.random() * 30) + 70
    const lightness = Math.floor(Math.random() * 20) + 50
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  calculateBrightness(rgb: number[]) {
    return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114
  }

  hslToRgb(h: number, s: number, l: number) {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
  }

  getContrastingIconBackgroundColor() {
    let color
    let brightness
    do {
      color = this.generateRandomHSLColor()
      const [h, s, l] = color.match(/\d+/g)?.map(Number) || [0, 0, 0]
      const rgb = this.hslToRgb(h, s, l)
      brightness = this.calculateBrightness(rgb)
    } while (brightness < 128 || brightness > 200)

    return color
  }

  private convertSatsToMainUnit(
    sats: number,
    decimalPlaces: number
  ): {
    full: string
    preceding: string
    trailing: string
  } {
    const fullNumber = sats / Math.pow(10, decimalPlaces)
    const fullString = fullNumber.toFixed(decimalPlaces)
    const [precedingString, trailingString] = fullString.split('.')

    // Remove trailing zeros
    const trailingWithoutZeros = trailingString.replace(/0+$/, '')

    return {
      full: fullString,
      preceding: precedingString,
      trailing: trailingWithoutZeros || '0' // If all zeros were removed, return '0'
    }
  }

  private calculateRoundedAmount(amount: number): string {
    const absAmount = Math.abs(amount)
    let result: string
    if (absAmount >= 1e9) {
      result = (amount / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
    } else if (absAmount >= 1e6) {
      result = (amount / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (absAmount >= 1e3) {
      result = (amount / 1e3).toFixed(1).replace(/\.0$/, '') + 'k'
    } else if (absAmount >= 100) {
      result = Math.round(amount).toString()
    } else if (absAmount >= 1) {
      result = amount.toFixed(2).replace(/\.00$/, '')
    } else if (absAmount > 0) {
      result = amount.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
    } else {
      result = '0'
    }
    return result
  }

  private setAmountProperties(holding: Holding, holdingData: any, blockchain: any): void {
    const decimalPlaces = blockchain.decimalPlaces

    const confirmed = this.convertSatsToMainUnit(holdingData.satsConfirmed, decimalPlaces)
    const unconfirmed = this.convertSatsToMainUnit(holdingData.satsUnconfirmed, decimalPlaces)
    const total = this.convertSatsToMainUnit(
      holdingData.satsConfirmed + holdingData.satsUnconfirmed,
      decimalPlaces
    )

    holding.amountConfirmed = confirmed.full
    holding.amountUnconfirmed = unconfirmed.full
    holding.amountTotal = total.full
    holding.amountTotalRounded = this.calculateRoundedAmount(parseFloat(total.full))

    holding.amountPrecedingConfirmed = confirmed.preceding
    holding.amountPrecedingUnconfirmed = unconfirmed.preceding
    holding.amountPrecedingTotal = total.preceding

    holding.amountTrailingConfirmed = confirmed.trailing
    holding.amountTrailingUnconfirmed = unconfirmed.trailing
    holding.amountTrailingTotal = total.trailing
  }

  logDataType(data: any, label: string) {
    console.log(`${label}:`)
    console.log(`- Type: ${typeof data}`)
    console.log(`- Is array: ${Array.isArray(data)}`)
    console.log(`- Value:`, data)
    if (typeof data === 'object' && data !== null) {
      console.log(`- Keys: ${Object.keys(data)}`)
    }
  }

  processHoldings(holdingsData: HoldingData[]): Holding[] {
    console.log('Processing holdings:', holdingsData)
    this.logDataType(holdingsData, 'Holdings data')

    return holdingsData.map((holdingData: HoldingData) => {
      let blockchain
      switch (holdingData.chain) {
        case 'evrmore_mainnet':
          blockchain = evrmore
          break
        case 'evrmore_testnet':
          blockchain = evrmoreTestnet
          break
        case 'ravencoin_mainnet':
          blockchain = ravencoin
          break
        case 'ravencoin_testnet':
          blockchain = ravencoinTestnet
          break
        default:
          throw new Error(`Unsupported blockchain: ${holdingData.chain}`)
      }

      const holdingType =
        holdingData.symbol === 'EVR' || holdingData.symbol === 'RVN'
          ? HoldingType.BLOCKCHAIN
          : HoldingType.ASSET
      const name =
        holdingData.symbol === 'EVR' || holdingData.symbol === 'RVN'
          ? blockchain.name
          : holdingData.symbol
      const canMint = holdingType === HoldingType.BLOCKCHAIN
      const iconImageUrl =
        holdingType === HoldingType.BLOCKCHAIN ? getIconImageUrl(blockchain.name) : undefined
      const iconColor =
        holdingType === HoldingType.ASSET ? this.getContrastingIconBackgroundColor() : undefined

      // Get fiat value from ExchangeFiatValueService
      const fiatValue = ExchangeFiatValueService.getFiatValue(name)

      const holding = new Holding({
        name: name,
        satConfirmed: holdingData.satsConfirmed,
        satsUnconfirmed: holdingData.satsUnconfirmed,
        satsTotal: holdingData.satsConfirmed + holdingData.satsUnconfirmed,
        amountConfirmed: '0',
        amountUnconfirmed: '0',
        amountTotal: '0',
        amountTotalRounded: '0',
        amountPrecedingConfirmed: '0',
        amountPrecedingUnconfirmed: '0',
        amountPrecedingTotal: '0',
        amountTrailingConfirmed: '0',
        amountTrailingUnconfirmed: '0',
        amountTrailingTotal: '0',
        hasAdmin: false, // Hardcoded for now
        fiatValue: fiatValue,
        holdingType: holdingType,
        // pubKey: holdingData.walletPubKey,
        blockchain: blockchain,
        canMint: canMint,
        iconImageUrl: iconImageUrl,
        iconColor: iconColor
      })

      this.setAmountProperties(holding, holdingData, blockchain)

      return holding
    })
  }
}
