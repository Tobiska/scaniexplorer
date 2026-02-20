type DashboardStatCardProps = {
  label: string
  value: string
}

export function DashboardStatCard({ label, value }: DashboardStatCardProps) {
  return (
    <article className="dashboard__card dashboard__card--stat">
      <p className="dashboard__stat-label">{label}</p>
      <p className="dashboard__stat-value">{value}</p>
    </article>
  )
}
