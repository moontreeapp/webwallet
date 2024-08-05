import { getIconImageUrl } from '../utils/iconUtils'

export enum AddressKind {
  P2PKH = 'P2PKH',
  P2SH = 'P2SH',
  Bech32 = 'Bech32'
}

export interface AddressType {
  kind: AddressKind
  prefixes: string[]
  regex: string
  networkVersion: number
  scriptVersion?: number
  hrp?: string
  checksumFunction: 'doubleSHA256' | 'blake256' | 'bech32'
  pubKeyHashLength: number
  checksumLength: number
  totalLength: number
}

export class Blockchain {
  constructor(params: {
    name: string
    ticker: string
    maxSupply: number
    decimalPlaces: number
    port: number
    iconUrl: string
    addressTypes: AddressType[]
  }) {
    this.name = params.name
    this.ticker = params.ticker
    this.maxSupply = params.maxSupply
    this.decimalPlaces = params.decimalPlaces
    this.port = params.port
    this.iconUrl = getIconImageUrl(params.iconUrl)
    this.addressTypes = params.addressTypes
  }

  name: string
  ticker: string
  maxSupply: number
  decimalPlaces: number
  port: number
  iconUrl: string
  addressTypes: AddressType[]
}

// -----------------------------------------------------------------------------
// Blockchain Classes
// -----------------------------------------------------------------------------
export class Evrmore extends Blockchain {
  constructor() {
    super({
      name: 'Evrmore',
      ticker: 'EVR',
      maxSupply: 15000000000,
      decimalPlaces: 8,
      port: 50022,
      iconUrl: 'evrmore',
      addressTypes: [
        //! --------------------------------------------------------------------
        //! Verify the details for the address types
        //! --------------------------------------------------------------------
        {
          kind: AddressKind.P2PKH,
          prefixes: ['E'],
          regex: '^[E][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 33,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        },
        {
          kind: AddressKind.P2SH,
          prefixes: ['e'],
          regex: '^[e][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 92,
          scriptVersion: 5,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        }
      ]
    })
  }
}

export class EvrmoreTestnet extends Blockchain {
  constructor() {
    super({
      name: 'Evrmore Testnet',
      ticker: 'EVRT',
      maxSupply: 15000000000,
      decimalPlaces: 8,
      port: 50032,
      iconUrl: 'evrmore_testnet',
      addressTypes: [
        //! --------------------------------------------------------------------
        //! Verify the details for the address types
        //! --------------------------------------------------------------------
        {
          kind: AddressKind.P2PKH,
          prefixes: ['m'],
          regex: '^[m][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 111,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        },
        {
          kind: AddressKind.P2SH,
          prefixes: ['2'],
          regex: '^[2][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 196,
          scriptVersion: 5,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        }
      ]
    })
  }
}

export class Ravencoin extends Blockchain {
  constructor() {
    super({
      name: 'Ravencoin',
      ticker: 'RVN',
      maxSupply: 21000000000,
      decimalPlaces: 8,
      port: 50002,
      iconUrl: 'ravencoin',
      addressTypes: [
        //! --------------------------------------------------------------------
        //! Verify the details for the address types
        //! --------------------------------------------------------------------
        {
          kind: AddressKind.P2PKH,
          prefixes: ['R'],
          regex: '^[R][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 60,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        },
        {
          kind: AddressKind.P2SH,
          prefixes: ['r'],
          regex: '^[r][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 122,
          scriptVersion: 5,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        }
      ]
    })
  }
}

export class RavencoinTestnet extends Blockchain {
  constructor() {
    super({
      name: 'Ravencoin Testnet',
      ticker: 'RVNT',
      maxSupply: 21000000000,
      decimalPlaces: 8,
      port: 50012,
      iconUrl: 'ravencoin_testnet',
      addressTypes: [
        //! --------------------------------------------------------------------
        //! Verify the details for the address types
        //! --------------------------------------------------------------------
        {
          kind: AddressKind.P2PKH,
          prefixes: ['m'],
          regex: '^[m][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 111,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        },
        {
          kind: AddressKind.P2SH,
          prefixes: ['2'],
          regex: '^[2][a-km-zA-HJ-NP-Z1-9]{33}$',
          networkVersion: 196,
          scriptVersion: 5,
          checksumFunction: 'doubleSHA256',
          pubKeyHashLength: 20,
          checksumLength: 4,
          totalLength: 25
        }
      ]
    })
  }
}
