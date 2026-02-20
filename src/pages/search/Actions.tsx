import { SearchButton } from './Button'

type SearchActionsProps = {
  label: string
  onClose?: () => void
}

export function SearchActions({ label, onClose }: SearchActionsProps) {
  return <SearchButton label={label} variant="ghost" onClick={onClose} />
}
