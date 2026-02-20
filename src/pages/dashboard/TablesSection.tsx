import { DashboardBlocksTable } from './BlocksTable'
import { DashboardSectionTitle } from './SectionTitle'
import { DashboardTransactionsTable } from './TransactionsTable'
import type { DashboardBlockRow } from './BlocksTableRow'
import type { DashboardTransactionRow } from './TransactionsTableRow'

type DashboardTablesSectionProps = {
  ariaLabel: string
  title: string
  blocksTitle: string
  blocks: DashboardBlockRow[]
  transactionsTitle: string
  transactions: DashboardTransactionRow[]
  onBlockSelect?: (blockNumber: string) => void
  onTransactionSelect?: (hash: string) => void
}

export function DashboardTablesSection({
  ariaLabel,
  title,
  blocksTitle,
  blocks,
  transactionsTitle,
  transactions,
  onBlockSelect,
  onTransactionSelect,
}: DashboardTablesSectionProps) {
  return (
    <section className="dashboard__tables" aria-label={ariaLabel}>
      <DashboardSectionTitle>{title}</DashboardSectionTitle>
      <DashboardBlocksTable title={blocksTitle} rows={blocks} onRowSelect={onBlockSelect} />
      <DashboardTransactionsTable
        title={transactionsTitle}
        rows={transactions}
        onRowSelect={onTransactionSelect}
      />
    </section>
  )
}
