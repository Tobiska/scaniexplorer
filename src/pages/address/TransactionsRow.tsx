export type AddressTransaction = {
  hash: string
  block: string
  from: string
  to: string
  value: string
}

type AddressTransactionsRowProps = {
  transaction: AddressTransaction
}

export function AddressTransactionsRow({ transaction }: AddressTransactionsRowProps) {
  return (
    <tr className="address__table-row">
      <td className="address__table-cell address__table-cell--accent">{transaction.hash}</td>
      <td className="address__table-cell address__table-cell--accent">{transaction.block}</td>
      <td className="address__table-cell address__table-cell--accent address__table-cell--hide-md">
        {transaction.from}
      </td>
      <td className="address__table-cell address__table-cell--accent address__table-cell--hide-sm">
        {transaction.to}
      </td>
      <td className="address__table-cell address__table-cell--end">{transaction.value}</td>
    </tr>
  )
}
