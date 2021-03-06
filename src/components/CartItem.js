import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import {Rtif} from '../Rtif';

export default function CartItem({cartItem,toggleCartItem}) {
    const icon = {
        width: '30px',
        height: '30px',
        paddingRight: '10px'
    }
    const colStyle = {
        border: '1px solid #bdbaba',
        textAlign: 'left'
    } 
    const numStyle = {
        border: '1px solid #bdbaba',
        textAlign: 'right'
    }     
    const navStyle = {
        textDecoration: 'none'
    }        
    function handleTodosClick(){
        toggleCartItem(cartItem.id);
    }
    return (
        <>
                <td style={colStyle}>
                    {/* <input type="checkbox" checked={cartItem.complete} onChange={handleTodosClick}/> */}
                    <Checkbox
                        checked={cartItem.complete}
                        onChange={handleTodosClick}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />                    
                </td>
                <td style={colStyle}>
                    <Rtif boolean={cartItem.available === true}>
                        <Link style={navStyle} to={`/shop/${cartItem.id}/${cartItem.name}`}> 
                            <img style={icon} src={cartItem.icon}></img> 
                        </Link>                        
                    </Rtif>                                      
                    <Rtif boolean={cartItem.available === false}>
                        <span> 
                            <img style={icon} src={cartItem.icon}></img> 
                        </span>                        
                    </Rtif>                                      
                </td>                             
                <td style={colStyle}>
                    <Rtif boolean={cartItem.available === true}>
                        <Link style={navStyle} to={`/shop/${cartItem.id}/${cartItem.name}`}> 
                            {cartItem.name}
                        </Link>                        
                    </Rtif>                                      
                    <Rtif boolean={cartItem.available === false}>
                        <span> 
                            {cartItem.name}
                        </span>                        
                    </Rtif>                                      
                </td>  
                <td style={numStyle}>
                    {cartItem.qty}
                </td>  
                <td style={numStyle}>
                    {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2, maximumFractionDigits: 2
                    }).format(cartItem.totalItemCost)}                    
                </td>      
                <Rtif boolean={cartItem.available === false}>
                    <td>Item is not available.</td>                   
                </Rtif>                       
        </>
    )
}
