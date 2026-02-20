import { Link } from 'react-router-dom'

type BlockHeaderLink = {
  label: string
  to: string
}

type BlockHeaderNavProps = {
  links: BlockHeaderLink[]
}

export function BlockHeaderNav({ links }: BlockHeaderNavProps) {
  return (
    <nav className="explorer-header__nav" aria-label="Primary">
      {links.map((link) => (
        <Link key={link.label} className="explorer-header__link" to={link.to}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
