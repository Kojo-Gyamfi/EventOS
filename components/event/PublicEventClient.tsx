'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import RSVPForm from '@/components/forms/RSVPForm'
import Card from '@/components/ui/Card'

interface PublicEventClientProps {
    event: any
}

export default function PublicEventClient({ event }: PublicEventClientProps) {
    return (
        <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans">
            {/* Animated Mesh Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -40, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"
                />
                <div className="absolute inset-0 bg-dot-pattern opacity-10" />
            </div>

            {/* Hero Header */}
            <div className="relative h-[350px] md:h-[500px] w-full bg-slate-950 overflow-hidden">
                {event.imageUrl ? (
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 to-slate-950 opacity-90" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">{event.title}</h1>
                            <div className="flex flex-wrap items-center gap-8 text-lg md:text-xl font-bold text-blue-400">
                                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-xl">
                                    <Calendar className="w-6 h-6" />
                                    <span>{formatDateTime(event.date)}</span>
                                </div>
                                {event.location && (
                                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-xl">
                                        <MapPin className="w-6 h-6" />
                                        <span>{event.location}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <Card variant="dark-glass" className="p-10 border-white/5 rounded-[40px] shadow-2xl overflow-hidden relative group">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                                About this Event
                            </h2>
                            <p className="text-slate-400 whitespace-pre-wrap leading-relaxed text-lg font-medium">
                                {event.description || 'No description provided.'}
                            </p>
                        </Card>
                    </div>

                    {/* Sidebar / RSVP */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-12">
                            <RSVPForm eventId={event.id} eventName={event.title} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
