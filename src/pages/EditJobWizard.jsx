import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateJob, selectAllJobs } from '../store/jobsSlice'

const STEPS = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Application Details' },
  { id: 3, title: 'Review & Submit' },
]

function EditJobWizard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const jobs = useSelector(selectAllJobs)
  const existingJob = jobs.find(job => job.id === id)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0],
  })
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (existingJob) {
      setFormData({
        company: existingJob.company,
        role: existingJob.role,
        status: existingJob.status,
        date: existingJob.date,
      })
    }
  }, [existingJob])
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required'
      }
      if (!formData.role.trim()) {
        newErrors.role = 'Role is required'
      }
    }
    
    if (step === 2) {
      if (!formData.date) {
        newErrors.date = 'Date is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }
  
  const handleSubmit = () => {
    dispatch(updateJob({ id, ...formData }))
    navigate('/dashboard')
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">
              Basic Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Enter company name"
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.company ? 'border-red-500' : 'border-zinc-200'
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Role / Position *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => updateFormData('role', e.target.value)}
                placeholder="Enter role or position"
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.role ? 'border-red-500' : 'border-zinc-200'
                }`}
              />
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">
              Application Details
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => updateFormData('status', e.target.value)}
                className="w-full px-3 py-2 border border-zinc-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Rejected">Rejected</option>
                <option value="Offered">Offered</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Date Applied *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                  errors.date ? 'border-red-500' : 'border-zinc-200'
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">
              Review Your Changes
            </h2>
            
            <div className="bg-stone-50 border border-zinc-200 rounded-sm p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-600">Company:</span>
                <span className="font-medium text-zinc-900">{formData.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Role:</span>
                <span className="font-medium text-zinc-900">{formData.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Status:</span>
                <span className="font-medium text-zinc-900">{formData.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Date:</span>
                <span className="font-medium text-zinc-900">
                  {new Date(formData.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-zinc-600">
              Please review your changes before submitting.
            </p>
          </div>
        )
      
      default:
        return null
    }
  }
  
  if (!existingJob) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Job not found
        </h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-sm text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Edit Job
        </h1>
        <p className="text-zinc-600">
          Update your job application details
        </p>
      </div>
      
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((step, index) => {
          const isActive = currentStep >= step.id
          const isCurrent = currentStep === step.id
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {step.id}
                </div>
                <span className={`text-xs mt-2 ${isCurrent ? 'text-indigo-600 font-medium' : 'text-zinc-600'}`}>
                  {step.title}
                </span>
              </div>
              
              {index < STEPS.length - 1 && (
                <div 
                  className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-indigo-600' : 'bg-zinc-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      
      {/* Form Content */}
      <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm max-w-xl mx-auto">
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              currentStep === 1
                ? 'text-zinc-300 cursor-not-allowed'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            Back
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-sm text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-sm text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditJobWizard