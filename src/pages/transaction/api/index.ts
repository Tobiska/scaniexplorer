import type { TransactionLog } from '../LogItem'
import { getTransction, TransactionDetailsInfo } from '../../../web3_0/overview'

export type TransactionDetail = {
  label: string
  value: string
  variant?: 'accent' | 'success'
  linkTo?: string
}

export type TransactionData = {
  overviewDetails: TransactionDetail[]
  gasDetails: TransactionDetail[]
  inputData: string
  logs: TransactionLog[]
}

const getStatusLabel = (status: number | null) => {
  if (status === 1) return { value: 'Success', variant: 'success' as const }
  if (status === 0) return { value: 'Failed' }
  return { value: 'Pending' }
}

export const getTransactionDetails = async (
  transactionHash?: string,
  rpcUrl = "",
): Promise<TransactionData> => {
  if (!transactionHash) {
    return {
      overviewDetails: [],
      gasDetails: [],
      inputData: '',
      logs: [],
    }
  }

  const transactionInfo: TransactionDetailsInfo = await getTransction(rpcUrl, transactionHash)
  const statusLabel = getStatusLabel(transactionInfo.Status)
  const blockValue =
    transactionInfo.BlockNumber !== null ? `#${transactionInfo.BlockNumber}` : 'Pending'

  return {
    overviewDetails: [
      { label: 'Transaction Hash', value: transactionInfo.Hash },
      { label: 'Status', value: statusLabel.value, variant: statusLabel.variant },
      { label: 'Block Number', value: blockValue, variant: 'accent' },
      { label: 'From Address', value: transactionInfo.From, variant: 'accent' },
      { label: 'To Address', value: transactionInfo.To, variant: 'accent' },
      { label: 'Value', value: transactionInfo.Value.toString() },
    ],
    gasDetails: [
      { label: 'Gas Limit', value: transactionInfo.GasLimit.toString() },
      { label: 'Gas Used', value: transactionInfo.GasUsed.toString() },
      { label: 'Effective Gas Price', value: transactionInfo.EffectiveGasPrice.toString() },
      { label: 'Transaction Fee', value: transactionInfo.TransactionFee.toString() },
    ],
    inputData: transactionInfo.InputData,
    logs: transactionInfo.Logs.map((log) => ({
      index: log.Index.toString(),
      contract: log.Contract,
      topics: log.Topics.join(', '),
      data: log.Data,
    })),
  }
}
