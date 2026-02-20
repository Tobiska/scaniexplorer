import { BlockInfo, getBlock } from '../../../web3_0/overview'
import { BlockOverviewItem } from '../OverviewItem'
import type { BlockTransaction } from '../TransactionsRow'

export type BlockOverviewItem = {
  label: string
  value: string
  accent?: boolean
}

export type ApiInfo = {
  overview: BlockOverviewItem[]
  txs: BlockTransaction[]
}


export async function getFromApi(rpcUrl: string, blockNumber: string): Promise<ApiInfo> {
  const blockInfo: BlockInfo = await getBlock(rpcUrl, Number(blockNumber))

  const txs: BlockTransaction[] = []

  for (let i = 0; i < blockInfo.Transactions.length; i++) {
    txs.push({
        hash: blockInfo.Transactions[i].Hash,
        from: blockInfo.Transactions[i].From,
        to: blockInfo.Transactions[i].To,
        value: blockInfo.Transactions[i].Value.toString()
    })
  }

  return {
    overview: [
      {label: 'Block Number', value: blockInfo.Number.toString(), accent: true},
      {label: 'Parent Hash', value: blockInfo.ParentHash.toString(), accent: true},
      {label: 'Gas Used / Gas Limit', value: `${blockInfo.GasUsed} / ${blockInfo.GasLimit}`, accent: true},
      {label: 'Hash', value: blockInfo.Hash, accent: false},
      {label: 'Timestamp', value: blockInfo.Timestamp.toISOString(), accent: false},
      {label: 'Txs Count', value: blockInfo.TransactionCount.toString(), accent: false},
    ],
    txs: txs
  }
}  
