type PageLoaderProps = {
  label: string
}

export function PageLoader({ label }: PageLoaderProps) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      {label}
    </div>
  )
}
