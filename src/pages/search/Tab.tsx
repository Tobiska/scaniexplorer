type SearchTabProps = {
  label: string
  selected?: boolean
  onClick?: () => void
}

export function SearchTab({ label, selected = false, onClick }: SearchTabProps) {
  const className = selected ? 'search__tab search__tab--active' : 'search__tab'

  return (
    <button className={className} role="tab" aria-selected={selected} type="button" onClick={onClick}>
      {label}
    </button>
  )
}
