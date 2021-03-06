import triviaJson from '../Items.json';
import { getContrastRatio } from '@material-ui/core';

const fetchItemsData = async () =>{
    const CART_KEY = 'cart-key';
    try{
        const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
        const itemsJson = await data.json()
        let availableItems = [];
        if( itemsJson === null || itemsJson === undefined ||  
            itemsJson.data === null || itemsJson.data === undefined || 
            itemsJson.data.length === 0 || !Array.isArray(itemsJson.data) 
        ){
                availableItems =  triviaJson;    
        }else{
            availableItems =  itemsJson.data;
        }
        return availableItems;
    }catch(e){
        return triviaJson;
    }
}
export default fetchItemsData;

