import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/')
  }
  
  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-zinc-900">Job Tracker</span>
        </Link>
        
        <nav className="flex gap-6">
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors ${
              isActive('/dashboard') 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-zinc-600 hover:text-indigo-600'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add-job" 
            className={`text-sm font-medium transition-colors ${
              isActive('/add-job') 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-zinc-600 hover:text-indigo-600'
            }`}
          >
            Add Job
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header