import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';

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
                <td style={colStyle}><img style={icon} src={cartItem.icon}></img> </td>                             
                <td style={colStyle}>
                        <Link style={navStyle} to={`/shop/${cartItem.id}/${cartItem.name}`}> 
                        {cartItem.name}
                        </Link>                        
                    
                </td>  
                <td style={numStyle}>{cartItem.qty}</td>  
                <td style={numStyle}>{cartItem.totalItemCost}</td>      
        </>
    )
}
