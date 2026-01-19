import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'dark'
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', variant = 'default', icon, ...props }, ref) => {
    const isDark = variant === 'dark'
    
    return (
      <div className="w-full">
        {label && (
          <label className={cn(
            "block text-sm font-medium mb-1.5",
            isDark ? "text-white" : "text-slate-700"
          )}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              isDark ? "text-slate-400" : "text-slate-500"
            )}>
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full py-2.5 rounded-lg border transition-all duration-200',
              icon ? 'pl-10 pr-4' : 'px-4',
              'focus:outline-none focus:ring-2 focus:border-transparent',
              'disabled:bg-slate-100 disabled:cursor-not-allowed',
              isDark ? [
                'bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400',
                'focus:ring-blue-500 focus:bg-slate-700/70',
                error ? 'border-red-500 focus:ring-red-500' : 'hover:border-slate-500'
              ] : [
                'bg-white border-slate-300 text-slate-900 placeholder:text-slate-600',
                'focus:ring-blue-500',
                error ? 'border-red-500 focus:ring-red-500' : 'hover:border-slate-400'
              ],
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className={cn(
            "mt-1.5 text-sm",
            isDark ? "text-slate-400" : "text-slate-500"
          )}>{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
