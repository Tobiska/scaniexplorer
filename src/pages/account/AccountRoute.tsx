import { useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { PageLoader } from '../../components/Loader'
import { getAccount } from '../../web3_0/overview'

type ResolveState = 'loading' | 'error'

export default function AccountRoute() {
  const { addressKey } = useParams()
  const [searchParams] = useSearchParams()
  const rpcUrl = searchParams.get('rpcUrl')
  const navigate = useNavigate()
  const resolvedAddress = useMemo(
    () => (addressKey ? decodeURIComponent(addressKey) : undefined),
    [addressKey],
  )
  const [state, setState] = useState<ResolveState>('loading')

  useEffect(() => {
    let active = true

    const resolveAccount = async () => {
      if (!rpcUrl || !resolvedAddress) {
        if (active) setState('error')
        return
      }

      try {
        const account = await getAccount(rpcUrl, resolvedAddress, false)
        if (!active) return
        const targetPath = account.Type === 'Contract'
          ? `/contracts/${encodeURIComponent(resolvedAddress)}`
          : `/address/${encodeURIComponent(resolvedAddress)}`
        navigate(
          {
            pathname: targetPath,
            search: createSearchParams({ rpcUrl }).toString(),
          },
          { replace: true },
        )
      } catch {
        if (active) setState('error')
      }
    }

    void resolveAccount()

    return () => {
      active = false
    }
  }, [navigate, resolvedAddress, rpcUrl])

  if (state === 'error') {
    return <div className="page-loader">Unable to resolve account type.</div>
  }

  return <PageLoader label="Resolving account type…" />
}
