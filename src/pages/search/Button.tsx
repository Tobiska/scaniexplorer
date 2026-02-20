type SearchButtonProps = {
  label: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  onClick?: () => void
}

export function SearchButton({
  label,
  type = 'button',
  variant = 'primary',
  onClick,
}: SearchButtonProps) {
  const className =
    variant === 'ghost' ? 'search__button search__button--ghost' : 'search__button'

  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
    </button>
  )
}
