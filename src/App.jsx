import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import SignIn from './pages/auth/SignIn.jsx'
import SignUp from './pages/auth/SignUp.jsx'
import DashboardHome from './pages/dashboard/DashboardHome.jsx'
import InvoicesList from './pages/dashboard/invoices/InvoicesList.jsx'
import CreateInvoice from './pages/dashboard/invoices/CreateInvoice.jsx'
import ViewInvoice from './pages/dashboard/invoices/ViewInvoice.jsx'
import EditInvoice from './pages/dashboard/invoices/EditInvoice.jsx'
import AuthLayout from './app/AuthLayout.jsx'
import AppLayout from './app/AppLayout.jsx'
import AuthGuard from './app/AuthGuard.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="/dashboard" element={<AuthGuard><AppLayout /></AuthGuard>}>
        <Route index element={<DashboardHome />} />
        <Route path="invoices">
          <Route index element={<InvoicesList />} />
          <Route path="new" element={<CreateInvoice />} />
          <Route path=":id" element={<ViewInvoice />} />
          <Route path=":id/edit" element={<EditInvoice />} />
        </Route>
      </Route>
    </Routes>
  )
}
