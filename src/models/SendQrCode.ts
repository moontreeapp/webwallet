export class SendQrCode {
  constructor(params: { to: string; amount: string }) {
    this.to = params.to
    this.amount = params.amount
  }

  to: string
  amount: string
}
