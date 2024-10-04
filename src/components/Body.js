import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utilities/useOnlineStatus';

const Body = () => {
    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [debouncedSearchText, setDebouncedSearchText] = useState("");

    const fetchData = async () => {
        try {
            const data = await fetch(
                "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3176452&lng=82.9739144&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            const json = await data.json();

            console.log("API Response: ", json);

            // Iterate over all cards to get the restaurants
            const cards = json?.data?.cards || [];
            let restaurants = [];

            cards.forEach((card) => {
                const cardRestaurants = card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                restaurants = [...restaurants, ...cardRestaurants]; // Add restaurants to the list
            });

            // If no restaurants are fetched, use fallback data
            if (restaurants.length === 0) {
                const fallbackData = [
                    {
                        info: {
                            id: "1",
                            name: "Test Restaurant",
                            cuisines: ["Indian", "Chinese"],
                            avgRating: 4.5,
                        },
                    },
                ];
                setListOfRestaurant(fallbackData);
                setFilteredRestaurant(fallbackData);
            } else {
                setListOfRestaurant(restaurants);
                setFilteredRestaurant(restaurants);
            }
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [searchText]);

    useEffect(() => {
        if (debouncedSearchText) {
            const filtered = listOfRestaurant.filter((res) =>
                (res?.info?.name?.toLowerCase() || "").includes(debouncedSearchText.toLowerCase()) ||
                (res?.info?.cuisines?.join(' ')?.toLowerCase() || "").includes(debouncedSearchText.toLowerCase())
            );
            setFilteredRestaurant(filtered);
        } else {
            setFilteredRestaurant(listOfRestaurant);
        }
    }, [debouncedSearchText, listOfRestaurant]);

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
        return <h1>Oops! It looks like your internet connection is lost. Please check it.</h1>;
    }

    return listOfRestaurant.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body bg-fuchsia-50">
            <div className="flex">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search Restaurant or Dish"
                        className="py-1 ml-4 border-2 border-solid border-violet-300 rounded-lg"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="px-4 py-1 m-1 bg-slate-300 search-btn rounded-lg"
                        onClick={() => {
                            const filtered = listOfRestaurant.filter((res) =>
                                (res?.info?.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
                                (res?.info?.cuisines?.join(' ')?.toLowerCase() || "").includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurant(filtered);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="p-2 px-5 mx-5 bg-slate-300 top-rated-button rounded-lg"
                    onClick={() => {
                        const filteredList = listOfRestaurant.filter((res) => (res?.info?.avgRating || 0) > 4.4);
                        setFilteredRestaurant(filteredList);
                    }}
                >
                    Top Rated Restaurant
                </button>
            </div>

            <div className="flex flex-wrap m-3 restaurant-container">
                {filteredRestaurant.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
                        <RestaurantCard resData={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
