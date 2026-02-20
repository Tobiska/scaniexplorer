import { useId, type FormEvent } from 'react'
import { AppShellButton } from './Button'

type AppShellFormProps = {
  inputLabel: string
  inputPlaceholder: string
  actionLabel: string
  onSubmit?: (value: string) => void
}

export function AppShellForm({
  inputLabel,
  inputPlaceholder,
  actionLabel,
  onSubmit,
}: AppShellFormProps) {
  const inputId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!onSubmit) return
    const formData = new FormData(event.currentTarget)
    const value = formData.get('rpcUrl')
    if (typeof value === 'string') {
      onSubmit(value)
    }
  }

  return (
    <form className="app-shell__form" onSubmit={handleSubmit}>
      <label className="app-shell__label" htmlFor={inputId}>{inputLabel}</label>
      <input
        className="app-shell__input"
        id={inputId}
        name="rpcUrl"
        type="url"
        placeholder={inputPlaceholder}
      />
      <AppShellButton label={actionLabel} type="submit" />
    </form>
  )
}
