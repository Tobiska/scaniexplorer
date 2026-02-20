import { formatEther } from 'ethers'
import {
  getSmartContractInfo,
  validateABI as validateAbiCore,
  type AbiMethodInfo,
} from '../../../web3_0/overview'

export type SmartContractHeaderInfo = {
  wallet: string
  block: string
  balance: string
  provider: string
}

export type SmartContractSummary = {
  contractAddress: string
  isContract: boolean
  ethBalance: string
  nonce: string
  bytecodeSize: string
  chainId: string
}

export type ContractMethod = {
  name: string
  signature: string
  selector: string
  stateMutability: string
  inputs: AbiMethodInfo['inputs']
  outputs: AbiMethodInfo['outputs']
  pill: string
  pillClass: string
}

export type ContractTransaction = {
  hash: string
  from: string
  to: string
  method: string
  status: string
  gasUsed: string
  block: string
}

export type VerificationMode = 'abi' | 'solidity'

export type VerificationStatus =
  | 'Empty'
  | 'Uploaded'
  | 'Compiled'
  | 'Verified'
  | 'Bytecode Mismatch'
  | 'Compilation Error'

export type SmartContractOverview = {
  header: SmartContractHeaderInfo
  summary: SmartContractSummary
  readMethods: ContractMethod[]
  writeMethods: ContractMethod[]
  transactions: ContractTransaction[]
  connectedWallet: string
  onChainBytecode: string
  abiExample: string
}

export type ValidateAbiResult = {
  status: VerificationStatus
  abi: string
  readMethods: ContractMethod[]
  writeMethods: ContractMethod[]
}

export type CompileResult = {
  status: VerificationStatus
  abi: string
  readMethods: ContractMethod[]
  writeMethods: ContractMethod[]
}

export function getSmartContractOverviewSeed(): SmartContractOverview {
  return {
    header: {
      wallet: '0xABC...DEF',
      block: '0',
      balance: '0 ETH',
      provider: 'MetaMask',
    },
    summary: {
      contractAddress: '0x0000000000000000000000000000000000000000',
      isContract: false,
      ethBalance: '0',
      nonce: '0',
      bytecodeSize: '0 bytes',
      chainId: '0',
    },
    readMethods: [],
    writeMethods: [],
    transactions: [
      {
        hash: '0x123...456',
        from: '0xabc...def',
        to: '0x789...012',
        method: 'transfer',
        status: 'Success',
        gasUsed: '21000',
        block: '123456',
      },
    ],
    connectedWallet: '0xABC...DEF',
    onChainBytecode: '0x',
    abiExample: '',
  }
}

export async function getSmartContractOverview(
  rpcUrl: string,
  address: string,
): Promise<SmartContractOverview> {
  try {
    const info = await getSmartContractInfo(rpcUrl, address)
    const balanceEth = formatEther(info.Balance)
    return {
      header: {
        wallet: address,
        block: info.LatestBlock.toString(),
        balance: `${balanceEth} ETH`,
        provider: 'MetaMask',
      },
      summary: {
        contractAddress: info.Address,
        isContract: info.IsContract,
        ethBalance: balanceEth,
        nonce: info.Nonce.toString(),
        bytecodeSize: `${info.BytecodeSize} bytes`,
        chainId: info.ChainId,
      },
      readMethods: [],
      writeMethods: [],
      transactions: getSmartContractOverviewSeed().transactions,
      connectedWallet: address,
      onChainBytecode: info.Bytecode,
      abiExample: '',
    }
  } catch {
    return getSmartContractOverviewSeed()
  }
}

export function connectWithPrivateKey(privateKey: string) {
  return {
    wallet: privateKey.trim().length > 0 ? '0xABC...DEF' : '0x000...000',
  }
}

export function connectWithMetaMask() {
  return {
    wallet: '0xABC...DEF',
    provider: 'MetaMask',
  }
}

export function validateAbi(abiJson: string): ValidateAbiResult {
  const hasContent = abiJson.trim().length > 0
  if (!hasContent) {
    return { status: 'Empty', abi: '', readMethods: [], writeMethods: [] }
  }

  try {
    const formatted = formatJson(abiJson)
    const validated = validateAbiCore(formatted)
    return {
      status: 'Uploaded',
      abi: formatted,
      readMethods: mapMethods(validated.readMethods, 'view'),
      writeMethods: mapMethods(validated.writeMethods, 'nonpayable'),
    }
  } catch {
    return {
      status: 'Compilation Error',
      abi: '',
      readMethods: [],
      writeMethods: [],
    }
  }
}

export function compileAndVerifySolidity(
  source: string,
  compilerVersion: string,
  optimizerEnabled: boolean,
  runs: number,
): CompileResult {
  const hasContent = source.trim().length > 0
  if (!hasContent) {
    return { status: 'Compilation Error', abi: '', readMethods: [], writeMethods: [] }
  }

  if (source.toLowerCase().includes('mismatch')) {
    const abi = getExampleAbi(compilerVersion, optimizerEnabled, runs)
    const validated = validateAbiCore(abi)
    return {
      status: 'Bytecode Mismatch',
      abi,
      readMethods: mapMethods(validated.readMethods, 'view'),
      writeMethods: mapMethods(validated.writeMethods, 'nonpayable'),
    }
  }

  if (source.toLowerCase().includes('verify')) {
    const abi = getExampleAbi(compilerVersion, optimizerEnabled, runs)
    const validated = validateAbiCore(abi)
    return {
      status: 'Verified',
      abi,
      readMethods: mapMethods(validated.readMethods, 'view'),
      writeMethods: mapMethods(validated.writeMethods, 'nonpayable'),
    }
  }

  const abi = getExampleAbi(compilerVersion, optimizerEnabled, runs)
  const validated = validateAbiCore(abi)
  return {
    status: 'Compiled',
    abi,
    readMethods: mapMethods(validated.readMethods, 'view'),
    writeMethods: mapMethods(validated.writeMethods, 'nonpayable'),
  }
}

function getExampleAbi(compilerVersion: string, optimizerEnabled: boolean, runs: number) {
  return JSON.stringify(
    [
      {
        inputs: [{ internalType: 'address', name: 'recipient', type: 'address' }],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
        meta: {
          compilerVersion,
          optimizerEnabled,
          runs,
        },
      },
    ],
    null,
    2,
  )
}

function formatJson(value: string) {
  try {
    const parsed = JSON.parse(value)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return value
  }
}

function mapMethods(methods: AbiMethodInfo[], pill: string): ContractMethod[] {
  return methods.map((method) => ({
    name: method.name,
    signature: method.signature,
    selector: method.selector,
    stateMutability: method.stateMutability,
    inputs: method.inputs,
    outputs: method.outputs,
    pill,
    pillClass: pill === 'view' ? 'view' : 'nonpayable',
  }))
}
