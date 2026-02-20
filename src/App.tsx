import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppShell from './pages/appShell/AppShell'
import Address from './pages/address/Address'
import AccountRoute from './pages/account/AccountRoute'
import Block from './pages/block/Block'
import Dashboard from './pages/dashboard/Dashboard'
import Search from './pages/search/Search'
import SmartContract from './pages/smartContract/SmartContract'
import Transaction from './pages/transaction/Transaction'

const fallbackRpcUrl = 'http://localhost:8545'

function DashboardRoute() {
  const location = useLocation()
  const state = location.state as { rpcUrl?: string } | null
  const rpcUrl = state?.rpcUrl || fallbackRpcUrl
  return <Dashboard rpcUrl={rpcUrl} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/search/:type?/:query?" element={<Search />} />
        <Route path="/blocks/:blockNumber" element={<Block />} />
        <Route path="/transactions/:txHash" element={<Transaction />} />
        <Route path="/address/:addressKey" element={<Address />} />
        <Route path="/account/:addressKey" element={<AccountRoute />} />
        <Route path="/contracts/:contractAddress" element={<SmartContract />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
