import { useNavigate } from 'react-router-dom'
import './appShell.css'
import { AppShellCard } from './Card'

export default function AppShell() {
  const navigate = useNavigate()
  const handleConnect = (rpcUrl: string) => {
    const trimmed = rpcUrl.trim()
    const destination = trimmed || 'http://localhost:8545'
    navigate('/dashboard', { state: { rpcUrl: destination } })
  }

  return (
    <main className="app-shell" data-node-id="11:500">
      <AppShellCard
        title="Connect to Network"
        subtitle="Enter the RPC URL to establish a connection to the blockchain network."
        status="Status: Ready"
        inputLabel="RPC URL"
        inputPlaceholder="http://localhost:8545"
        actionLabel="Connect"
        onSubmit={handleConnect}
      />
    </main>
  )
}
