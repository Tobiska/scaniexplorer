import { formatEther } from 'ethers'
import { AccountInfo, getAccount } from '../../../web3_0/overview'

export type AddressOverviewData = {
  action: {
    label: string
    value: string
    actionLabel: string
    accent?: boolean
  }
  items: {
    label: string
    value: string
  }[]
}

const fallbackRpcUrl = 'http://localhost:8545'

const formatEtherFixed = (value: bigint, decimals = 6) => {
  const [whole, fraction = ''] = formatEther(value).split('.')
  if (decimals <= 0) return whole
  return `${whole}.${fraction.padEnd(decimals, '0').slice(0, decimals)}`
}

const buildEmptyData = (address?: string): AddressOverviewData => ({
  action: {
    label: 'Address',
    value: address ?? 'Unknown',
    actionLabel: 'Copy',
    accent: true,
  },
  items: [],
})

export const getAddressOverview = async (
  address?: string,
  rpcUrl = fallbackRpcUrl,
): Promise<AddressOverviewData> => {
  if (!address) {
    return buildEmptyData(address)
  }

  const accountInfo: AccountInfo = await getAccount(rpcUrl, address)

  const formattedBalance = `${formatEtherFixed(accountInfo.Balance, 6)} ETH`

  return {
    action: {
      label: 'Address',
      value: accountInfo.Address,
      actionLabel: 'Copy',
      accent: true,
    },
    items: [
      { label: 'Address Type', value: accountInfo.Type },
      { label: 'Native Balance', value: formattedBalance },
      { label: 'Nonce', value: accountInfo.Nonce.toString() },
    ],
  }
}
