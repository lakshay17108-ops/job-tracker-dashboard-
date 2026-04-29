import { createSlice, createSelector } from '@reduxjs/toolkit'
import sampleJobs from '../data/sampleJobs.json'

const initialState = {
  jobs: sampleJobs,
  searchQuery: '',
  filterStatus: 'All',
  sortBy: 'date-newest',
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload)
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id)
      if (index !== -1) {
        state.jobs[index] = { ...state.jobs[index], ...action.payload }
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload)
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
})

export const { addJob, updateJob, deleteJob, setSearchQuery, setFilterStatus, setSortBy } = jobsSlice.actions

export const selectAllJobs = (state) => state.jobs.jobs
export const selectSearchQuery = (state) => state.jobs.searchQuery
export const selectFilterStatus = (state) => state.jobs.filterStatus
export const selectSortBy = (state) => state.jobs.sortBy

// Memoized selector to prevent unnecessary re-renders
const selectJobsState = (state) => state.jobs

export const selectFilteredAndSortedJobs = createSelector(
  [selectJobsState],
  (jobsState) => {
    const { jobs, searchQuery, filterStatus, sortBy } = jobsState
    
    let filtered = [...jobs]
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job => 
        job.company.toLowerCase().includes(query) ||
        job.role.toLowerCase().includes(query)
      )
    }
    
    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(job => job.status === filterStatus)
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-newest':
          return new Date(b.date) - new Date(a.date)
        case 'date-oldest':
          return new Date(a.date) - new Date(b.date)
        case 'company-az':
          return a.company.localeCompare(b.company)
        case 'company-za':
          return b.company.localeCompare(a.company)
        default:
          return 0
      }
    })
    
    return filtered
  }
)

export default jobsSlice.reducer