import type { DashboardBlockRow } from '../BlocksTableRow'
import type { DashboardTransactionRow } from '../TransactionsTableRow'
import { getChainId, getLastNBlocksWithTx } from '../../../web3_0/overview'

export type DashboardInfo = {
  latestBlocks: DashboardBlockRow[]
  latestTransactions: DashboardTransactionRow[]
  overviewStats: DashboardStat[]
}

export type DashboardStat = {
  label: string
  value: string
}


export async function getDashboardInfo(rpcUrl: string): Promise<DashboardInfo> {
  const [dataFromApi, chainId] = await Promise.all([
    getLastNBlocksWithTx(rpcUrl, 4),
    getChainId(rpcUrl),
  ])
  const blockRows: DashboardBlockRow[] = [];
  for (let i = 0; i < dataFromApi.blocks.length; i++) {
    const blockNumberStr = dataFromApi.blocks[i].Number.toString()
    const timestampStr = dataFromApi.blocks[i].Timestamp.toISOString()
    const transactionCountStr = dataFromApi.blocks[i].TransactionCount.toString()
    blockRows.push({ blockNumber: blockNumberStr, timestamp: timestampStr, transactionCount: transactionCountStr })
  }

  const transactionRows: DashboardTransactionRow[] = [];
  for (let i = 0; i < dataFromApi.txs.length; i++) {
    const hashStr = dataFromApi.txs[i].Hash
    const fromStr = dataFromApi.txs[i].From
    const toStr = dataFromApi.txs[i].To
    const valueStr = dataFromApi.txs[i].Value.toString()
    transactionRows.push({ hash: hashStr, from: fromStr, to: toStr, value: valueStr })
  }

  const stats: DashboardStat[] = [
    { label: 'Current Block Number', value: dataFromApi.latestBlockNumber.toString() },
    { label: 'Network Chain ID', value: chainId },
    { label: 'Indexer Status', value: 'Synced' },
  ]

  return {
    latestBlocks: blockRows,
    latestTransactions: transactionRows,
    overviewStats: stats,
  }
} 
