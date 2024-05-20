import React from 'react';

const Propcard = () => {
    return (
        <div style={{
            maxWidth: '30rem',
            width: '100%',
            overflow: 'hidden'
        }}>
            <div style={{
                fontFamily: 'sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
            }}>
                <div style={{
                    maxWidth: '96rem',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh'
                    }}>
                        <div style={{
                            maxWidth: '24rem',
                            width: '100%',
                            paddingTop: '1.5rem',
                            paddingBottom: '1.5rem',
                            paddingLeft: '0.75rem',
                            paddingRight: '0.75rem'
                        }}>
                            <div style={{
                                backgroundColor: '#fff',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                borderRadius: '0.5rem',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '14rem',
                                    padding: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>

                                    </div>
                                </div>
                                <div style={{
                                    padding: '1rem'
                                }}>
                                    <p style={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        color: '#4a5568'
                                    }}>Detached house • 5y old</p>
                                    <p style={{
                                        fontSize: '1.875rem',
                                        color: '#1a202c'
                                    }}>$750,000</p>
                                    <p style={{
                                        color: '#4a5568'
                                    }}>742 Evergreen Terrace</p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    padding: '1rem',
                                    borderTop: '1px solid #d2d6dc',
                                    color: '#4a5568'
                                }}>
                                    <div style={{
                                        flex: '1',
                                        display: 'inline-flex',
                                        alignItems: 'center'
                                    }}>
                                        <svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
                                        </svg>
                                        <p><span style={{ color: '#1a202c', fontWeight: '700' }}>3</span> Bedrooms</p>
                                    </div>
                                    <div style={{
                                        flex: '1',
                                        display: 'inline-flex',
                                        alignItems: 'center'
                                    }}>
                                        <svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"></path>
                                        </svg>
                                        <p><span style={{ color: '#1a202c', fontWeight: '700' }}>2</span> Bathrooms</p>
                                    </div>
                                </div>
                                <div style={{
                                    paddingLeft: '1rem',
                                    paddingTop: '0.75rem',
                                    paddingBottom: '1rem',
                                    borderTop: '1px solid #d2d6dc',
                                    backgroundColor: '#f7fafc'
                                }}>
                                    <div style={{
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '700',
                                        color: '#718096',
                                        letterSpacing: '0.05em'
                                    }}>Realtor</div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '0.5rem'
                                    }}>
                                        <div style={{
                                            backgroundImage: 'url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            width: '2.5rem',
                                            height: '2.5rem',
                                            borderRadius: '9999px',
                                            marginRight: '0.75rem'
                                        }}>
                                        </div>
                                        <div>
                                            <p style={{
                                                fontWeight: '700',
                                                color: '#1a202c'
                                            }}>Tiffany Heffner</p>
                                            <p style={{
                                                fontSize: '0.875rem',
                                                color: '#4a5568'
                                            }}>(555) 555-4321</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Propcard;