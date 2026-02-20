import { TransactionDetailsList } from './DetailsList'
import { TransactionSectionTitle } from './SectionTitle'

type TransactionDetailsSectionProps = {
  title: string
  titleId: string
  items: {
    label: string
    value: string
    variant?: 'accent' | 'success'
    linkTo?: string
  }[]
}

export function TransactionDetailsSection({
  title,
  titleId,
  items,
}: TransactionDetailsSectionProps) {
  return (
    <section className="transaction__section" aria-labelledby={titleId}>
      <TransactionSectionTitle id={titleId}>{title}</TransactionSectionTitle>
      <div className="transaction__card">
        <TransactionDetailsList items={items} />
      </div>
    </section>
  )
}
