'use client'
import { useAppSelector } from '@/store/hooks/hooks.js'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    const { currentUser } = useAppSelector((state) => state.user);

    return (
        <div style={{ position: 'fixed', left: '0', top: '0', width: '100%', background: '#2980b9', boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', maxWidth: '90%', background: '#2980b9', margin: 'auto' }}>
                <Link style={{textDecoration: 'none'}} href="/">
                    <h1 style={{ color: 'azure', fontSize: "27px", fontWeight: '600'}}>PropApp</h1>
                </Link>
                <ul style={{ display: 'flex', listStyle: 'none', fontWeight: '600' }}>
                    <Link style={{textDecoration: 'none'}} href="/buy">
                        <li style={{ color: 'azure', margin: '0 15px',}}>Buy</li>
                    </Link>
                    <Link style={{textDecoration: 'none'}} href="/sell">
                        <li style={{ color: 'azure', margin: '0 15px',}}>Sell</li>
                    </Link>
                    {currentUser ? (<Link style={{textDecoration: 'none'}} href='/profile'>
                    <li style={{ color: 'azure', margin: '0 15px',}}>{currentUser.username}</li>
                    </Link>) : (<Link style={{textDecoration: 'none'}} href="/signin">
                    <li style={{ color: 'azure', margin: '0 15px',}}>Signin</li>
                    </Link>)}
                </ul>
            </div>
        </div>
    )
}



