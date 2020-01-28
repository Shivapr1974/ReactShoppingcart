import React, {  useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Cart from './Cart';
import fetchItemsData from './Data'
import Rating from '@material-ui/lab/Rating';

export default function Shop() {
    const CART_KEY = 'cart-key';
    const icon = {
        width: '30px',
        height: '30px',
        paddingRight: '10px'
    }
    const tableStyle = {
        border: '1px solid #bdbaba'
    }    
    const colStyle = {
        border: '1px solid #bdbaba'
    } 
    const navStyle = {
        textDecoration: 'none'
    }    
    const addToCartStyle = {
        textAlign: 'center',
        paddingLeft: '100px'
    }        
    const [items, setItems] = useState([ ]);
    const [cart, setCart] = useState([ ]);
    function resetCart(availableItems, cart){
        if(cart === null || cart === undefined){
            cart = []
        }else{
            cart = JSON.parse(cart);           
        }         
        cart.map((cartItem) => {
            const item = availableItems.find( cart => cart.itemId === cartItem.id );
            if(( item === null || item === undefined || item.length === 0) && 
                 cartItem.available === true){
                cartItem.available = false;
            // }else{
            //     cartItem.available = true;
            }
        });    
        setCart(cart); 
    }    

    useEffect(()=>{
        (async () => {
            const data = await fetchItemsData();
            setItems(data);
            resetCart(data, cart);
        })();        
        let cart = localStorage.getItem(CART_KEY);
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
        }else{
            setCart(JSON.parse(cart));           
        }        
    },[]) ; //Since array is empty it will be called once. 

    useEffect(()=>{
        // console.log( 'Items State' );
        console.log( items );
    },[items]); //It will be called everytime todos [] change.
    useEffect(()=>{
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },[cart]); //It will be called everytime todos [] change.
            

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <table style={tableStyle}>
                                    <tbody>
                                        <tr>
                                            <td colSpan="3"><h1>Shopping List</h1></td>
                                        </tr>
                                        {items.map( data => (
                                            <tr  key={data.itemId}>
                                                    <td style={colStyle}>
                                                        <Link style={navStyle} to={`/shop/${data.itemId}/${data.item.name}`}> 
                                                            <img style={icon} src={data.item.images.icon}></img>
                                                        </Link>    
                                                    </td> 
                                                    <td style={colStyle}>
                                                        <Link style={navStyle} to={`/shop/${data.itemId}/${data.item.name}`}> 
                                                            {data.item.name} 
                                                        </Link>    
                                                    </td>
                                                    <td style={colStyle}>
                                                        <Rating name="half-rating" value={data.item.ratings.avgStars} defaultValue={2.5} precision={0.5} />
                                                    </td>                                            
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td>
                            <div style={addToCartStyle}> 
                                {/* <button onClick={handleCart}>Add To Cart</button> */}
                                {/* <button onClick={clearCart}>Clear Cart</button> */}
                                <Cart cart={cart} setCart={setCart}></Cart>            
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
