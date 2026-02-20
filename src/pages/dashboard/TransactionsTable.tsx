import { DashboardTableBlock } from './TableBlock'
import { DashboardTransactionsTableRow, type DashboardTransactionRow } from './TransactionsTableRow'

type DashboardTransactionsTableProps = {
  title: string
  rows: DashboardTransactionRow[]
  onRowSelect?: (hash: string) => void
}

export function DashboardTransactionsTable({
  title,
  rows,
  onRowSelect,
}: DashboardTransactionsTableProps) {
  return (
    <DashboardTableBlock title={title}>
      <table className="dashboard__table dashboard__table--transactions">
        <thead className="dashboard__table-head">
          <tr className="dashboard__table-row dashboard__table-row--head">
            <th className="dashboard__table-cell dashboard__table-cell--head" scope="col">
              Transaction Hash
            </th>
            <th
              className="dashboard__table-cell dashboard__table-cell--head dashboard__table-cell--hide-md"
              scope="col"
            >
              From
            </th>
            <th
              className="dashboard__table-cell dashboard__table-cell--head dashboard__table-cell--hide-md"
              scope="col"
            >
              To
            </th>
            <th className="dashboard__table-cell dashboard__table-cell--head dashboard__table-cell--end" scope="col">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <DashboardTransactionsTableRow key={row.hash} row={row} onSelect={onRowSelect} />
          ))}
        </tbody>
      </table>
    </DashboardTableBlock>
  )
}
