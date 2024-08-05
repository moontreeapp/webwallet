export class ExchangeFiatValueService {
  static getFiatValue(symbol: string): string {
    // Simulate network delay
    // In a real scenario, you'd use async/await here

    // 30% chance of returning 0
    if (Math.random() < 0.3) {
      return '0'
    }

    // 70% chance of returning a random value between 0.01 and 1000
    return Number((Math.random() * 1000 + 0.01).toFixed(2)).toString()
  }
}
