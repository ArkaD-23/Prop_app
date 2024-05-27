'use client'
import React from 'react'
import Propcard from "@/components/Propcard.jsx"
import Link from 'next/link'

const Profile = () => {

    const handleSignout = async () => {
        try {
            await fetch("../../server/auth/signout");
            alert("Signout successful");
        } catch (error) {
            next(error);
        }
    }

    return (
        <div style={{ display: 'grid' }}>
            <div style={{
                width: '100%', padding: '8% 0 0', margin: ' auto', display: 'grid', justifyItems: 'center'
            }}>
                <div style={{
                    background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', display: 'grid', justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    <h1 style={{ textAlign: 'center' }}>My Profile</h1>
                    <form>
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="username" />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="contact" />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="address" />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="email" />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="password" placeholder="password" />
                        <button style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px' }} >Update</button>
                    </form>
                </div>
            </div>
            <div>
                <h1 style={{ textAlign: 'center' }}>My Listings</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Propcard />
                    <Propcard />
                    <Propcard />
                    <Propcard />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Link href="/sell" style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '20%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px',textDecoration:'none',textAlign:'center' }}>
                    Add Listing
                </Link>
                <Link href="/" onClick={handleSignout} style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '20%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px', textDecoration:'none', textAlign:'center'}} >Signout</Link>
            </div>

        </div>
    )
}

export default Profile; 