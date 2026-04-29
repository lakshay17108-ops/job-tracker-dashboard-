import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const AddJobWizard = lazy(() => import('./pages/AddJobWizard'))
const EditJobWizard = lazy(() => import('./pages/EditJobWizard'))

function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-job" element={<AddJobWizard />} />
              <Route path="/edit-job/:id" element={<EditJobWizard />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="text-center py-6 text-zinc-600 text-sm border-t border-zinc-200 mt-8">
        <p>&copy; 2026 Job Application Tracker. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App