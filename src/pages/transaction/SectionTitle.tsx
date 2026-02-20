type TransactionSectionTitleProps = {
  id?: string
  children: string
}

export function TransactionSectionTitle({ id, children }: TransactionSectionTitleProps) {
  return (
    <h2 className="transaction__title" id={id}>
      {children}
    </h2>
  )
}
