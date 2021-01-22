import React from 'react'
import { useLocation } from 'react-router-dom'

const LoadingMask = () => {
    const { pathname } = useLocation()
    const isSlow = pathname === '/search'

    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner-chase">
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                    <div className="chase-dot" />
                </div>
            </div>
            {isSlow && (
                <div id="status-text">
                    <p className="text-center">
                        This page loads a lot of data... Bear with us
                    </p>
                </div>
            )}
        </div>
    )
}

export default LoadingMask
