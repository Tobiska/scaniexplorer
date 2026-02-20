import type { KeyboardEvent } from 'react'

export type DashboardTransactionRow = {
  hash: string
  from: string
  to: string
  value: string
}

type DashboardTransactionsTableRowProps = {
  row: DashboardTransactionRow
  onSelect?: (hash: string) => void
}

export function DashboardTransactionsTableRow({ row, onSelect }: DashboardTransactionsTableRowProps) {
  const handleSelect = () => {
    onSelect?.(row.hash)
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
      aria-label={isInteractive ? `View transaction ${row.hash}` : undefined}
    >
      <td className="dashboard__table-cell">{row.hash}</td>
      <td className="dashboard__table-cell dashboard__table-cell--hide-md">{row.from}</td>
      <td className="dashboard__table-cell dashboard__table-cell--hide-md">{row.to}</td>
      <td className="dashboard__table-cell dashboard__table-cell--end">{row.value}</td>
    </tr>
  )
}
