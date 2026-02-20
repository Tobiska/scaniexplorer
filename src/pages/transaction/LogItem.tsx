export type TransactionLog = {
  index: string
  contract: string
  topics: string
  data: string
}

type TransactionLogItemProps = {
  log: TransactionLog
}

export function TransactionLogItem({ log }: TransactionLogItemProps) {
  return (
    <li className="transaction__log-card">
      <dl className="transaction__details transaction__details--log">
        <div className="transaction__detail">
          <dt className="transaction__label">Log Index</dt>
          <dd className="transaction__value">{log.index}</dd>
        </div>
        <div className="transaction__detail">
          <dt className="transaction__label">Contract Address</dt>
          <dd className="transaction__value transaction__value--accent">{log.contract}</dd>
        </div>
        <div className="transaction__detail">
          <dt className="transaction__label">Topics</dt>
          <dd className="transaction__value">{log.topics}</dd>
        </div>
        <div className="transaction__detail">
          <dt className="transaction__label">Data</dt>
          <dd className="transaction__value">{log.data}</dd>
        </div>
      </dl>
    </li>
  )
}
