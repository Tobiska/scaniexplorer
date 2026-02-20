import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './search.css'
import '../../styles/explorer-header.css'
import { PageLoader } from '../../components/Loader'
import { SearchActions } from './Actions'
import { SearchForm } from './Form'
import { SearchHeader } from './Header'
import { SearchResultsSection } from './ResultsSection'
import { SearchTabs } from './Tabs'
import { SearchTitle } from './Title'
import { getSearchTabs, searchEntities, type SearchEntityType, type SearchTabItem } from './api'
import type { SearchResultRow } from './ResultsRow'

type Props = {
  onClose?: () => void
}

type SearchLoadSetters = {
  setTabs: (value: SearchTabItem[]) => void
  setResults: (value: SearchResultRow[]) => void
  setIsLoading: (value: boolean) => void
}

const resolveSearchType = (type: string | undefined): SearchEntityType => {
  switch (type) {
    case 'block':
    case 'blocks':
      return 'block'
    case 'transaction':
    case 'transactions':
    case 'tx':
      return 'transaction'
    case 'address':
    case 'addresses':
      return 'address'
    default:
      return 'all'
  }
}

const loadSearchData = async (
  query: string,
  selectedType: SearchEntityType,
  setters: SearchLoadSetters,
) => {
  setters.setIsLoading(true)
  const [tabs, results] = await Promise.all([
    getSearchTabs(),
    searchEntities(query, selectedType),
  ])
  setters.setTabs(tabs.map((tab) => ({ ...tab, selected: tab.type === selectedType })))
  setters.setResults(results)
  setters.setIsLoading(false)
}

export default function Search({ onClose }: Props) {
  const navigate = useNavigate()
  const { type, query } = useParams()
  const selectedType = useMemo(() => resolveSearchType(type), [type])
  const searchQuery = useMemo(() => (query ? decodeURIComponent(query) : ''), [query])
  const formKey = useMemo(() => `${selectedType}-${searchQuery}`, [selectedType, searchQuery])
  const [tabs, setTabs] = useState<SearchTabItem[]>([])
  const [results, setResults] = useState<SearchResultRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = () => {
    void loadSearchData(searchQuery, selectedType, {
      setTabs,
      setResults,
      setIsLoading,
    })
  }

  const handleSearch = (value: string) => {
    const trimmed = value.trim()
    const nextPath = trimmed
      ? `/search/${selectedType}/${encodeURIComponent(trimmed)}`
      : `/search/${selectedType}`
    navigate(nextPath)
  }

  const handleTabChange = (type: SearchEntityType) => {
    const nextPath = searchQuery
      ? `/search/${type}/${encodeURIComponent(searchQuery)}`
      : `/search/${type}`
    navigate(nextPath)
  }

  const handleResultSelect = (row: SearchResultRow) => {
    if (row.typeVariant === 'block') {
      const blockNumber = row.primary.replace('#', '')
      navigate(`/blocks/${encodeURIComponent(blockNumber)}`)
      return
    }

    if (row.typeVariant === 'tx') {
      navigate(`/transactions/${encodeURIComponent(row.primary)}`)
      return
    }

    if (row.typeVariant === 'address') {
      navigate(`/address/${encodeURIComponent(row.primary)}`)
    }
  }

  useEffect(() => {
    void loadSearchData(searchQuery, selectedType, {
      setTabs,
      setResults,
      setIsLoading,
    })
  }, [searchQuery, selectedType])

  return (
    <div className="search" data-node-id="11:117">
      <SearchHeader
        brandLabel="Blockchain Explorer"
        metaLabel="Search"
        homeLabel="Home"
        homeHref="/dashboard"
      />

      <main className="search__content">
        <div className="search__actions">
          <button className="search__button" type="button" onClick={refreshData} disabled={isLoading}>
            Refresh data
          </button>
        </div>
        <SearchTitle>Search</SearchTitle>
        <SearchForm
          key={formKey}
          label="Search blocks, transactions, or addresses"
          placeholder="Search blocks, transactions, or addresses"
          actionLabel="Search"
          defaultValue={searchQuery}
          onSubmit={handleSearch}
        />
        <SearchTabs ariaLabel="Result type" tabs={tabs} onTabChange={handleTabChange} />
        {isLoading ? (
          <PageLoader label="Loading search results…" />
        ) : (
          <SearchResultsSection
            ariaLabel="Search results"
            rows={results}
            onSelect={handleResultSelect}
          />
        )}
        <div className="search__actions">
          <SearchActions label="Close" onClose={onClose} />
        </div>
      </main>
    </div>
  )
}
