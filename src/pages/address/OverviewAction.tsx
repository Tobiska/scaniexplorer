import { AddressCopyButton } from './CopyButton'

type AddressOverviewActionProps = {
  label: string
  value: string
  actionLabel: string
  accent?: boolean
}

export function AddressOverviewAction({
  label,
  value,
  actionLabel,
  accent,
}: AddressOverviewActionProps) {
  return (
    <div className="address__detail address__detail--action">
      <dt className="address__label">{label}</dt>
      <dd className={accent ? 'address__value address__value--accent' : 'address__value'}>
        {value}
      </dd>
      <AddressCopyButton label={actionLabel} />
    </div>
  )
}
