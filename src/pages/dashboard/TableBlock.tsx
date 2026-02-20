import type { ReactNode } from 'react'
import { DashboardSubtitle } from './Subtitle'

type DashboardTableBlockProps = {
  title: string
  children: ReactNode
}

export function DashboardTableBlock({ title, children }: DashboardTableBlockProps) {
  return (
    <div className="dashboard__table-block">
      <DashboardSubtitle>{title}</DashboardSubtitle>
      <div className="dashboard__table-card">
        <div className="dashboard__table-wrapper">{children}</div>
      </div>
    </div>
  )
}
