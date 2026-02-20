type AddressSectionTitleProps = {
  id?: string
  children: string
}

export function AddressSectionTitle({ id, children }: AddressSectionTitleProps) {
  return (
    <h2 className="address__title" id={id}>
      {children}
    </h2>
  )
}
