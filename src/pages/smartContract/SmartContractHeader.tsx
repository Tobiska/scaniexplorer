type Props = {
  wallet: string
  block: string
  balance: string
  provider: string
}

export default function SmartContractHeader({ wallet, block, balance, provider }: Props) {
  return (
    <header className="sc-topbar">
      <div className="sc-title">Developer Console</div>
      <div className="sc-topbar-right">
        <span className="sc-meta">Wallet: {wallet}</span>
        <button className="sc-chip" type="button">{provider}</button>
        <span className="sc-meta">Block: {block}</span>
        <span className="sc-meta">Balance: {balance}</span>
      </div>
    </header>
  )
}
