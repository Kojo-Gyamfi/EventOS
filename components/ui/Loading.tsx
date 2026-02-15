'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingProps {
    fullscreen?: boolean
    text?: string
    className?: string
}

export default function Loading({
    fullscreen = false,
    text = 'Initializing secure environment',
    className
}: LoadingProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center transition-all duration-500",
            fullscreen ? "fixed inset-0 z-100 bg-[#030712]/95 backdrop-blur-2xl" : "p-8",
            className
        )}>
            {/* Background patterns and gradients for fullscreen */}
            {fullscreen && (
                <>
                    <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-32 -mt-32"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            x: [0, -40, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -ml-32 -mb-32"
                    />
                </>
            )}

            <div className="relative">
                {/* Elite Orbiting Animation */}
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="relative w-24 h-24"
                >
                    <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[24px]" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                    />
                </motion.div>

                {/* Central Logo Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-blue-500/20"
                    >
                        <LayoutDashboard className="w-6 h-6 text-white" />
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center space-y-2"
            >
                <h3 className="text-lg font-black text-white tracking-tight uppercase">
                    {text}
                </h3>
                <div className="flex gap-1.5 justify-center h-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.5, 1],
                                backgroundColor: ['#475569', '#3b82f6', '#475569']
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                            className="w-1.5 h-1.5 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
