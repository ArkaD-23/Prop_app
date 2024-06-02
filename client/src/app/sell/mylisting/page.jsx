import React from 'react'
import Propcard from '@/components/Propcard'

export const mylisting = async () => {

    const res = await fetch("../../server/listing/getall/")

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>My Listings</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                <Propcard />
                <Propcard />
                <Propcard />
                <Propcard />
            </div>
        </div>
    )
}
