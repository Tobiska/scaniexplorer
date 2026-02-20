type DashboardSectionTitleProps = {
  children: string
}

export function DashboardSectionTitle({ children }: DashboardSectionTitleProps) {
  return <h2 className="dashboard__section-title">{children}</h2>
}
