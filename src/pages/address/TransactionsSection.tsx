import { AddressSectionTitle } from './SectionTitle'
import { AddressTableFooter } from './TableFooter'
import { AddressTransactionsTable } from './TransactionsTable'
import type { AddressTransaction } from './TransactionsRow'

type AddressTransactionsSectionProps = {
  title: string
  titleId: string
  transactions: AddressTransaction[]
  previousLabel: string
  nextLabel: string
}

export function AddressTransactionsSection({
  title,
  titleId,
  transactions,
  previousLabel,
  nextLabel,
}: AddressTransactionsSectionProps) {
  return (
    <section className="address__section" aria-labelledby={titleId}>
      <AddressSectionTitle id={titleId}>{title}</AddressSectionTitle>
      <div className="address__card address__card--table">
        <AddressTransactionsTable transactions={transactions} />
        <AddressTableFooter previousLabel={previousLabel} nextLabel={nextLabel} />
      </div>
    </section>
  )
}
