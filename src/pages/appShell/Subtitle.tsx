type AppShellSubtitleProps = {
  children: string
}

export function AppShellSubtitle({ children }: AppShellSubtitleProps) {
  return <p className="app-shell__subtitle">{children}</p>
}
