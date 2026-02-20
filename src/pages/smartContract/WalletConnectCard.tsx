type Props = {
  privateKey: string
  connectedWallet: string
  onPrivateKeyChange: (value: string) => void
  onConnect: () => void
  onConnectMetaMask: () => void
}

export default function WalletConnectCard({
  privateKey,
  connectedWallet,
  onPrivateKeyChange,
  onConnect,
  onConnectMetaMask,
}: Props) {
  return (
    <section className="sc-card">
      <input
        className="sc-input"
        placeholder="Private Key"
        aria-label="Private Key"
        value={privateKey}
        onChange={(event) => onPrivateKeyChange(event.target.value)}
      />
      <div className="sc-actions split">
        <button className="sc-primary" type="button" onClick={onConnect}>Connect</button>
        <button className="sc-primary" type="button" onClick={onConnectMetaMask}>Connect MetaMask</button>
      </div>
      <div className="sc-connected">Connected Wallet: {connectedWallet}</div>
    </section>
  )
}
