type BlockSectionTitleProps = {
  id?: string
  children: string
}

export function BlockSectionTitle({ id, children }: BlockSectionTitleProps) {
  return (
    <h2 className="block-page__title" id={id}>
      {children}
    </h2>
  )
}
