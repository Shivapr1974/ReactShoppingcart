import React, {  useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import triviaJson from '../Items.json';
import Cart from './Cart';
import fetchItemsData from './Data'
export default function Shop() {
    const CART_KEY = 'cart-key';
    const icon = {
        width: '30px',
        height: '30px',
        paddingRight: '10px'
    }
    const listStyle = {
        listStyleType: 'none'
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

    useEffect(()=>{
        (async () => {
            const data = await fetchItemsData();
            setItems(data);
        })();        
        // fetchItems();
        let cart = localStorage.getItem(CART_KEY);
        // console.log( 'Get: ' + JSON.parse(cart));
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
            <table >
                <tr>
                    <td>
                        <div>
                            <h1>Shop</h1>
                            <ul>
                                {items.map( data => (
                                    <li style={listStyle} key={data.itemId}>
                                        <Link style={navStyle} to={`/shop/${data.itemId}/${data.item.name}`}> 
                                            <img style={icon} src={data.item.images.icon}></img> 
                                            {data.item.name} ({data.item.ratings.avgStars} ratings)
                                        </Link>
                                    </li>
                                ))}

                            </ul>
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
            </table>
        </>
    )
}
