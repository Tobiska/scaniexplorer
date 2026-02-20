import { AddressTransactionsRow, type AddressTransaction } from './TransactionsRow'

type AddressTransactionsTableProps = {
  transactions: AddressTransaction[]
}

export function AddressTransactionsTable({ transactions }: AddressTransactionsTableProps) {
  return (
    <div className="address__table-wrapper">
      <table className="address__table">
        <thead className="address__table-head">
          <tr className="address__table-row address__table-row--head">
            <th className="address__table-cell address__table-cell--head" scope="col">
              Transaction Hash
            </th>
            <th className="address__table-cell address__table-cell--head" scope="col">
              Block Number
            </th>
            <th
              className="address__table-cell address__table-cell--head address__table-cell--hide-md"
              scope="col"
            >
              From
            </th>
            <th
              className="address__table-cell address__table-cell--head address__table-cell--hide-sm"
              scope="col"
            >
              To
            </th>
            <th className="address__table-cell address__table-cell--head address__table-cell--end" scope="col">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <AddressTransactionsRow key={transaction.hash} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
