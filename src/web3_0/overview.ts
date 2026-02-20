import {
    JsonRpcProvider,
    Block,
    TransactionReceipt,
    TransactionResponse,
    Interface,
    FunctionFragment,
    type InterfaceAbi,
    id,
} from "ethers";

export class LatestBlockInfo {

    constructor(latestBlockNumber: number, blocks: Block[], transactions: TransactionResponse[]) {
        const blocksInfo: BlockInfo[] = [];
        for (let i = 0; i < blocks.length; i++ ) {
            blocksInfo.push(new BlockInfo(blocks[i].number, blocks[i].timestamp, blocks[i].transactions.length, [], blocks[i].parentHash, blocks[i].hash ?? "", blocks[i].gasUsed, blocks[i].gasLimit))
        }
        const transactionsInfo: TransactionInfo[] = [];
        for (let i = 0; i < transactions.length; i++ ) {
            transactionsInfo.push(new TransactionInfo(transactions[i].hash ?? "<empty>", transactions[i].from ?? "<empty>", transactions[i].to ?? "<empty>", transactions[i].value))
        }

        this.latestBlockNumber = latestBlockNumber
        this.blocks = blocksInfo
        this.txs = transactionsInfo
    }
    
    latestBlockNumber: number
    blocks: BlockInfo[]
    txs: TransactionInfo[] 
}

export class BlockInfo {

    constructor(number: number, timestamp: number, TransactionCount: number, Transactions: TransactionInfo[], parentHash: string, hash: string, gasUsed: bigint, gasLimit: bigint) {
        this.Number = number
        this.Timestamp = new Date(timestamp * 1000)
        this.TransactionCount = TransactionCount
        this.ParentHash = parentHash
        this.Hash = hash
        this.GasUsed = gasUsed
        this.GasLimit = gasLimit
        this.Transactions = Transactions
    }

    Number: number
    Timestamp: Date
    TransactionCount: number
    ParentHash: string
    Hash: string
    GasUsed: bigint
    GasLimit: bigint
    Transactions: TransactionInfo[]
}

export class TransactionInfo {

    constructor(hash: string, from: string, to: string, value: bigint) {
        this.Hash = hash
        this.From = from
        this.To = to
        this.Value = value
    }

    Hash: string
    From: string
    To: string
    Value: bigint
}

export class TransactionLogInfo {

    constructor(index: number, contract: string, topics: string[], data: string) {
        this.Index = index
        this.Contract = contract
        this.Topics = topics
        this.Data = data
    }

    Index: number
    Contract: string
    Topics: string[]
    Data: string
}

export class TransactionDetailsInfo {

    constructor(
        hash: string,
        status: number | null,
        blockNumber: number | null,
        from: string,
        to: string,
        value: bigint,
        gasLimit: bigint,
        gasUsed: bigint,
        effectiveGasPrice: bigint,
        transactionFee: bigint,
        inputData: string,
        logs: TransactionLogInfo[],
    ) {
        this.Hash = hash
        this.Status = status
        this.BlockNumber = blockNumber
        this.From = from
        this.To = to
        this.Value = value
        this.GasLimit = gasLimit
        this.GasUsed = gasUsed
        this.EffectiveGasPrice = effectiveGasPrice
        this.TransactionFee = transactionFee
        this.InputData = inputData
        this.Logs = logs
    }

    Hash: string
    Status: number | null
    BlockNumber: number | null
    From: string
    To: string
    Value: bigint
    GasLimit: bigint
    GasUsed: bigint
    EffectiveGasPrice: bigint
    TransactionFee: bigint
    InputData: string
    Logs: TransactionLogInfo[]
}

export class AccountTransactionInfo {

    constructor(hash: string, blockNumber: number, from: string, to: string, value: bigint) {
        this.Hash = hash
        this.BlockNumber = blockNumber
        this.From = from
        this.To = to
        this.Value = value
    }

    Hash: string
    BlockNumber: number
    From: string
    To: string
    Value: bigint
}

export class AccountInfo {

    constructor(address: string, accountType: string, balance: bigint, nonce: number, transactions: AccountTransactionInfo[]) {
        this.Address = address
        this.Type = accountType
        this.Balance = balance
        this.Nonce = nonce
        this.Transactions = transactions
    }

    Address: string
    Type: string
    Balance: bigint
    Nonce: number
    Transactions: AccountTransactionInfo[]
}

export type AbiMethodParam = {
    name: string
    type: string
}

