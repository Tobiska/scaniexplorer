import { SearchResultsRow, type SearchResultRow } from './ResultsRow'

type SearchResultsTableProps = {
  rows: SearchResultRow[]
  onSelect?: (row: SearchResultRow) => void
}

export function SearchResultsTable({ rows, onSelect }: SearchResultsTableProps) {
  return (
    <div className="search__results-card">
      <div className="search__table-wrapper">
        <table className="search__table">
          <thead className="search__table-head">
            <tr className="search__table-row search__table-row--head">
              <th className="search__table-cell search__table-cell--head" scope="col">Type</th>
              <th className="search__table-cell search__table-cell--head" scope="col">Primary</th>
              <th
                className="search__table-cell search__table-cell--head search__table-cell--hide-md"
                scope="col"
              >
                Secondary
              </th>
              <th className="search__table-cell search__table-cell--head search__table-cell--end" scope="col">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <SearchResultsRow key={row.primary + row.typeLabel} row={row} onSelect={onSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
