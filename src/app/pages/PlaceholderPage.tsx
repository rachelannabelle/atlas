import { useLocation } from "react-router"

export function PlaceholderPage() {
  const location = useLocation()

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-muted-foreground font-mono">{location.pathname}</p>
    </div>
  )
}
