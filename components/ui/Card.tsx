import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'dark'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-xl p-6',
      bordered: 'bg-white rounded-xl p-6 border border-slate-200',
      elevated: 'bg-white rounded-xl p-6 shadow-lg',
      dark: 'bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white rounded-xl p-6 shadow-2xl',
    }

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
