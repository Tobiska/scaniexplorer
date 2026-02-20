type Props = {
  contractAddress: string
  isContract: boolean
  ethBalance: string
  nonce: string
  bytecodeSize: string
  chainId: string
}

export default function SummaryBar({
  contractAddress,
  isContract,
  ethBalance,
  nonce,
  bytecodeSize,
  chainId,
}: Props) {
  return (
    <section className="sc-card sc-summary">
      <div className="summary-left">
        <span>Contract Address: {contractAddress}</span>
        <button className="sc-copy" type="button">Copy</button>
      </div>
      <div className="summary-center">
        Is Contract: {isContract ? 'Yes' : 'No'}&nbsp;&nbsp;ETH Balance: {ethBalance}&nbsp;&nbsp;Nonce: {nonce}
      </div>
      <div className="summary-right">Bytecode Size: {bytecodeSize}&nbsp;&nbsp;Chain ID: {chainId}</div>
    </section>
  )
}
