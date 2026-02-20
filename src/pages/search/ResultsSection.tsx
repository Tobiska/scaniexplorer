import { SearchResultsTable } from './ResultsTable'
import type { SearchResultRow } from './ResultsRow'

type SearchResultsSectionProps = {
  ariaLabel: string
  rows: SearchResultRow[]
  onSelect?: (row: SearchResultRow) => void
}

export function SearchResultsSection({ ariaLabel, rows, onSelect }: SearchResultsSectionProps) {
  return (
    <section className="search__results" aria-label={ariaLabel}>
      <SearchResultsTable rows={rows} onSelect={onSelect} />
    </section>
  )
}
