import { useEffect, useState } from "react";
import { SEARCH_LOGO_URL, SWIGGY_RESTAURANT_API } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./ShimmerLoadingCards";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const url = SWIGGY_RESTAURANT_API;
    const data = await fetch(proxyUrl + encodeURIComponent(url));
    const jsonSwaggiRestaurantData = await data.json();
    console.log(jsonSwaggiRestaurantData);

    setRestaurantData(
      jsonSwaggiRestaurantData?.data?.cards[1]?.card?.card?.gridElements
        ?.infoWithStyle?.restaurants
    );
    setResponseData(
      jsonSwaggiRestaurantData?.data?.cards[1]?.card?.card?.gridElements
        ?.infoWithStyle?.restaurants
    );
    setIsLoading(false);
  };

  const filterRestaurant = () => {
    const filterRest = restaurantData.filter(
      (topRest) => topRest.info.avgRating >= 4.5
    );
    setRestaurantData(filterRest);
  };

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="bodyContainer">
      <div className="searchContainer">
        <button onClick={filterRestaurant}>Top Restaurants👑</button>
        <button onClick={() => setRestaurantData(responseData)}>❌</button>
        <label>
          <img
            className="searchImg"
            alt="search icon"
            src={SEARCH_LOGO_URL}
          ></img>
        </label>
        <input
          className="inputBox"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        ></input>
      </div>
      <div className="restContainer">
        {restaurantData
          .filter((rest) =>
            rest.info.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((rest) => (
            <Link key={rest.info.id} to={`/restaurant/${rest.info.id}`}>
              <RestaurantCard resData={rest} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Body;
