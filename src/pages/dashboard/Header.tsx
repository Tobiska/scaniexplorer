import { Link } from 'react-router-dom'
import { DashboardHeaderBrand } from './HeaderBrand'
import { DashboardHeaderMeta } from './HeaderMeta'

type DashboardHeaderProps = {
  brandLabel: string
  metaLabel: string
  metaHint: string
  searchLabel: string
  searchHref: string
}

export function DashboardHeader({
  brandLabel,
  metaLabel,
  metaHint,
  searchLabel,
  searchHref,
}: DashboardHeaderProps) {
  return (
    <header className="explorer-header">
      <DashboardHeaderBrand label={brandLabel} />
      <div className="dashboard__header-actions">
        <DashboardHeaderMeta hint={metaHint}>{metaLabel}</DashboardHeaderMeta>
        <Link className="explorer-header__link" to={searchHref}>
          {searchLabel}
        </Link>
      </div>
    </header>
  )
}
