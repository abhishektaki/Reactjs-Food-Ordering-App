import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory =({data, showItems, setShowIndex, dummy})=> {
    
     
    const handleClick = ()=>{
        setShowIndex();

        
    };
 
    return <div>
        
    <div className="rounded-lg w-6/12 m-auto shadow-2xl shadow-fuchsia-400 bg-fuchsia-50 p-2 my-2 ">
    <div className="flex justify-between cursor-pointer" onClick={handleClick}>
        <span className="font-bold text-lg">   {data.title}({data.itemCards.length})</span>
         <span>⬇️</span>
         </div> 
         { showItems && <ItemList items={data.itemCards} dummy={dummy} /> }
    
       
    </div>
    </div>
}
export default RestaurantCategory;  