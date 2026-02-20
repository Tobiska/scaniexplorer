import { AddressHeaderBrand } from './HeaderBrand'
import { AddressHeaderNav } from './HeaderNav'

type AddressHeaderProps = {
  brandLabel: string
  links: { label: string; href: string }[]
}

export function AddressHeader({ brandLabel, links }: AddressHeaderProps) {
  return (
    <header className="explorer-header">
      <AddressHeaderBrand label={brandLabel} />
      <AddressHeaderNav links={links} />
    </header>
  )
}
