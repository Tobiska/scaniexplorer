import { AppShellSubtitle } from './Subtitle'
import { AppShellTitle } from './Title'

type AppShellHeaderProps = {
  title: string
  subtitle: string
  headingId: string
}

export function AppShellHeader({ title, subtitle, headingId }: AppShellHeaderProps) {
  return (
    <header className="app-shell__header">
      <AppShellTitle id={headingId}>{title}</AppShellTitle>
      <AppShellSubtitle>{subtitle}</AppShellSubtitle>
    </header>
  )
}
