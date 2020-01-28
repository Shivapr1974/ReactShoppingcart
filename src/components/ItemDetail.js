import React, {  useState, useEffect } from 'react';
import {Rtif} from '../Rtif';
import Cart from './Cart';
import fetchItemsData from './Data'
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';

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


    const [item, setItem] = useState([ ]);
    const [items, setItems] = useState([ ]);
    const [cart, setCart] = useState([ ]);
    const [cost, setCost] = useState([ ]);

    // useEffect(()=>{
    //     fetchResource();
    // },[]) ; //Since array is empty it will be called once. 

    useEffect(() => {
        fetchResource();
    }, [match.params.id]);    //Call When parameter to function changes. It will also be called via constructor..



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
    function handleCart(){
        let newCart = [...cart];        
        let cartItem = cart.filter( cartItem => cartItem.id === match.params.id );      
        if(cartItem === undefined || cartItem === null || cartItem.length === 0){
            newCart = [...newCart, {id:  match.params.id, name: item.name, icon: item.images.icon, cost: cost, qty: 1, complete: false, available: true} ]
        }else{
            newCart.map((cartItem) => {
                if(cartItem.id === match.params.id){
                    cartItem.qty++; 
                    cartItem.complete= false;
                    cartItem.totalCost = cartItem.qty * cartItem.cost
                }
            });       
        }   
        calculateTotal(newCart) ;   
    }        
    function fetchResource(){
        // localStorage.setItem(CART_KEY, JSON.stringify([]));
        let cart = localStorage.getItem(CART_KEY);
        // console.log( 'Get: ' + JSON.parse(cart));
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
        }else{
            calculateTotal(JSON.parse(cart));
        }
        (async () => {
            const data = await fetchItemsData();
            setItems(data);
        })();    
    }    
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
    }


    return (
        <>  
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div style={divStyle}>
                                <h1>{item.name}  &nbsp;&nbsp;
                                <Rating name="half-rating" value={item.ratings?.avgStars} defaultValue={2.5} precision={0.5} />
                                </h1> 
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
                                <Button variant="contained" color="primary" onClick={handleCart}>Add To Cart</Button>
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
