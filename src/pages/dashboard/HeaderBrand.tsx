type DashboardHeaderBrandProps = {
  label: string
}

export function DashboardHeaderBrand({ label }: DashboardHeaderBrandProps) {
  return (
    <div className="explorer-header__brand">
      <span className="explorer-header__logo" aria-hidden>
        <svg className="explorer-header__logo-icon" viewBox="0 0 32 32" role="presentation">
          <circle cx="10" cy="10" r="4" />
          <circle cx="22" cy="10" r="4" />
          <circle cx="16" cy="22" r="4" />
          <path d="M13.3 12.5l2.7 5.1 2.7-5.1" />
        </svg>
      </span>
      {label}
    </div>
  )
}
