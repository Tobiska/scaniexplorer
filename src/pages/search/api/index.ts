import { withDelay } from '../../../utils/delay'
import type { SearchResultRow } from '../ResultsRow'

export type SearchEntityType = 'all' | 'block' | 'transaction' | 'address'

export type SearchTabItem = {
  label: string
  type: SearchEntityType
  selected?: boolean
}

const resultsFixture: SearchResultRow[] = [
  {
    typeLabel: 'Block',
    typeVariant: 'block',
    primary: '#12,345,678',
    secondary: '123 txs',
    time: '14:23:30',
  },
  {
    typeLabel: 'Tx',
    typeVariant: 'tx',
    primary: '0x123…789',
    secondary: 'From 0xabc…456 → 0xdef…012',
    time: '14:22:45',
    secondarySummary: true,
  },
  {
    typeLabel: 'Address',
    typeVariant: 'address',
    primary: '0xabc…456',
    secondary: 'Balance 3.21 ETH',
    time: '—',
    secondarySummary: true,
  },
]

export const getSearchTabs = async (): Promise<SearchTabItem[]> =>
  withDelay([
    { label: 'All', type: 'all' },
    { label: 'Blocks', type: 'block' },
    { label: 'Transactions', type: 'transaction' },
    { label: 'Addresses', type: 'address' },
  ])

export const searchEntities = async (
  query: string,
  entityType: SearchEntityType,
): Promise<SearchResultRow[]> => {
  const normalizedQuery = query.trim().toLowerCase()
  const resolvedType = entityType === 'transaction' ? 'tx' : entityType
  const filteredByType =
    resolvedType === 'all'
      ? resultsFixture
      : resultsFixture.filter((result) => result.typeVariant === resolvedType)

  const filtered = !normalizedQuery
    ? filteredByType
    : filteredByType.filter((result) => {
        const primary = result.primary.toLowerCase()
        const secondary = result.secondary.toLowerCase()
        return primary.includes(normalizedQuery) || secondary.includes(normalizedQuery)
      })

  return withDelay(filtered)
}
