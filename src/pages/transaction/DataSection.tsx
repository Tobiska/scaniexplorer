import { TransactionSectionTitle } from './SectionTitle'

type TransactionDataSectionProps = {
  title: string
  titleId: string
  data: string
}

export function TransactionDataSection({ title, titleId, data }: TransactionDataSectionProps) {
  return (
    <section className="transaction__section" aria-labelledby={titleId}>
      <TransactionSectionTitle id={titleId}>{title}</TransactionSectionTitle>
      <div className="transaction__card">
        <div className="transaction__data">{data}</div>
      </div>
    </section>
  )
}
