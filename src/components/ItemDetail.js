import React, {  useRef, useState, useEffect } from 'react';
import {Rtif} from '../Rtif';
import CartItem from './CartItem'
export default function ItemDetail({match}) {
    const CART_KEY = 'cart-key';
    const imageStyle = {
        width: '500px',

    }
    const divStyle = {
        textAlign: 'center'
    }
    const addToCartStyle = {
        textAlign: 'center',
        paddingLeft: '100px'
    }    
    const tableStyle = {
        border: '1px solid #bdbaba'
    }    
    const colStyle = {
        border: '1px solid #bdbaba'
    } 


    const [item, setItem] = useState([ ]);
    const [items, setItems] = useState([ ]);
    const [cart, setCart] = useState([ ]);
    const [cost, setCost] = useState([ ]);
    const cartRef = useRef();                    

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
        fetchItems();
        fetchItem();
    },[]) ; //Since array is empty it will be called once. 
    useEffect(()=>{
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      },[cart]); //It will be called everytime todos [] change.
      

    useEffect(()=>{
        console.log( item );
    },[item]); //It will be called everytime todos [] change.
      
    useEffect(()=>{
        let itemJson = items.filter( item => item.itemId === match.params.id ); 
        if(itemJson[0] !== undefined){
            // console.log( "itemId: " + itemJson[0].itemId);
            setItem( itemJson[0].item);
            setCost( itemJson[0].store.cost);
        }
        // console.log( items );
    },[items]); //It will be called everytime todos [] change.
    function clearCart(){
        const newCart = [...cart];
        setCart( newCart.filter( cartItem => cartItem.complete ) );        
    }    
    function handleCart(){
        let newCart = [...cart];        
        let cartItem = cart.filter( cartItem => cartItem.id === match.params.id );      
        if(cartItem === undefined || cartItem === null || cartItem.length === 0){
            newCart = [...newCart, {id:  match.params.id, name: item.name, icon: item.images.icon, cost: cost, qty: 1, complete: true} ]
        }else{
            newCart.map((cartItem) => {
                if(cartItem.id === match.params.id){
                    cartItem.qty++; 
                    cartItem.complete= true;
                    cartItem.totalCost = cartItem.qty * cartItem.cost
                }
            });       
        }   
        calculateTotal(newCart) ;   
    }        
    function calculateTotal(newCart){
        newCart.map((cartItem) => {
            cartItem.totalItemCost = cartItem.qty * cartItem.cost
        });    
        setCart(newCart);     
    }
    const fetchItem = async () =>{
        const data = await fetch(`https://fortnite-api.theapinetwork.com/item/get?${match.params.id}`);
        const itemsJson = await data.json()
        // setItem( itemsJson);
    }
    const fetchItems = async () =>{
        const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
        const itemsJson = await data.json()
        setItems(itemsJson.data);
        // console.log( itemsJson.data);
    }
    function togglecart(id){
        const newCart = [...cart];
        const cartItem = newCart.find( cart => cart.id ===id );
        cartItem.complete =  !cartItem.complete;
        setCart(newCart);        
    }    
    return (
        <>  
            <table >
                <tr>
                    <td>
                        <div style={divStyle}>
                            <h1>{item.name} ({item.ratings?.avgStars} ratings)</h1> 
                            {/* <img src={item.images?.icon}></img>                  */}
                            <Rtif boolean={item.images?.featured !== null}>
                                <img style={imageStyle}  src={item.images?.featured}></img>                 
                            </Rtif>                                  

                            <Rtif boolean={item.images?.featured === null}>
                                <img style={imageStyle}  src={item.images?.icon}></img>                 
                            </Rtif>                                  
                            {/* <img src={item.images?.background}></img>                  */}
                            {/* <img src={item.images?.information}></img>                  */}
                            <h2><i>{item.description}</i></h2>
                        </div>
                    </td>
                    <td>
                        <div style={addToCartStyle}> 
                            <button onClick={handleCart}>Add To Cart</button>
                            <button onClick={clearCart}>Clear Cart</button>
                            <table style={tableStyle}>
                                <tr>
                                    <th style={colStyle}>#</th><th style={colStyle}></th><th style={colStyle}>Item</th>
                                    <th style={colStyle}>Quantity</th><th style={colStyle}>Sub Total</th>
                                </tr>
                                {cart.map( data => (
                                    <tr  key={data.id}>
                                        <CartItem cartItem={data} toggleCartItem={togglecart}></CartItem>
                                    </tr>
                                ))}
                                <tr>
                                 <th style={colStyle} colSpan="4">Total</th><th style={colStyle}>100</th>
                                </tr>

                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </>
    )
}
