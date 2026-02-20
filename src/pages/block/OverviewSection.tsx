import { BlockOverviewItem } from './OverviewItem'
import { BlockSectionTitle } from './SectionTitle'

type BlockOverviewSectionProps = {
  title: string
  titleId: string
  items: {
    label: string
    value: string
    accent?: boolean
  }[]
}

export function BlockOverviewSection({ title, titleId, items }: BlockOverviewSectionProps) {
  return (
    <section className="block-page__section" aria-labelledby={titleId}>
      <BlockSectionTitle id={titleId}>{title}</BlockSectionTitle>
      <div className="block-page__card block-page__card--overview">
        <dl className="block-page__overview">
          {items.map((item) => (
            <BlockOverviewItem
              key={item.label}
              label={item.label}
              value={item.value}
              accent={item.accent}
            />
          ))}
        </dl>
      </div>
    </section>
  )
}