export type AbiMethodInfo = {
    name: string
    signature: string
    selector: string
    stateMutability: string
    inputs: AbiMethodParam[]
    outputs: AbiMethodParam[]
}

export class SmartContractInfo {

    constructor(
        address: string,
        isContract: boolean,
        balance: bigint,
        nonce: number,
        chainId: string,
        latestBlock: number,
        bytecode: string,
    ) {
        this.Address = address
        this.IsContract = isContract
        this.Balance = balance
        this.Nonce = nonce
        this.ChainId = chainId
        this.LatestBlock = latestBlock
        this.Bytecode = bytecode
        this.BytecodeSize = bytecode.length > 2 ? (bytecode.length - 2) / 2 : 0
    }

    Address: string
    IsContract: boolean
    Balance: bigint
    Nonce: number
    ChainId: string
    LatestBlock: number
    Bytecode: string
    BytecodeSize: number
}

export async function getChainId(rpcUrl: string): Promise<string> {
    const provider = new JsonRpcProvider(rpcUrl)
    const network = await provider.getNetwork()
    return network.chainId.toString()
}

export async function getSmartContractInfo(rpcUrl: string, address: string): Promise<SmartContractInfo> {
    const provider = new JsonRpcProvider(rpcUrl)
    const [balance, nonce, code, network, latestBlock] = await Promise.all([
        provider.getBalance(address),
        provider.getTransactionCount(address),
        provider.getCode(address),
        provider.getNetwork(),
        provider.getBlockNumber(),
    ])

    const isContract = code !== "0x"
    return new SmartContractInfo(address, isContract, balance, nonce, network.chainId.toString(), latestBlock, code)
}

export async function getLastNBlocksWithTx(rpcUrl: string, n: number): Promise<LatestBlockInfo>  {
    const provider = new JsonRpcProvider(rpcUrl)

    const latestBlockNumber: number = await provider.getBlockNumber()
    if (n <= 0) {
        return new LatestBlockInfo(latestBlockNumber, [], [])
    }

    const blockNumbers = Array.from({ length: n }, (_, index) => latestBlockNumber - index)
        .filter((blockNumber) => blockNumber >= 0)
    const blocksPromises = blockNumbers.map((blockNumber) => provider.getBlock(blockNumber, false))
    const blocks: Block[] = (await Promise.all(blocksPromises)).filter((block) => block !== null)

    const transactionHashes = blocks
        .flatMap((block) => block.transactions)
        .map((transaction) => (typeof transaction === "string" ? transaction : ""))
        .filter((hash): hash is string => Boolean(hash))
        .slice(0, n)
    const transactionsResponsesPromises = transactionHashes.map((hash) => provider.getTransaction(hash))
    const transactionsResponses: TransactionResponse[] = (await Promise.all(transactionsResponsesPromises))
        .filter((transaction): transaction is TransactionResponse => transaction !== null)

    return new LatestBlockInfo(latestBlockNumber, blocks, transactionsResponses)
}


export async function getBlock(rpcUrl: string, num: number): Promise<BlockInfo> {
    const provider = new JsonRpcProvider(rpcUrl)

    const blockApiOrNull: Block | null = await provider.getBlock(num, true)
    
    if (blockApiOrNull == null) {
        throw new Error("block not found")
    }

    const blockApi: Block = blockApiOrNull

    const txs: TransactionInfo[] = []

    for (let i = 0; i < blockApi.transactions.length; i++) {
        const tx: TransactionResponse = blockApi.getPrefetchedTransaction(blockApi.transactions[i])
        txs.push(new TransactionInfo(tx.hash, tx.from, tx.to ?? "", tx.value ?? 0))
    }

    return new BlockInfo(blockApi.number,
         blockApi.timestamp,
          blockApi.transactions.length, 
          txs,
          blockApi.parentHash,
          blockApi.hash ?? "", blockApi.gasUsed, blockApi.gasLimit
        )
}

