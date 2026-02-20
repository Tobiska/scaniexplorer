import { BlockSectionTitle } from './SectionTitle'
import { BlockTransactionsRow, type BlockTransaction } from './TransactionsRow'

type BlockTransactionsSectionProps = {
  title: string
  titleId: string
  transactions: BlockTransaction[]
  onTransactionSelect?: (hash: string) => void
}

export function BlockTransactionsSection({
  title,
  titleId,
  transactions,
  onTransactionSelect,
}: BlockTransactionsSectionProps) {
  return (
    <section className="block-page__section" aria-labelledby={titleId}>
      <BlockSectionTitle id={titleId}>{title}</BlockSectionTitle>
      <div className="block-page__card block-page__card--table">
        <div className="block-page__table-wrapper">
          <table className="block-page__table">
            <thead className="block-page__table-head">
              <tr className="block-page__table-row block-page__table-row--head">
                <th className="block-page__table-cell block-page__table-cell--head" scope="col">
                  Transaction Hash
                </th>
                <th
                  className="block-page__table-cell block-page__table-cell--head block-page__table-cell--hide-md"
                  scope="col"
                >
                  From
                </th>
                <th
                  className="block-page__table-cell block-page__table-cell--head block-page__table-cell--hide-sm"
                  scope="col"
                >
                  To
                </th>
                <th className="block-page__table-cell block-page__table-cell--head block-page__table-cell--end" scope="col">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <BlockTransactionsRow key={tx.hash} transaction={tx} onSelect={onTransactionSelect} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
