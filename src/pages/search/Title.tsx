type SearchTitleProps = {
  children: string
}

export function SearchTitle({ children }: SearchTitleProps) {
  return <h1 className="search__title">{children}</h1>
}
