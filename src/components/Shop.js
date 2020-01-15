import React, {  useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Shop() {
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
    const [items, setItems] = useState([ ]);

    useEffect(()=>{
        fetchItems();
    },[]) ; //Since array is empty it will be called once. 

    useEffect(()=>{
        console.log( 'Items State' );
        console.log( items );
    },[items]); //It will be called everytime todos [] change.
      

    const fetchItems = async () =>{
        const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
        const itemsJson = await data.json()
        setItems(itemsJson.data);
        // console.log( itemsJson.data);
    }
    return (
        <>
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
        </>
    )
}
