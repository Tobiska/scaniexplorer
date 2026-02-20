import { DashboardStatCard } from './StatCard'

type DashboardOverviewSectionProps = {
  ariaLabel: string
  stats: {
    label: string
    value: string
  }[]
}

export function DashboardOverviewSection({ ariaLabel, stats }: DashboardOverviewSectionProps) {
  return (
    <section className="dashboard__overview" aria-label={ariaLabel}>
      {stats.map((stat) => (
        <DashboardStatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </section>
  )
}
