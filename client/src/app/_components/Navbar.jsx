import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    return (

        <div style={{ position: 'fixed', left: '0', top: '0', width: '100%', background: '#2980b9', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', maxWidth: '90%', background: '#2980b9', margin: 'auto' }}>
                <Link href="/">
                    <h1 style={{ color: 'azure', fontSize: "27px", fontWeight: '600', textDecoration: 'none' }}>PropApp</h1>
                </Link>
                <ul style={{ display: 'flex', listStyle: 'none', fontWeight: '600' }}>
                    <Link href="/buy">
                        <li style={{ color: 'azure', margin: '0 15px', textDecoration: 'none' }}>Buy</li>
                    </Link>
                    <Link href="/sell">
                        <li style={{ color: 'azure', margin: '0 15px', textDecoration: 'none' }}>Sell</li>
                    </Link>
                    <Link href="/signin">
                        <li style={{ color: 'azure', margin: '0 15px', textDecoration: 'none' }}>Signin</li>
                    </Link>
                </ul>
            </div>
        </div>

    )
}



