import { BlockHeaderBrand } from './HeaderBrand'
import { BlockHeaderNav } from './HeaderNav'

type BlockHeaderProps = {
  brandLabel: string
  links: { label: string; to: string }[]
}

export function BlockHeader({ brandLabel, links }: BlockHeaderProps) {
  return (
    <header className="explorer-header">
      <BlockHeaderBrand label={brandLabel} />
      <BlockHeaderNav links={links} />
    </header>
  )
}
