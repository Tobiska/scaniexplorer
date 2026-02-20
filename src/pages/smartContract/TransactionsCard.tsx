type TransactionRow = {
  hash: string
  from: string
  to: string
  method: string
  status: string
  gasUsed: string
  block: string
}

type Props = {
  rows: TransactionRow[]
}

export default function TransactionsCard({ rows }: Props) {
  return (
    <section className="sc-card">
      <div className="sc-card-title">Contract Transactions</div>
      <div className="sc-table">
        <div className="sc-row head">
          <div>Tx Hash</div>
          <div>From</div>
          <div>To</div>
          <div>Method</div>
          <div>Status</div>
          <div>Gas Used</div>
          <div>Block</div>
        </div>
        {rows.map((row) => (
          <button className="sc-row row-button" type="button" key={`${row.hash}-${row.block}`}>
            <div>{row.hash}</div>
            <div>{row.from}</div>
            <div>{row.to}</div>
            <div>{row.method}</div>
            <div>{row.status}</div>
            <div>{row.gasUsed}</div>
            <div>{row.block}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
