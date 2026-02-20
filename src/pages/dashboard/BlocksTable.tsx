import { DashboardTableBlock } from './TableBlock'
import { DashboardBlocksTableRow, type DashboardBlockRow } from './BlocksTableRow'

type DashboardBlocksTableProps = {
  title: string
  rows: DashboardBlockRow[]
  onRowSelect?: (blockNumber: string) => void
}

export function DashboardBlocksTable({ title, rows, onRowSelect }: DashboardBlocksTableProps) {
  return (
    <DashboardTableBlock title={title}>
      <table className="dashboard__table dashboard__table--blocks">
        <thead className="dashboard__table-head">
          <tr className="dashboard__table-row dashboard__table-row--head">
            <th className="dashboard__table-cell dashboard__table-cell--head" scope="col">
              Block Number
            </th>
            <th className="dashboard__table-cell dashboard__table-cell--head" scope="col">
              Timestamp
            </th>
            <th
              className="dashboard__table-cell dashboard__table-cell--head dashboard__table-cell--end dashboard__table-cell--hide-md"
              scope="col"
            >
              Transaction Count
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <DashboardBlocksTableRow key={row.blockNumber} row={row} onSelect={onRowSelect} />
          ))}
        </tbody>
      </table>
    </DashboardTableBlock>
  )
}
