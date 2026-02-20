import { AddressOverviewAction } from './OverviewAction'
import { AddressOverviewItem } from './OverviewItem'
import { AddressSectionTitle } from './SectionTitle'

type AddressOverviewSectionProps = {
  title: string
  titleId: string
  action: {
    label: string
    value: string
    actionLabel: string
    accent?: boolean
  }
  items: {
    label: string
    value: string
  }[]
}

export function AddressOverviewSection({
  title,
  titleId,
  action,
  items,
}: AddressOverviewSectionProps) {
  return (
    <section className="address__section" aria-labelledby={titleId}>
      <AddressSectionTitle id={titleId}>{title}</AddressSectionTitle>
      <div className="address__card">
        <dl className="address__overview">
          <AddressOverviewAction
            label={action.label}
            value={action.value}
            actionLabel={action.actionLabel}
            accent={action.accent}
          />
          {items.map((item) => (
            <AddressOverviewItem key={item.label} label={item.label} value={item.value} />
          ))}
        </dl>
      </div>
    </section>
  )
}
