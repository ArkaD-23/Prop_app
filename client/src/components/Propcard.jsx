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
                        maxHeight: '1000vh'
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
                                boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',                                borderRadius: '0.5rem',
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
                                    color: '#4a5568',
                                    
                                }}>
                                    <div style={{
                                        flex: '1',
                                        display: 'grid',
                                        alignItems: 'center'
                                    }}>
                                        
                                        <p><span style={{ color: '#1a202c', fontWeight: '700' }}>3</span> Bedrooms</p>
                                    </div>
                                    <div style={{
                                        flex: '1',
                                        display: 'grid',
                                        alignItems: 'center'
                                    }}>
                                        
                                        <p><span style={{margin:'0px', color: '#1a202c', fontWeight: '700' }}>2</span> Bathrooms</p>
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