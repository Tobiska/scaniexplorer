import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import './transaction.css'
import '../../styles/explorer-header.css'
import { PageLoader } from '../../components/Loader'
import { TransactionDataSection } from './DataSection'
import { TransactionDetailsSection } from './DetailsSection'
import { TransactionHeader } from './Header'
import { TransactionLogsSection } from './LogsSection'
import { getTransactionDetails, type TransactionData } from './api'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Search', href: '#' },
  { label: 'Blocks', href: '#' },
]

type TransactionLoadSetters = {
  setTransactionData: (value: TransactionData) => void
  setIsLoading: (value: boolean) => void
}

const loadTransactionData = async (
  transactionHash: string | undefined,
  rpcUrl: string | null,
  setters: TransactionLoadSetters,
) => {
  setters.setIsLoading(true)
  const data = await getTransactionDetails(transactionHash, rpcUrl ?? undefined)
  setters.setTransactionData(data)
  setters.setIsLoading(false)
}

export default function Transaction() {
  const { txHash } = useParams()
  const [searchParams] = useSearchParams()
  const rpcUrl = searchParams.get('rpcUrl')
  const rpcQuery = rpcUrl ? createSearchParams({ rpcUrl }).toString() : ''
  const resolvedHash = useMemo(() => (txHash ? decodeURIComponent(txHash) : undefined), [txHash])
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const linkedOverviewDetails = useMemo(() => {
    if (!transactionData) return []
    return transactionData.overviewDetails.map((detail) => {
      if (detail.label === 'From Address' || detail.label === 'To Address') {
        return {
          ...detail,
          linkTo: rpcQuery
            ? `/address/${encodeURIComponent(detail.value)}?${rpcQuery}`
            : `/address/${encodeURIComponent(detail.value)}`,
        }
      }

      if (detail.label === 'Block Number') {
        const blockNumber = detail.value.startsWith('#')
          ? detail.value.slice(1)
          : detail.value
        return {
          ...detail,
          linkTo: rpcQuery
            ? `/blocks/${encodeURIComponent(blockNumber)}?${rpcQuery}`
            : `/blocks/${encodeURIComponent(blockNumber)}`,
        }
      }

      return detail
    })
  }, [transactionData])

  const refreshData = () => {
    void loadTransactionData(resolvedHash, rpcUrl, {
      setTransactionData,
      setIsLoading,
    })
  }

  useEffect(() => {
    void loadTransactionData(resolvedHash, rpcUrl, {
      setTransactionData,
      setIsLoading,
    })
  }, [resolvedHash, rpcUrl])
  return (
    <div className="transaction" data-node-id="11:300">
      <TransactionHeader brandLabel="Blockchain Explorer" links={navLinks} />

      <main className="transaction__content">
        <h1 className="visually-hidden">Transaction details</h1>
        <div className="transaction__actions">
          <button
            className="transaction__refresh"
            type="button"
            onClick={refreshData}
            disabled={isLoading}
          >
            Refresh data
          </button>
        </div>
        {isLoading || !transactionData ? (
          <PageLoader label="Loading transaction data…" />
        ) : (
          <>
            <TransactionDetailsSection
              title="Transaction Overview"
              titleId="transaction-overview-title"
              items={linkedOverviewDetails}
            />
            <TransactionDetailsSection
              title="Gas & Execution"
              titleId="transaction-gas-title"
              items={transactionData.gasDetails}
            />
            <TransactionDataSection
              title="Input Data"
              titleId="transaction-input-title"
              data={transactionData.inputData}
            />
            <TransactionLogsSection
              title="Receipt & Logs"
              titleId="transaction-logs-title"
              logs={transactionData.logs}
            />
          </>
        )}
      </main>
    </div>
  )
}
