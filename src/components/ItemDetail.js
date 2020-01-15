import React, {  useState, useEffect } from 'react';
import {Rtif} from '../Rtif';

export default function ItemDetail({match}) {
    const imageStyle = {
        width: '500px',

    }
    const divStyle = {
        textAlign: 'center'
    }
    const [item, setItem] = useState([ ]);
    const [items, setItems] = useState([ ]);

    useEffect(()=>{
        fetchItems();
        fetchItem();
    },[]) ; //Since array is empty it will be called once. 
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
        </>
    )
}
