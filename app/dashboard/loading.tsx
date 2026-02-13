import Loading from '@/components/ui/Loading'

export default function DashboardLoading() {
    return (
        <div className="min-h-[calc(100-h-20)] flex items-center justify-center">
            <Loading text="Syncing Mission Data" />
        </div>
    )
}
