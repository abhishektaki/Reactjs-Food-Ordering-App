import { CDN_URL } from "../utilities/constant";
 
const RestaurantCard = (props) => {
    const { resData } = props;
    console.log(resData);
    const {
        cloudinaryImageId,
        name,
        cuisines,
        costForTwo,
        avgRating,
        areaName

    
    } = resData.info;
    return (
        <div className='m-1 border w-60 h-96 restaurant-card bg-fuchsia-100 h-400 hover:bg-green-100 p-1 shadow-lg shadow-slate-300 '>
            <img className="h-48 w-60 hover:scale-110 hover:rounded-lg rounded-xl  " src={CDN_URL + cloudinaryImageId} />
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h5>{costForTwo} </h5>
            <h5>{cuisines.join(', ')} </h5>
            <span>⭐{avgRating}  📍{areaName}  </span>  
        </div>
    );
};
export default RestaurantCard;