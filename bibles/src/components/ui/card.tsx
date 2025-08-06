import * as React from "react"

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`bg-slate-800/30 backdrop-blur-sm border-slate-600/10 border rounded-lg shadow-lg ${className}`}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={`text-xl font-semibold leading-none tracking-tight text-slate-100 ${className}`}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <div
      className={`text-sm text-slate-300 ${className}`}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props} />
  )
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  )
} 