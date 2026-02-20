type AddressCopyButtonProps = {
  label: string
}

export function AddressCopyButton({ label }: AddressCopyButtonProps) {
  return (
    <button className="address__button" type="button">
      {label}
    </button>
  )
}
