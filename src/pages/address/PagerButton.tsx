type AddressPagerButtonProps = {
  label: string
}

export function AddressPagerButton({ label }: AddressPagerButtonProps) {
  return (
    <button className="address__pager" type="button">
      {label}
    </button>
  )
}
