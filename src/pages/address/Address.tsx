import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './address.css'
import '../../styles/explorer-header.css'
import { PageLoader } from '../../components/Loader'
import { AddressHeader } from './Header'
import { AddressOverviewSection } from './OverviewSection'
import { getAddressOverview, type AddressOverviewData } from './api'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Search', href: '#' },
  { label: 'Blocks', href: '#' },
]

type AddressLoadSetters = {
  setOverviewData: (value: AddressOverviewData) => void
  setIsLoading: (value: boolean) => void
}

const loadAddressData = async (
  address: string | undefined,
  rpcUrl: string | null,
  setters: AddressLoadSetters,
) => {
  setters.setIsLoading(true)
  const data = await getAddressOverview(address, rpcUrl ?? undefined)
  setters.setOverviewData(data)
  setters.setIsLoading(false)
}

export default function Address() {
  const { addressKey } = useParams()
  const [searchParams] = useSearchParams()
  const rpcUrl = searchParams.get('rpcUrl')
  const resolvedAddress = useMemo(
    () => (addressKey ? decodeURIComponent(addressKey) : undefined),
    [addressKey],
  )
  const [overviewData, setOverviewData] = useState<AddressOverviewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = () => {
    void loadAddressData(resolvedAddress, rpcUrl, {
      setOverviewData,
      setIsLoading,
    })
  }

  useEffect(() => {
    void loadAddressData(resolvedAddress, rpcUrl, {
      setOverviewData,
      setIsLoading,
    })
  }, [resolvedAddress, rpcUrl])
  return (
    <div className="address" data-node-id="11:400">
      <AddressHeader brandLabel="Blockchain Explorer" links={navLinks} />

      <main className="address__content">
        <h1 className="visually-hidden">Address details</h1>
        <div className="address__actions">
          <button
            className="address__refresh"
            type="button"
            onClick={refreshData}
            disabled={isLoading}
          >
            Refresh data
          </button>
        </div>
        {isLoading || !overviewData ? (
          <PageLoader label="Loading address data…" />
        ) : (
          <>
            <AddressOverviewSection
              title="Address Overview"
              titleId="address-overview-title"
              action={overviewData.action}
              items={overviewData.items}
            />
          </>
        )}
      </main>
    </div>
  )
}
