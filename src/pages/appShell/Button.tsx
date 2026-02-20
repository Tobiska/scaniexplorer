type AppShellButtonProps = {
  label: string
  type?: 'button' | 'submit'
}

export function AppShellButton({ label, type = 'submit' }: AppShellButtonProps) {
  return (
    <button className="app-shell__button" type={type}>
      {label}
    </button>
  )
}
