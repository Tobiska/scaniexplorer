import { useId, type FormEvent } from 'react'
import { SearchButton } from './Button'

type SearchFormProps = {
  label: string
  placeholder: string
  actionLabel: string
  defaultValue?: string
  onSubmit?: (value: string) => void
}

export function SearchForm({ label, placeholder, actionLabel, defaultValue, onSubmit }: SearchFormProps) {
  const inputId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!onSubmit) return
    const formData = new FormData(event.currentTarget)
    const value = formData.get('query')
    if (typeof value === 'string') {
      onSubmit(value)
    }
  }

  return (
    <form className="search__form" role="search" onSubmit={handleSubmit}>
      <label className="search__label visually-hidden" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="search__input"
        id={inputId}
        name="query"
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <SearchButton label={actionLabel} type="submit" />
    </form>
  )
}
