// import React from 'react'

import { Skeleton } from "./ui/skeleton"

const PostsSkeleton = () => {
    return (

        <div role="status" className="flex justify-center">
            <div className="max-w-xl divide-y divide-gray-500">
                <div className="py-12 px-4 md:px-8">
                    <div className="flex gap-2">
                        <div className="flex flex-col justify-center">
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>

                        <div className="flex flex-col justify-center">
                            <Skeleton className="h-4 w-[100px]" />
                        </div>

                        <div className="text-gray-500 flex flex-col justify-center">
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </div>

                    <div className="mt-4 mb-2 text-2xl font-bold">
                        <Skeleton className="h-10 w-[400px]" />
                    </div>

                    <div className="text-lg">
                        <Skeleton className="h-10 w-[400px]" />
                    </div>

                    <div className="text-lg text-gray-500">
                        <Skeleton className="h-4 w-[100px] mt-6" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default PostsSkeleton