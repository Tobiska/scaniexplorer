import type { KeyboardEvent } from 'react'
import { SearchPill } from './Pill'
import { SearchSummary } from './Summary'

export type SearchResultRow = {
  typeLabel: string
  typeVariant: 'block' | 'tx' | 'address'
  primary: string
  secondary: string
  time: string
  secondarySummary?: boolean
}

type SearchResultsRowProps = {
  row: SearchResultRow
  onSelect?: (row: SearchResultRow) => void
}

export function SearchResultsRow({ row, onSelect }: SearchResultsRowProps) {
  const handleSelect = () => {
    onSelect?.(row)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect()
    }
  }

  const isInteractive = Boolean(onSelect)
  const rowClassName = isInteractive ? 'search__table-row search__table-row--link' : 'search__table-row'

  return (
    <tr
      className={rowClassName}
      onClick={isInteractive ? handleSelect : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'link' : undefined}
      aria-label={isInteractive ? `View ${row.typeLabel} details` : undefined}
    >
      <td className="search__table-cell">
        <SearchPill label={row.typeLabel} variant={row.typeVariant} />
      </td>
      <td className="search__table-cell">{row.primary}</td>
      <td className="search__table-cell search__table-cell--hide-md">
        {row.secondarySummary ? <SearchSummary>{row.secondary}</SearchSummary> : row.secondary}
      </td>
      <td className="search__table-cell search__table-cell--end">{row.time}</td>
    </tr>
  )
}
