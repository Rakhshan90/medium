import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
    return (
        <div className="max-w-xl mx-auto mt-12 px-4">
            <div className="flex flex-col gap-4">
                <div className="text-4xl font-bold">
                    <Skeleton className="h-8 w-[360px]" />
                </div>
                <div className="flex gap-4 items-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
                <div className="text-lg">
                    <Skeleton className="h-8 w-[360px] mt-6" />
                </div>
            </div>
        </div>
    )
}
