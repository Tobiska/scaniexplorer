type Props = {
  value: string
  status: string
  onChange: (value: string) => void
  onValidate: () => void
}

export default function AbiUploadCard({ value, status, onChange, onValidate }: Props) {
  return (
    <section className="sc-card">
      <div className="sc-tabs">
        <span className="tab active">Upload ABI</span>
        <span className="tab">Upload Solidity</span>
      </div>
      <textarea
        className="sc-textarea"
        placeholder="Paste ABI JSON here..."
        aria-label="ABI input"
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="sc-actions">
        <button className="sc-primary" type="button" onClick={onValidate}>Validate</button>
        <span className="sc-status">Verification Status: {status}</span>
      </div>
    </section>
  )
}
