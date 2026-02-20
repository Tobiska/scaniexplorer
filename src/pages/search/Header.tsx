import { Link } from 'react-router-dom'
import { SearchHeaderBrand } from './HeaderBrand'

type SearchHeaderProps = {
  brandLabel: string
  metaLabel: string
  homeLabel: string
  homeHref: string
}

export function SearchHeader({ brandLabel, homeLabel, homeHref }: SearchHeaderProps) {
  return (
    <header className="explorer-header">
      <SearchHeaderBrand label={brandLabel} />
      <div className="search__header-actions">
        <Link className="explorer-header__link" to={homeHref}>
          {homeLabel}
        </Link>
      </div>
    </header>
  )
}
