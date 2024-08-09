import axios from 'axios'

interface XeggexResponse {
  lastPrice: string
}

interface BinanceResponse {
  price: string
}

export class ExchangeFiatValueRepo {
  private static readonly XEGGEX_BASE_URL = 'https://api.xeggex.com/api/v2/market/getbysymbol/'
  private static readonly BINANCE_BASE_URL = 'https://api.binance.us/api/v3/ticker/price'

  static async getFiatValue(ticker: string): Promise<number> {
    try {
      let lastPrice: number

      if (ticker.toLowerCase() === 'evr') {
        lastPrice = await this.getXeggexPrice(ticker)
      } else if (ticker.toLowerCase() === 'rvn') {
        lastPrice = await this.getBinancePrice(ticker)
      } else {
        throw new Error(`Unsupported ticker: ${ticker}`)
      }

      console.log(`ExchangeFiatValueRepo ${ticker} lastPrice:`, lastPrice)
      return lastPrice
    } catch (error) {
      console.error('Error fetching fiat value:', error)
      return 0
    }
  }

  private static async getXeggexPrice(ticker: string): Promise<number> {
    const response = await axios.get<XeggexResponse>(`${this.XEGGEX_BASE_URL}${ticker}/USDT`, {
      headers: {
        Accept: 'application/json'
      }
    })
    return this.parsePrice(response.data.lastPrice)
  }

  private static async getBinancePrice(ticker: string): Promise<number> {
    const response = await axios.get<BinanceResponse>(`${this.BINANCE_BASE_URL}`, {
      params: {
        symbol: `${ticker.toUpperCase()}USDT`
      }
    })
    return this.parsePrice(response.data.price)
  }

  private static parsePrice(price: string): number {
    const parsedPrice = parseFloat(price)
    return isNaN(parsedPrice) ? 0 : parsedPrice
  }
}
