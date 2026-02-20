type SearchPillProps = {
  label: string
  variant: 'block' | 'tx' | 'address'
}

export function SearchPill({ label, variant }: SearchPillProps) {
  return <span className={`search__pill search__pill--${variant}`}>{label}</span>
}
