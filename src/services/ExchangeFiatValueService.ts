import type { Blockchain } from '../models/Blockchain'
import { ExchangeFiatValueRepo } from '../repos/ExchangeFiatValueRepo'

export class ExchangeFiatValueService {
  private static validTickers = ['EVR', 'RVN'] // Add more tickers as needed

  static async getFiatValue(ticker: string, amount: number): Promise<string> {
    // Return '0' if the ticker is not valid
    if (!this.validTickers.includes(ticker.toUpperCase())) {
      return '0'
    }

    try {
      const price = await ExchangeFiatValueRepo.getFiatValue(ticker)
      const fiatValue = price * amount
      return fiatValue.toFixed(2)
    } catch (error) {
      console.error('Error getting fiat value:', error)
      return '0'
    }
  }
}
