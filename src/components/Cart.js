import React, {  useRef, useState, useEffect } from 'react';
import CartItem from './CartItem'
import {Rtif} from '../Rtif';

export default function Cart({cart, setCart}) {
    const tableStyle = {
        border: '1px solid #bdbaba'
    }    
    const colStyle = {
        border: '1px solid #bdbaba'
    } 
    const numStyle = {
        border: '1px solid #bdbaba',
        textAlign: 'right'
    }     
    const subTitleStyle = {
        border: '1px solid #bdbaba',
        fontSize: '22px'
    } 
    const [total, setTotal] = useState([ ]);
    useEffect(()=>{
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
        }else{
            calculateTotal(cart);
        }
    },[cart]) ; //Since array is empty it will be called once. 
    function calculateTotal(newCart){
        let total = 0;
        newCart.map((cartItem) => {
            total = total + cartItem.totalItemCost;
        });    
        setTotal(total);
    }          
    function togglecart(id){
        const newCart = [...cart];
        const cartItem = newCart.find( cart => cart.id ===id );
        cartItem.complete =  !cartItem.complete;
        setCart(newCart);        
    }   
    function clearCart(){
        const newCart = [...cart];
        setCart( newCart.filter( cartItem => !cartItem.complete ) );      
        calculateTotal(newCart);
    }    
    function checkOut(){
        alert('You will be charged a total of $'+ total + ". Your items will be shipped shortly." );
        setCart( [] );      
        setTotal(0);
    }       
    return (
        <> 
            <Rtif boolean={total === 0}>
                <h1 style={subTitleStyle}>Your Shopping Cart is empty.</h1>
            </Rtif>                                  
            <Rtif boolean={total > 0}>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <th style={subTitleStyle} colSpan="5">Shopping Cart</th>
                        </tr>                        
                        <tr>
                            <th style={colStyle}>#</th><th style={colStyle}></th><th style={colStyle}>Item</th>
                            <th style={colStyle}>Quantity</th><th style={colStyle}>Total</th>
                        </tr>
                        {cart.map( data => (
                            <tr  key={data.id}>
                                <CartItem cartItem={data} toggleCartItem={togglecart}></CartItem>
                            </tr>
                        ))}
                        <tr>
                        <th style={colStyle} colSpan="4">Grand Total</th><th style={numStyle}>{total}</th>
                        </tr>
                        <tr>
                            <th style={colStyle} ></th>    
                            <th style={colStyle} colSpan="2"><button onClick={clearCart}>Clear Selected</button></th>
                            <th style={colStyle} colSpan="2"><button onClick={checkOut}>Check Out</button></th>
                        </tr>
                    </tbody>
                </table>
            </Rtif>                                  

            
        </> 

    )
}
