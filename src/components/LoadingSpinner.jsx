function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-600 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner