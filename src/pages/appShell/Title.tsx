type AppShellTitleProps = {
  id?: string
  children: string
}

export function AppShellTitle({ id, children }: AppShellTitleProps) {
  return (
    <h1 className="app-shell__title" id={id}>
      {children}
    </h1>
  )
}
