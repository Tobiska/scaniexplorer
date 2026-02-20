import type { SearchEntityType } from './api'
import { SearchTab } from './Tab'

type SearchTabsProps = {
  ariaLabel: string
  tabs: {
    label: string
    type: SearchEntityType
    selected?: boolean
  }[]
  onTabChange?: (type: SearchEntityType) => void
}

export function SearchTabs({ ariaLabel, tabs, onTabChange }: SearchTabsProps) {
  return (
    <div className="search__tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <SearchTab
          key={tab.label}
          label={tab.label}
          selected={tab.selected}
          onClick={() => onTabChange?.(tab.type)}
        />
      ))}
    </div>
  )
}
