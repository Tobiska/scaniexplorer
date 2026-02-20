type Method = {
  name: string
  pill: string
  pillClass: string
}

type Props = {
  title: string
  methods: Method[]
  enabled?: boolean
}

export default function MethodsPanel({ title, methods, enabled = true }: Props) {
  return (
    <div className="sc-card">
      <div className="sc-card-title">{title}</div>
      {methods.map((method) => (
        <button
          className={`method-row ${enabled ? '' : 'disabled'}`}
          type="button"
          key={method.name}
          disabled={!enabled}
        >
          <span>{method.name}</span>
          <span className={`pill ${method.pillClass}`}>{method.pill}</span>
        </button>
      ))}
    </div>
  )
}
