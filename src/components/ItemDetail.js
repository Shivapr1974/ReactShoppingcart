import React, {  useRef, useState, useEffect } from 'react';
import {Rtif} from '../Rtif';

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


    const [item, setItem] = useState([ ]);
    const [items, setItems] = useState([ ]);
    const [cart, setCart] = useState([ ]);
    const cartRef = useRef();                    

    useEffect(()=>{
        let cart = localStorage.getItem(CART_KEY);
        console.log( 'Get: ' + JSON.parse(cart));
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
        }else{
            setCart(JSON.parse(cart));           
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
        }
        // console.log( items );
    },[items]); //It will be called everytime todos [] change.

    function handleCart(){
        setCart(prevCart => {
          return [...prevCart, {id:  match.params.id, name: item.name, icon: item.images.icon} ]
        });
    
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
                            <ul>
                                {cart.map( data => (
                                    <li  style={listStyle}  key={data.id}>
                                        <img style={icon} src={data.icon}></img>                             
                                        {data.name}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
        </>
    )
}
