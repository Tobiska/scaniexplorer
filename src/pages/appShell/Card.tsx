import { useId } from 'react'
import { AppShellForm } from './Form'
import { AppShellHeader } from './Header'
import { AppShellStatus } from './Status'

type AppShellCardProps = {
  title: string
  subtitle: string
  status: string
  inputLabel: string
  inputPlaceholder: string
  actionLabel: string
  onSubmit?: (value: string) => void
}

export function AppShellCard({
  title,
  subtitle,
  status,
  inputLabel,
  inputPlaceholder,
  actionLabel,
  onSubmit,
}: AppShellCardProps) {
  const headingId = useId()

  return (
    <section className="app-shell__card" aria-labelledby={headingId}>
      <AppShellHeader headingId={headingId} title={title} subtitle={subtitle} />
      <AppShellForm
        inputLabel={inputLabel}
        inputPlaceholder={inputPlaceholder}
        actionLabel={actionLabel}
        onSubmit={onSubmit}
      />
      <AppShellStatus status={status} />
    </section>
  )
}
