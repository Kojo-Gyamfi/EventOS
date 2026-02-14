'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>>, HTMLMotionProps<'div'> {
  variant?: 'default' | 'bordered' | 'elevated' | 'dark' | 'glass' | 'dark-glass'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-2xl p-6 shadow-sm border border-slate-100',
      bordered: 'bg-white rounded-2xl p-6 border border-slate-200 shadow-sm',
      elevated: 'bg-white rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-50',
      dark: 'bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-2xl',
      glass: 'bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-black/5',
      'dark-glass': 'bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]',
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
