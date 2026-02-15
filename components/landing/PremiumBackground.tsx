'use client'

import * as React from "react"
import { motion } from "framer-motion"
import ParticlesCanvas from "./ParticlesCanvas"

const PremiumBackground = () => {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#030712] -z-10">
            {/* Animated Mesh Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[150px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -80, 0],
                    y: [0, -40, 0],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[150px]"
            />

            {/* Professional tsparticles Background */}
            <ParticlesCanvas />

            {/* Radial Scrim Layer for Text Separation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_50%,#030712_90%)] opacity-70" />

            {/* Fine Dot Pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        </div>
    )
}

export default PremiumBackground
