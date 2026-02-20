type AppShellStatusProps = {
  status: string
}

export function AppShellStatus({ status }: AppShellStatusProps) {
  return (
    <div className="app-shell__status" role="status">
      {status}
    </div>
  )
}
