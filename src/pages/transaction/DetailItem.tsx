import { Link } from 'react-router-dom'

type TransactionDetailItemProps = {
  label: string
  value: string
  variant?: 'accent' | 'success'
  linkTo?: string
}

export function TransactionDetailItem({ label, value, variant, linkTo }: TransactionDetailItemProps) {
  const className = variant
    ? `transaction__value transaction__value--${variant}`
    : 'transaction__value'

  const valueContent = linkTo ? (
    <Link className="transaction__value-link" to={linkTo}>
      {value}
    </Link>
  ) : (
    value
  )

  return (
    <div className="transaction__detail">
      <dt className="transaction__label">{label}</dt>
      <dd className={className}>{valueContent}</dd>
    </div>
  )
}
