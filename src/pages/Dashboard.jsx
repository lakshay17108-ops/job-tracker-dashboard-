import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Search } from 'lucide-react'
import { JobCard, EmptyState, NoResults } from '../components/JobCard'
import { 
  setSearchQuery, 
  setFilterStatus, 
  setSortBy, 
  selectFilteredAndSortedJobs,
  selectSearchQuery,
  selectFilterStatus,
  selectSortBy
} from '../store/jobsSlice'

function Dashboard() {
  const dispatch = useDispatch()
  const jobs = useSelector(selectFilteredAndSortedJobs)
  const searchQuery = useSelector(selectSearchQuery)
  const filterStatus = useSelector(selectFilterStatus)
  const sortBy = useSelector(selectSortBy)
  
  const [localSearch, setLocalSearch] = useState(searchQuery)
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch))
    }, 400)
    
    return () => clearTimeout(timer)
  }, [localSearch, dispatch])
  
  const handleSearchChange = useCallback((e) => {
    setLocalSearch(e.target.value)
  }, [])
  
  const handleFilterChange = useCallback((e) => {
    dispatch(setFilterStatus(e.target.value))
  }, [dispatch])
  
  const handleSortChange = useCallback((e) => {
    dispatch(setSortBy(e.target.value))
  }, [dispatch])
  
  const clearSearch = useCallback(() => {
    setLocalSearch('')
  }, [])
  
  const hasJobs = jobs.length > 0
  const hasSearchOrFilter = searchQuery || filterStatus !== 'All'
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Dashboard
        </h1>
        <p className="text-zinc-600">
          Track and manage your job applications
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white border border-zinc-200 rounded-sm p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={localSearch}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                &times;
              </button>
            )}
          </div>
          
          {/* Filter Dropdown */}
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offered">Offered</option>
          </select>
          
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
          >
            <option value="date-newest">Date (Newest)</option>
            <option value="date-oldest">Date (Oldest)</option>
            <option value="company-az">Company (A-Z)</option>
            <option value="company-za">Company (Z-A)</option>
          </select>
        </div>
      </div>
      
      {/* Job Cards Grid */}
      {!hasJobs ? (
        hasSearchOrFilter ? <NoResults /> : <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard