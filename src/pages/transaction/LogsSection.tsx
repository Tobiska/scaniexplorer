import { TransactionLogItem, type TransactionLog } from './LogItem'
import { TransactionSectionTitle } from './SectionTitle'

type TransactionLogsSectionProps = {
  title: string
  titleId: string
  logs: TransactionLog[]
}

export function TransactionLogsSection({ title, titleId, logs }: TransactionLogsSectionProps) {
  return (
    <section className="transaction__section" aria-labelledby={titleId}>
      <TransactionSectionTitle id={titleId}>{title}</TransactionSectionTitle>
      <div className="transaction__card">
        <ol className="transaction__logs">
          {logs.map((log) => (
            <TransactionLogItem key={log.index} log={log} />
          ))}
        </ol>
      </div>
    </section>
  )
}
