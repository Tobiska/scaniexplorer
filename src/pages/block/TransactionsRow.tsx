import type { KeyboardEvent } from 'react'

export type BlockTransaction = {
  hash: string
  from: string
  to: string
  value: string
}

type BlockTransactionsRowProps = {
  transaction: BlockTransaction
  onSelect?: (hash: string) => void
}

export function BlockTransactionsRow({ transaction, onSelect }: BlockTransactionsRowProps) {
  const handleSelect = () => {
    onSelect?.(transaction.hash)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect()
    }
  }

  const isInteractive = Boolean(onSelect)
  const rowClassName = isInteractive
    ? 'block-page__table-row block-page__table-row--link'
    : 'block-page__table-row'

  return (
    <tr
      className={rowClassName}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'link' : undefined}
      aria-label={isInteractive ? `View transaction ${transaction.hash}` : undefined}
    >
      <td className="block-page__table-cell block-page__table-cell--accent">{transaction.hash}</td>
      <td className="block-page__table-cell block-page__table-cell--accent block-page__table-cell--hide-md">
        {transaction.from}
      </td>
      <td className="block-page__table-cell block-page__table-cell--accent block-page__table-cell--hide-sm">
        {transaction.to}
      </td>
      <td className="block-page__table-cell block-page__table-cell--end">{transaction.value}</td>
    </tr>
  )
}
