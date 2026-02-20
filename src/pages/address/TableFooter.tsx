import { AddressPagerButton } from './PagerButton'

type AddressTableFooterProps = {
  previousLabel: string
  nextLabel: string
}

export function AddressTableFooter({ previousLabel, nextLabel }: AddressTableFooterProps) {
  return (
    <div className="address__table-footer">
      <AddressPagerButton label={previousLabel} />
      <AddressPagerButton label={nextLabel} />
    </div>
  )
}
