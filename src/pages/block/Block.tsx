import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import './block.css'
import '../../styles/explorer-header.css'
import { PageLoader } from '../../components/Loader'
import { BlockHeader } from './Header'
import { BlockOverviewSection } from './OverviewSection'
import { BlockTransactionsSection } from './TransactionsSection'
import { getFromApi, type ApiInfo, type BlockOverviewItem } from './api'
import type { BlockTransaction } from './TransactionsRow'

const navLinks = [
  { label: 'Home', to: '/dashboard' },
  { label: 'Blocks', to: '/dashboard' },
]

type BlockLoadSetters = {
  setOverviewItems: (value: BlockOverviewItem[]) => void
  setTransactions: (value: BlockTransaction[]) => void
  setIsLoading: (value: boolean) => void
}

const loadBlockData = async (
  rpcUrl: string | null,
  blockNumber: string | undefined,
  setters: BlockLoadSetters,
) => {
  setters.setIsLoading(true)
  if (!rpcUrl || !blockNumber) {
    setters.setOverviewItems([])
    setters.setTransactions([])
    setters.setIsLoading(false)
    return
  }
  const blockInfo: ApiInfo = await getFromApi(rpcUrl, blockNumber)
  setters.setOverviewItems(blockInfo.overview)
  setters.setTransactions(blockInfo.txs)
  setters.setIsLoading(false)
}

export default function Block() {
  const { blockNumber } = useParams()
  const [searchParams] = useSearchParams()
  const rpcUrl = searchParams.get('rpcUrl')
  const navigate = useNavigate()
  const resolvedBlockNumber = useMemo(
    () => (blockNumber ? decodeURIComponent(blockNumber) : undefined),
    [blockNumber],
  )
  const [overviewItems, setOverviewItems] = useState<BlockOverviewItem[]>([])
  const [transactions, setTransactions] = useState<BlockTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = () => {
    void loadBlockData(rpcUrl, resolvedBlockNumber, {
      setOverviewItems,
      setTransactions,
      setIsLoading,
    })
  }

  useEffect(() => {
    void loadBlockData(rpcUrl, resolvedBlockNumber, {
      setOverviewItems,
      setTransactions,
      setIsLoading,
    })
  }, [rpcUrl, resolvedBlockNumber])
  return (
    <div className="block-page" data-node-id="11:216">
      <BlockHeader brandLabel="Blockchain Explorer" links={navLinks} />

      <main className="block-page__content">
        <h1 className="visually-hidden">Block details</h1>
        <div className="block-page__actions">
          <button
            className="block-page__refresh"
            type="button"
            onClick={refreshData}
            disabled={isLoading}
          >
            Refresh data
          </button>
        </div>
        {isLoading ? (
          <PageLoader label="Loading block data…" />
        ) : (
          <>
            <BlockOverviewSection
              title="Block Overview"
              titleId="block-overview-title"
              items={overviewItems}
            />
            <BlockTransactionsSection
              title="Block Transactions"
              titleId="block-transactions-title"
              transactions={transactions}
              onTransactionSelect={(hash) =>
                navigate({
                  pathname: `/transactions/${encodeURIComponent(hash)}`,
                  search: rpcUrl ? createSearchParams({ rpcUrl }).toString() : '',
                })
              }
            />
          </>
        )}
      </main>
    </div>
  )
}
