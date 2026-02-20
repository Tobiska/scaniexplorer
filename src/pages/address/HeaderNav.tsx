type AddressHeaderLink = {
  label: string
  href: string
}

type AddressHeaderNavProps = {
  links: AddressHeaderLink[]
}

export function AddressHeaderNav({ links }: AddressHeaderNavProps) {
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
