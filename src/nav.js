import React from 'react'
import {Link} from 'react-router-dom';
export default function nav() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none'
    }
    return (
        <nav>
            <Link style={navStyle} to='/'>
                <h3>Home</h3>
            </Link>                
            <ul className="nav-links">
                <Link style={navStyle} to='/shop'>
                    <li>Shop</li>
                </Link>
                <Link style={navStyle} to='/cart'>
                    <li>Cart</li>
                </Link>
                <Link style={navStyle} to='/feedback'>
                    <li>Feed Back</li>
                </Link>
                <Link style={navStyle} to='/about'>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )
}
