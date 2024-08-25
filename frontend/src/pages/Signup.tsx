// import React from 'react'

import Auth from "@/components/Auth"
import Quote from "../components/Quote"

const Signup = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
                <Auth type="signup" />
            </div>

            {/* Quote */}
            <div className="invisible lg:visible">
                <Quote />
            </div>
        </div>
    )
}

export default Signup