export async function getAccount(
    rpcUrl: string,
    address: string,
    includeTransactions = false,
): Promise<AccountInfo> {
    const provider = new JsonRpcProvider(rpcUrl)
    const normalizedAddress = address.toLowerCase()
    const [balance, nonce, code] = await Promise.all([
        provider.getBalance(address),
        provider.getTransactionCount(address),
        provider.getCode(address),
    ])

    const accountType = code === "0x" ? "EOA" : "Contract"
    const transactions: AccountTransactionInfo[] = []

    if (includeTransactions) {
        const latestBlockNumber = await provider.getBlockNumber()
        for (let blockNumber = latestBlockNumber; blockNumber >= 0; blockNumber--) {
            const blockApiOrNull: Block | null = await provider.getBlock(blockNumber, true)
            if (!blockApiOrNull) {
                continue
            }

            for (let i = 0; i < blockApiOrNull.transactions.length; i++) {
                const transaction = blockApiOrNull.transactions[i]
                const tx: TransactionResponse | null = typeof transaction === "string"
                    ? await provider.getTransaction(transaction)
                    : transaction
                if (!tx) {
                    continue
                }
                const fromAddress = tx.from.toLowerCase()
                const toAddress = tx.to?.toLowerCase()

                if (fromAddress !== normalizedAddress && toAddress !== normalizedAddress) {
                    continue
                }

                transactions.push(
                    new AccountTransactionInfo(
                        tx.hash,
                        blockApiOrNull.number,
                        tx.from,
                        tx.to ?? "",
                        tx.value ?? 0n,
                    ),
                )
            }
        }
    }

    return new AccountInfo(address, accountType, balance, nonce, transactions)
}

export async function getTransction(rpcUrl: string, hash: string): Promise<TransactionDetailsInfo> {
    const provider = new JsonRpcProvider(rpcUrl)

    const [transaction, receipt]: [TransactionResponse | null, TransactionReceipt | null] = await Promise.all([
        provider.getTransaction(hash),
        provider.getTransactionReceipt(hash),
    ])

    if (!transaction) {
        throw new Error("transaction not found")
    }

    const logs = (receipt?.logs ?? []).map(
        (log) => new TransactionLogInfo(log.index, log.address, Array.from(log.topics), log.data),
    )
    const gasUsed = receipt?.gasUsed ?? 0n
    const effectiveGasPrice = transaction.gasPrice ?? 0n
    const transactionFee = gasUsed * effectiveGasPrice
    const blockNumber = receipt?.blockNumber ?? transaction.blockNumber ?? null

    return new TransactionDetailsInfo(
        transaction.hash,
        receipt?.status ?? null,
        blockNumber,
        transaction.from,
        transaction.to ?? "",
        transaction.value ?? 0n,
        transaction.gasLimit ?? 0n,
        gasUsed,
        effectiveGasPrice,
        transactionFee,
        transaction.data ?? "0x",
        logs,
    )
}

export type ValidatedAbi = {
    abi: InterfaceAbi
    iface: Interface
    readMethods: AbiMethodInfo[]
    writeMethods: AbiMethodInfo[]
}

export function validateABI(abi: string): ValidatedAbi {
    const parsed = normalizeAbiInput(abi)
    const iface = new Interface(parsed)
    const functionFragments = iface.fragments.filter(
        (fragment): fragment is FunctionFragment => fragment.type === "function",
    )

    const methods = functionFragments.map((fragment) => toAbiMethodInfo(fragment))
    const readMethods = methods.filter((method) =>
        method.stateMutability === "view" || method.stateMutability === "pure",
    )
    const writeMethods = methods.filter((method) =>
        method.stateMutability !== "view" && method.stateMutability !== "pure",
    )

    return {
        abi: parsed,
        iface,
        readMethods,
        writeMethods,
    }
}

function normalizeAbiInput(abi: string | unknown): InterfaceAbi {
    let parsed: unknown = abi

    if (typeof abi === "string") {
        try {
            parsed = JSON.parse(abi)
        } catch (error) {
            throw new Error(`ABI is not valid JSON ${error}`)
        }
    }

    if (Array.isArray(parsed)) {
        return parsed as InterfaceAbi
    }

    if (typeof parsed === "object" && parsed && "abi" in parsed) {
        const abiValue = (parsed as { abi: unknown }).abi
        if (Array.isArray(abiValue)) {
            return abiValue as InterfaceAbi
        }
    }

    throw new Error("ABI must be a JSON array")
}

function toAbiMethodInfo(fragment: FunctionFragment): AbiMethodInfo {
    const signature = `${fragment.name}(${fragment.inputs.map((input) => input.type).join(",")})`
    const selector = id(signature).slice(0, 10)
    const inputs = fragment.inputs.map((input) => ({
        name: input.name,
        type: input.type,
    }))
    const outputs = fragment.outputs.map((output) => ({
        name: output.name,
        type: output.type,
    }))

    return {
        name: fragment.name,
        signature,
        selector,
        stateMutability: fragment.stateMutability,
        inputs,
        outputs,
    }
}
