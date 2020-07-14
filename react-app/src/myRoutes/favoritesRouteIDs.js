import React, { useEffect, useState } from "react";
import apiManager from "../apiManager/apiManager";
import FavoriteDateCard from "./FavoriteDateCard";

const FavoriteRouteIDs = props => {
  const [favoriteRouteIDs, setFavoriteRouteIDs] = useState([]);

  const getFavoriteRoutes = userid => {
    apiManager.getFavorites(userid).then(APIResult => {
      APIResult.sort((a, b) => (a.route.number > b.route.number ? 1 : -1));
      setFavoriteRouteIDs(APIResult);
    });
  };

  const unStar = (type, id) => {
    apiManager.deleteTypeWithId(type, id).then(() =>
      apiManager
        .getFavorites(parseInt(sessionStorage.getItem("userId")))
        .then(APIResult => {
          APIResult.sort((a, b) => (a.route.number > b.route.number ? 1 : -1));
          setFavoriteRouteIDs(APIResult);
        })
    );
  };

  useEffect(() => {
    getFavoriteRoutes(parseInt(sessionStorage.getItem("userId")));
  }, []);

  return (
    <>
      <div className="route_card">
        {favoriteRouteIDs.map(favoriteRouteID => (
          <FavoriteDateCard
            key={favoriteRouteID.routeId}
            favoriteRouteID={favoriteRouteID}
            unStar={unStar}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default FavoriteRouteIDs;
