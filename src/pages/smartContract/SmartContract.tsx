import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './smartContract.css'
import MethodsPanel from './MethodsPanel'
import SmartContractHeader from './SmartContractHeader'
import SummaryBar from './SummaryBar'
import TransactionsCard from './TransactionsCard'
import WalletConnectCard from './WalletConnectCard'
import VerificationSection from './VerificationSection'
import {
  compileAndVerifySolidity,
  connectWithMetaMask,
  connectWithPrivateKey,
  getSmartContractOverview,
  getSmartContractOverviewSeed,
  validateAbi,
  type ContractMethod,
  type VerificationMode,
  type VerificationStatus,
} from './api'

const ABI_READY_STATUSES: VerificationStatus[] = [
  'Uploaded',
  'Compiled',
  'Verified',
  'Bytecode Mismatch',
]


export default function SmartContract() {
  const { contractAddress } = useParams()
  const [searchParams] = useSearchParams()
  const rpcUrl = searchParams.get('rpcUrl')
  const resolvedAddress = useMemo(
    () => (contractAddress ? decodeURIComponent(contractAddress) : undefined),
    [contractAddress],
  )
  const [overview, setOverview] = useState(getSmartContractOverviewSeed())
  const [mode, setMode] = useState<VerificationMode>('abi')
  const [abiText, setAbiText] = useState('')
  const [solidityText, setSolidityText] = useState('')
  const [abiStatus, setAbiStatus] = useState<VerificationStatus>('Empty')
  const [solidityStatus, setSolidityStatus] = useState<VerificationStatus>('Empty')
  const [abiOutput, setAbiOutput] = useState('')
  const [readMethods, setReadMethods] = useState<ContractMethod[]>([])
  const [writeMethods, setWriteMethods] = useState<ContractMethod[]>([])
  const [compilerVersion, setCompilerVersion] = useState('v0.8.20')
  const [optimizerEnabled, setOptimizerEnabled] = useState(true)
  const [runs, setRuns] = useState(200)
  const [privateKey, setPrivateKey] = useState('')
  const [connectedWallet, setConnectedWallet] = useState(overview.connectedWallet)
  const [provider, setProvider] = useState(overview.header.provider)

  useEffect(() => {
    let active = true
    if (!rpcUrl || !resolvedAddress) {
      return () => {
        active = false
      }
    }
    void getSmartContractOverview(rpcUrl, resolvedAddress).then((data) => {
      if (!active) return
      setOverview(data)
      setConnectedWallet(data.connectedWallet)
      setProvider(data.header.provider)
    })
    return () => {
      active = false
    }
  }, [rpcUrl, resolvedAddress])

  const onValidate = () => {
    const result = validateAbi(abiText)
    setAbiStatus(result.status)
    setAbiOutput(result.abi)
    setReadMethods(result.readMethods)
    setWriteMethods(result.writeMethods)
  }

  const onCompile = () => {
    const result = compileAndVerifySolidity(solidityText, compilerVersion, optimizerEnabled, runs)
    setSolidityStatus(result.status)
    setAbiOutput(result.abi)
    setReadMethods(result.readMethods)
    setWriteMethods(result.writeMethods)
  }

  const onConnect = () => {
    const result = connectWithPrivateKey(privateKey)
    setConnectedWallet(result.wallet)
  }

  const onConnectMetaMask = () => {
    const result = connectWithMetaMask()
    setConnectedWallet(result.wallet)
    setProvider(result.provider)
  }

  const handleCopy = (value: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(value)
    }
  }

  const currentStatus = mode === 'abi' ? abiStatus : solidityStatus
  const showAbiPanel = ABI_READY_STATUSES.includes(currentStatus)
  const methodsEnabled = mode === 'abi' ? currentStatus === 'Uploaded' : currentStatus === 'Verified'

  return (
    <div className="sc-root" data-node-id="11:600">
      <SmartContractHeader
        wallet={connectedWallet}
        block={overview.header.block}
        balance={overview.header.balance}
        provider={provider}
      />

      <main className="sc-content">
        <SummaryBar
          contractAddress={overview.summary.contractAddress}
          isContract={overview.summary.isContract}
          ethBalance={overview.summary.ethBalance}
          nonce={overview.summary.nonce}
          bytecodeSize={overview.summary.bytecodeSize}
          chainId={overview.summary.chainId}
        />

        <VerificationSection
          mode={mode}
          status={currentStatus}
          abiInput={abiText}
          solidityInput={solidityText}
          compilerVersion={compilerVersion}
          optimizerEnabled={optimizerEnabled}
          runs={runs}
          onModeChange={setMode}
          onAbiChange={setAbiText}
          onSolidityChange={setSolidityText}
          onCompilerChange={setCompilerVersion}
          onOptimizerChange={setOptimizerEnabled}
          onRunsChange={setRuns}
          onValidate={onValidate}
          onCompile={onCompile}
          onCopyBytecode={() => handleCopy(overview.onChainBytecode)}
          onCopyAbi={() => handleCopy(abiOutput)}
          onChainBytecode={overview.onChainBytecode}
          abiOutput={abiOutput || overview.abiExample}
          showAbiPanel={showAbiPanel}
        />

        <WalletConnectCard
          privateKey={privateKey}
          connectedWallet={connectedWallet}
          onPrivateKeyChange={setPrivateKey}
          onConnect={onConnect}
          onConnectMetaMask={onConnectMetaMask}
        />

        {methodsEnabled ? (
          <section className="sc-methods">
            <MethodsPanel title="Read Methods" methods={readMethods} enabled={methodsEnabled} />
            <MethodsPanel title="Write Methods" methods={writeMethods} enabled={methodsEnabled} />
          </section>
        ) : (
          <section className="sc-card methods-locked">
            <div className="sc-card-title">Methods Locked</div>
            <p>Complete verification to unlock Read and Write methods.</p>
          </section>
        )}

        <TransactionsCard rows={overview.transactions} />
      </main>
    </div>
  )
}
