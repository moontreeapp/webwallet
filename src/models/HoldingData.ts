import { Expose, Type } from 'class-transformer'

export class HoldingData {
  @Expose()
  id: string | null = null
  @Expose() error: string | null = null
  @Expose() @Type(() => Number) satsConfirmed: number = 0
  @Expose() @Type(() => Number) satsUnconfirmed: number = 0
  @Expose() symbol: string = ''
  @Expose() chain: string = ''
  @Expose() chainName: string = ''

  constructor(data?: Partial<HoldingData>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
