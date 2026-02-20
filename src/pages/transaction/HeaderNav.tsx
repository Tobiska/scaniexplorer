type TransactionHeaderLink = {
  label: string
  href: string
}

type TransactionHeaderNavProps = {
  links: TransactionHeaderLink[]
}

export function TransactionHeaderNav({ links }: TransactionHeaderNavProps) {
  return (
    <nav className="explorer-header__nav" aria-label="Primary">
      {links.map((link) => (
        <a
          key={link.label}
          className="explorer-header__link"
          href={link.href}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
