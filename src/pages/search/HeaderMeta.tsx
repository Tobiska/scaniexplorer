type SearchHeaderMetaProps = {
  label: string
}

export function SearchHeaderMeta({ label }: SearchHeaderMetaProps) {
  return <div className="explorer-header__meta">{label}</div>
}
