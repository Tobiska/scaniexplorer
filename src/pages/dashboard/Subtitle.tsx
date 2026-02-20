type DashboardSubtitleProps = {
  children: string
}

export function DashboardSubtitle({ children }: DashboardSubtitleProps) {
  return <h3 className="dashboard__subtitle">{children}</h3>
}
