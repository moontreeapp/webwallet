import type { AddressType, Blockchain } from '../models/Blockchain'
import bs58 from 'bs58'

export async function isValidAddress(address: string, blockchain: Blockchain): Promise<boolean> {
  // Step 1: Quick regex check
  const matchingType = blockchain.addressTypes.find((type) => new RegExp(type.regex).test(address))

  if (!matchingType) {
    console.log('Address failed regex check')
    return false
  }

  // Step 2: Verify if the address type is allowed for this blockchain
  if (!blockchain.addressTypes.includes(matchingType)) {
    console.log('Address type not allowed for this blockchain')
    return false
  }

  // Step 3: Perform thorough checksum validation
  try {
    switch (matchingType.checksumFunction) {
      case 'doubleSHA256':
        return await validateLegacyAddress(address, matchingType)
      case 'bech32':
        return validateBech32Address(address, matchingType)
      default:
        console.log('Unknown checksum function')
        return false
    }
  } catch (error) {
    console.log('Checksum validation failed:', error)
    return false
  }
}

async function validateLegacyAddress(address: string, addressType: AddressType): Promise<boolean> {
  const decoded = base58Decode(address)
  if (decoded.length !== addressType.totalLength) {
    console.log('Invalid address length')
    return false
  }

  const version = decoded[0]
  if (version !== addressType.networkVersion) {
    console.log('Invalid network version')
    return false
  }

  const payload = decoded.slice(0, -addressType.checksumLength)
  const checksum = decoded.slice(-addressType.checksumLength)
  const calculatedChecksum = (await doubleSHA256(payload)).slice(0, addressType.checksumLength)

  return checksum.every((byte, i) => byte === calculatedChecksum[i])
}

function validateBech32Address(address: string, addressType: AddressType): boolean {
  const { prefix, words } = bech32Decode(address)
  if (prefix !== addressType.hrp) {
    console.log('Invalid Bech32 prefix')
    return false
  }

  // Additional Bech32-specific checks...

  return true
}

function base58Decode(address: string): Uint8Array {
  return bs58.decode(address)
}

function bech32Decode(address: string): { prefix: string; words: number[] } {
  // Implement Bech32 decoding
  // You might want to use a library like 'bech32' for this
  throw new Error('Bech32 decoding not implemented')
}

async function doubleSHA256(data: Uint8Array): Promise<Uint8Array> {
  const crypto = window.crypto.subtle
  const firstHash = await crypto.digest('SHA-256', data)
  const secondHash = await crypto.digest('SHA-256', firstHash)
  return new Uint8Array(secondHash)
}
