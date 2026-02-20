import type { KeyboardEvent } from 'react'

export type DashboardBlockRow = {
  blockNumber: string
  timestamp: string
  transactionCount: string
}

type DashboardBlocksTableRowProps = {
  row: DashboardBlockRow
  onSelect?: (blockNumber: string) => void
}

export function DashboardBlocksTableRow({ row, onSelect }: DashboardBlocksTableRowProps) {
  const handleSelect = () => {
    onSelect?.(row.blockNumber)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect()
    }
  }

  const isInteractive = Boolean(onSelect)
  const rowClassName = isInteractive
    ? 'dashboard__table-row dashboard__table-row--link'
    : 'dashboard__table-row'

  return (
    <tr
      className={rowClassName}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'link' : undefined}
      aria-label={isInteractive ? `View block ${row.blockNumber}` : undefined}
    >
      <td className="dashboard__table-cell">{row.blockNumber}</td>
      <td className="dashboard__table-cell">{row.timestamp}</td>
      <td className="dashboard__table-cell dashboard__table-cell--end dashboard__table-cell--hide-md">
        {row.transactionCount}
      </td>
    </tr>
  )
}
