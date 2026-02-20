import { TransactionDetailItem } from './DetailItem'

type TransactionDetailsListProps = {
  items: {
    label: string
    value: string
    variant?: 'accent' | 'success'
    linkTo?: string
  }[]
}

export function TransactionDetailsList({ items }: TransactionDetailsListProps) {
  return (
    <dl className="transaction__details">
      {items.map((item) => (
        <TransactionDetailItem
          key={item.label}
          label={item.label}
          value={item.value}
          variant={item.variant}
          linkTo={item.linkTo}
        />
      ))}
    </dl>
  )
}
