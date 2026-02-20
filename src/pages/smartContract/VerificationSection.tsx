import type { VerificationMode, VerificationStatus } from './api'

const statusClassMap: Record<VerificationStatus, string> = {
  Empty: 'badge-neutral',
  Uploaded: 'badge-uploaded',
  Compiled: 'badge-compiled',
  Verified: 'badge-verified',
  'Bytecode Mismatch': 'badge-error',
  'Compilation Error': 'badge-error',
}

type Props = {
  mode: VerificationMode
  status: VerificationStatus
  abiInput: string
  solidityInput: string
  compilerVersion: string
  optimizerEnabled: boolean
  runs: number
  onModeChange: (mode: VerificationMode) => void
  onAbiChange: (value: string) => void
  onSolidityChange: (value: string) => void
  onCompilerChange: (value: string) => void
  onOptimizerChange: (value: boolean) => void
  onRunsChange: (value: number) => void
  onValidate: () => void
  onCompile: () => void
  onCopyBytecode: () => void
  onCopyAbi: () => void
  onChainBytecode: string
  abiOutput: string
  showAbiPanel: boolean
}

export default function VerificationSection({
  mode,
  status,
  abiInput,
  solidityInput,
  compilerVersion,
  optimizerEnabled,
  runs,
  onModeChange,
  onAbiChange,
  onSolidityChange,
  onCompilerChange,
  onOptimizerChange,
  onRunsChange,
  onValidate,
  onCompile,
  onCopyBytecode,
  onCopyAbi,
  onChainBytecode,
  abiOutput,
  showAbiPanel,
}: Props) {
  const badgeClass = statusClassMap[status]

  return (
    <section className="sc-card verification">
      <div className="verification-header">
        <div className="sc-card-title">Verification</div>
        <div className="verification-toggle">
          <span className="toggle-label">ABI / Solidity</span>
          <div className="toggle">
            <button
              type="button"
              className={`toggle-btn ${mode === 'abi' ? 'active' : ''}`}
              onClick={() => onModeChange('abi')}
            >
              ABI
            </button>
            <button
              type="button"
              className={`toggle-btn ${mode === 'solidity' ? 'active' : ''}`}
              onClick={() => onModeChange('solidity')}
            >
              Solidity
            </button>
          </div>
        </div>
      </div>

      <div className="verification-status">
        <span className={`status-badge ${badgeClass}`}>{status === 'Empty' ? 'Status: Empty' : status}</span>
      </div>

      {mode === 'abi' ? (
        <div className="verification-input">
          <label className="sc-label" htmlFor="abi-input">ABI Input</label>
          <textarea
            id="abi-input"
            className="sc-textarea"
            placeholder="Paste ABI JSON here..."
            aria-label="ABI input"
            rows={6}
            value={abiInput}
            onChange={(event) => onAbiChange(event.target.value)}
          />
          <div className="sc-actions">
            <button className="sc-primary" type="button" onClick={onValidate}>Validate</button>
          </div>
        </div>
      ) : (
        <div className="verification-input">
          <label className="sc-label" htmlFor="solidity-input">Solidity Source Code</label>
          <textarea
            id="solidity-input"
            className="sc-textarea"
            placeholder="// Paste Solidity source code here"
            aria-label="Solidity source code"
            rows={8}
            value={solidityInput}
            onChange={(event) => onSolidityChange(event.target.value)}
          />
          <div className="compile-controls">
            <label className="control">
              <span>Compiler</span>
              <select value={compilerVersion} onChange={(event) => onCompilerChange(event.target.value)}>
                <option value="v0.8.20">v0.8.20</option>
                <option value="v0.8.19">v0.8.19</option>
                <option value="v0.8.18">v0.8.18</option>
              </select>
            </label>
            <label className="control toggle-control">
              <span>Optimizer</span>
              <input
                type="checkbox"
                checked={optimizerEnabled}
                onChange={(event) => onOptimizerChange(event.target.checked)}
              />
            </label>
            <label className="control">
              <span>Runs</span>
              <input
                type="number"
                min={0}
                value={runs}
                onChange={(event) => onRunsChange(Number(event.target.value))}
              />
            </label>
            <button className="sc-primary" type="button" onClick={onCompile}>Compile & Verify</button>
          </div>
        </div>
      )}

      <div className="verification-panels">
        <div className="panel">
          <div className="panel-header">
            <span>On-chain Deployed Bytecode</span>
            <button className="sc-copy" type="button" onClick={onCopyBytecode}>Copy</button>
          </div>
          <pre className="panel-body">{onChainBytecode}</pre>
        </div>
        {showAbiPanel ? (
          <div className="panel">
            <div className="panel-header">
              <span>Contract ABI</span>
              <button className="sc-copy" type="button" onClick={onCopyAbi}>Copy</button>
            </div>
            <pre className="panel-body">{abiOutput}</pre>
          </div>
        ) : null}
      </div>
    </section>
  )
}
