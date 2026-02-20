type AddressOverviewItemProps = {
  label: string
  value: string
  accent?: boolean
}

export function AddressOverviewItem({ label, value, accent }: AddressOverviewItemProps) {
  return (
    <div className="address__detail">
      <dt className="address__label">{label}</dt>
      <dd className={accent ? 'address__value address__value--accent' : 'address__value'}>
        {value}
      </dd>
    </div>
  )
}
