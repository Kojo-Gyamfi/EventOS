'use client'

import * as React from "react"
import PremiumBackground from "@/components/landing/PremiumBackground"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen relative w-full overflow-hidden">
            <PremiumBackground />
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-6">
                {children}
            </div>
        </div>
    )
}
