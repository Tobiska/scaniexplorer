type DashboardHeaderMetaProps = {
  hint: string
  children: string
}

export function DashboardHeaderMeta({ hint, children }: DashboardHeaderMetaProps) {
  return (
    <div className="explorer-header__meta" title={hint}>
      {children}
    </div>
  )
}
