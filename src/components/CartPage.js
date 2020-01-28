import React, {  useState, useEffect } from 'react';
import Cart from './Cart';

export default function CartPage() {
    const CART_KEY = 'cart-key';
    const addToCartStyle = {
        paddingLeft: '300px',
        paddingTop: '80px',
    }    
    const [cart, setCart] = useState([ ]);
    const [total, setTotal] = useState([ ]);

    useEffect(()=>{
        // localStorage.setItem(CART_KEY, JSON.stringify([]));
        let cart = localStorage.getItem(CART_KEY);
        console.log( 'Get: ' + JSON.parse(cart));
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
        }else{
            calculateTotal(JSON.parse(cart));
        }
    },[]) ; //Since array is empty it will be called once.    

    useEffect(()=>{
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    },[cart]); //It will be called everytime cart [] change.

    function calculateTotal(newCart){
        let total = 0;
        newCart.map((cartItem) => {
            if(cartItem.available === false){
                cartItem.qty = 0;
            }
            cartItem.totalItemCost = cartItem.qty * cartItem.cost
            total = total + cartItem.totalItemCost;
        });    
        setCart(newCart);     
        setTotal(total);
    }    
    
    return (
        <div style={addToCartStyle}>
             <Cart cart={cart} setCart={setCart} total={total}></Cart> 
        </div>
    )
}
