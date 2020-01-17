import React from 'react'

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
    function handleTodosClick(){
        toggleCartItem(cartItem.id);
    }
    return (
        <>
                <td style={colStyle}><input type="checkbox" checked={cartItem.complete} onChange={handleTodosClick}/></td>
                <td style={colStyle}><img style={icon} src={cartItem.icon}></img> </td>                             
                <td style={colStyle}>{cartItem.name}</td>  
                <td style={numStyle}>{cartItem.qty}</td>  
                <td style={numStyle}>{cartItem.totalItemCost}</td>      
        </>
    )
}
