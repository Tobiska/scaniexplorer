type BlockOverviewItemProps = {
  label: string
  value: string
  accent?: boolean
}

export function BlockOverviewItem({ label, value, accent }: BlockOverviewItemProps) {
  return (
    <div className="block-page__meta">
      <dt className="block-page__meta-label">{label}</dt>
      <dd
        className={
          accent ? 'block-page__meta-value block-page__meta-value--accent' : 'block-page__meta-value'
        }
      >
        {value}
      </dd>
    </div>
  )
}
