import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import './dashboard.css'
import '../../styles/explorer-header.css'
import { PageLoader } from '../../components/Loader'
import { DashboardHeader } from './Header'
import { DashboardOverviewSection } from './OverviewSection'
import { DashboardTablesSection } from './TablesSection'
import {
  type DashboardStat,
  getDashboardInfo,
} from './api'
import type { DashboardBlockRow } from './BlocksTableRow'
import type { DashboardTransactionRow } from './TransactionsTableRow'

type Props = { rpcUrl: string }

type DashboardLoadSetters = {
  setOverviewStats: (value: DashboardStat[]) => void
  setLatestBlocks: (value: DashboardBlockRow[]) => void
  setLatestTransactions: (value: DashboardTransactionRow[]) => void
  setIsLoading: (value: boolean) => void
}

const loadDashboardData = async (rpcUrl: string, setters: DashboardLoadSetters) => {
  setters.setIsLoading(true)
  const {overviewStats, latestBlocks, latestTransactions} = await getDashboardInfo(rpcUrl)
  setters.setOverviewStats(overviewStats)
  setters.setLatestBlocks(latestBlocks)
  setters.setLatestTransactions(latestTransactions)
  setters.setIsLoading(false)
}

export default function Dashboard({ rpcUrl }: Props) {
  // Using rpcUrl in UI for now; replace with live data later
  const hint = `Connected to: ${rpcUrl}`
  const navigate = useNavigate()
  const [overviewStats, setOverviewStats] = useState<DashboardStat[]>([])
  const [latestBlocks, setLatestBlocks] = useState<DashboardBlockRow[]>([])
  const [latestTransactions, setLatestTransactions] = useState<DashboardTransactionRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = () => {
    void loadDashboardData(rpcUrl, {
      setOverviewStats,
      setLatestBlocks,
      setLatestTransactions,
      setIsLoading,
    })
  }

  useEffect(() => {
    void loadDashboardData(rpcUrl, {
      setOverviewStats,
      setLatestBlocks,
      setLatestTransactions,
      setIsLoading,
    })
  }, [rpcUrl])
  return (
    <div className="dashboard" data-node-id="11:18">
      <DashboardHeader
        brandLabel="Blockchain Explorer"
        metaLabel="RPC Connection: Connected"
        metaHint={hint}
        searchLabel="Search"
        searchHref="/search/all"
      />

      <main className="dashboard__content">
        <h1 className="visually-hidden">Dashboard</h1>
        <div className="dashboard__actions">
          <button
            className="dashboard__refresh"
            type="button"
            onClick={refreshData}
            disabled={isLoading}
          >
            Refresh data
          </button>
        </div>
        {isLoading ? (
          <PageLoader label="Loading dashboard data…" />
        ) : (
          <>
            <DashboardOverviewSection ariaLabel="Network overview" stats={overviewStats} />
            <DashboardTablesSection
              ariaLabel="Live data tables"
              title="Live Data Tables"
              blocksTitle="Latest Blocks"
              blocks={latestBlocks}
              transactionsTitle="Latest Transactions"
              transactions={latestTransactions}
              onBlockSelect={(blockNumber) =>
                navigate({
                  pathname: `/blocks/${encodeURIComponent(blockNumber)}`,
                  search: createSearchParams({ rpcUrl }).toString(),
                })
              }
              onTransactionSelect={(hash) =>
                navigate({
                  pathname: `/transactions/${encodeURIComponent(hash)}`,
                  search: createSearchParams({ rpcUrl }).toString(),
                })
              }
            />
          </>
        )}
      </main>
    </div>
  )
}
