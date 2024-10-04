import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API, ITEM_LOGO_URL } from "../utilities/constant";
import useRestaurantsMenu from "../utilities/useRestaurantsMenu";
import { CDN_URL } from "../utilities/constant";

import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const restaurantInfo = useRestaurantsMenu(resId);
    const [showIndex,setShowIndex] = useState(0)
     const dummy= "dummy data";


    
     

    if (!restaurantInfo) return <Shimmer />;
    
    // Safely access restaurant info
    const name = restaurantInfo?.data?.cards[2]?.card?.card?.info?.name;
    const cloudinaryImageId =  restaurantInfo?.data?.cards[2]?.card?.card?.info?.cloudinaryImageId;
    const cuisines = restaurantInfo?.data?.cards[2]?.card?.card?.info?.cuisines || [];
    const costForTwoMessage = restaurantInfo?.data?.cards[2]?.card?.card?.info?.costForTwoMessage;
    const itemCards = restaurantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards || [];

    const categories = restaurantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter( c => c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    
    return (
        <div className="menu bg-fuchsia-100 text-center ">
            <div className="flex justify-center items-center ">
                <div>
                <img className="w-72 items-center rounded-3xl" src={CDN_URL + cloudinaryImageId} alt=""/>
                </div>
            <div>
            <marquee className=" rounded-lg bg-fuchsia-400  bg-opacity-25"> <h1 className="text-4xl font-semibold text-fuchsia-950">{name}</h1></marquee>
           
                <h3 className="text-2xl">{cuisines.join(", ")}</h3>  
                <h3 className="text-2xl" >{costForTwoMessage}</h3>
                    
            </div>  
     </div>                  
            <div className=" bg-fuchsia-100 menu-list ">
            <p className="text-center pt-6"> <b className="text-4xl">Menu</b> </p>
               
            { (categories || []).map((category, index) => (
    <RestaurantCategory
     key={category?.card?.card?.title } 
     data={category?.card?.card}
     showItems={index === showIndex ? true : false}
     setShowIndex = {() => setShowIndex(index)}
     dummy = {dummy}
     />
  ))}
            </div>

        </div>
    );
};

export default RestaurantMenu;
