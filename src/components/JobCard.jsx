import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteJob, selectAllJobs } from '../store/jobsSlice'

function JobCard({ job }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const statusColors = {
    Applied: 'bg-indigo-600 text-white',
    Interviewing: 'bg-amber-500 text-white',
    Rejected: 'bg-red-500 text-white',
    Offered: 'bg-green-500 text-white',
  }
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${job.company}?`)) {
      dispatch(deleteJob(job.id))
    }
  }
  
  const handleEdit = () => {
    navigate(`/edit-job/${job.id}`)
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  return (
    <div className="bg-white border border-zinc-200 rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900">
            {job.company}
          </h3>
          <p className="text-sm text-zinc-600 mt-1">{job.role}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-sm ${statusColors[job.status]}`}>
          {job.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100">
        <span className="text-xs text-zinc-500">
          {formatDate(job.date)}
        </span>
        
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="px-2 py-1 text-xs text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-2 py-1 text-xs text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
        No job applications yet
      </h3>
      <p className="text-zinc-600 mb-6 text-center">
        Start tracking your job applications by adding your first entry.
      </p>
      <button
        onClick={() => navigate('/add-job')}
        className="px-4 py-2 bg-indigo-600 text-white rounded-sm text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Add Job
      </button>
    </div>
  )
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
        No results found
      </h3>
      <p className="text-zinc-600 text-center">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  )
}

export { JobCard, EmptyState, NoResults }
export default JobCard