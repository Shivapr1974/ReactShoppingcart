import triviaJson from '../Items.json';
import React, {  useState, useEffect } from 'react';

// here's a custom hook that is used to fetch data from an API
export default  function useAPI(endpoint='https://fortnite-api.theapinetwork.com/store/get') {
    const [value, setValue] = React.useState([]);
  
    React.useEffect(() => {
      getData();
    }, []);
  
    async function getData() {
      const response = await fetch(endpoint);
      let itemsJson = await response.json();
      if( itemsJson === null || itemsJson === undefined ||  
        itemsJson.data === null || itemsJson.data === undefined || itemsJson.data.length === 0 ){
            itemsJson =  triviaJson;    
        }else{
            itemsJson =  itemsJson.data;
        }      
      setValue(itemsJson);
    };
  
    return value;
  };
  