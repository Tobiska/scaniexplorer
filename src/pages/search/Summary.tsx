type SearchSummaryProps = {
  children: string
}

export function SearchSummary({ children }: SearchSummaryProps) {
  return <span className="search__summary">{children}</span>
}
