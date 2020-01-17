const fetchItems = async () =>{
    const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
    const itemsJson = await data.json()
    if( itemsJson === null || itemsJson === undefined ||  
        itemsJson.data === null || itemsJson.data === undefined || itemsJson.data.length === 0 ){
            return triviaJson;    
    }else{
        return itemsJson.data;
    }
    // console.log( itemsJson.data);
}