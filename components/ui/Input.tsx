'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: React.ReactNode
  variant?: 'default' | 'dark'
  icon?: React.ReactNode
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', variant = 'default', icon, showPasswordToggle, ...props }, ref) => {
    const isDark = variant === 'dark'
    const [isVisible, setIsVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const isPassword = type === 'password'
    const currentType = isPassword && isVisible ? 'text' : type

    return (
      <div className="w-full space-y-1.5 focus-within:z-10 group">
        {label && (
          <label className={cn(
            "block text-sm font-semibold transition-colors duration-200",
            isFocused ? "text-blue-600" : isDark ? "text-slate-300" : "text-slate-700"
          )}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200",
              isFocused ? "text-blue-500" : isDark ? "text-slate-500" : "text-slate-400"
            )}>
              {icon}
            </div>
          )}
          <input
            type={currentType}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            className={cn(
              'w-full py-3 rounded-xl border transition-all duration-300 ease-out',
              icon ? 'pl-11' : 'px-4',
              isPassword && showPasswordToggle ? 'pr-11' : 'pr-4',
              'focus:outline-none focus:ring-4',
              isDark
                ? 'disabled:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed disabled:text-slate-400'
                : 'disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed',
              isDark ? [
                'bg-white/5 border-white/10 text-white placeholder:text-slate-500',
                'focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/10',
                error ? 'border-red-500/50 focus:ring-red-500/10 focus:border-red-500' : 'hover:border-white/20'
              ] : [
                'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400',
                'focus:ring-blue-600/5 focus:border-blue-600 shadow-sm',
                error ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' : 'hover:border-slate-300'
              ],
              className
            )}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className={cn(
                "absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-200",
                isDark ? "text-slate-500 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-semibold text-red-500 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        {helperText && !error && (
          <p className={cn(
            "text-xs pl-1 font-medium",
            isDark ? "text-slate-500" : "text-slate-500"
          )}>{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
