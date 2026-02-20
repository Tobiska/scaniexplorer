import { TransactionHeaderBrand } from './HeaderBrand'
import { TransactionHeaderNav } from './HeaderNav'

type TransactionHeaderProps = {
  brandLabel: string
  links: { label: string; href: string }[]
}

export function TransactionHeader({ brandLabel, links }: TransactionHeaderProps) {
  return (
    <header className="explorer-header">
      <TransactionHeaderBrand label={brandLabel} />
      <TransactionHeaderNav links={links} />
    </header>
  )
}
