import React from "../../node_modules/react";
import FavoriteRoutes from "./FavoritesRouteIDs";

const FavoriteRouteView = props => {
  const dates = props.dates;
  const chosenDate = props.chosenDate;

  return (
      <div className="date_card">
        {dates
          .filter(date => date.id === chosenDate)
          .map(date => (
            <FavoriteRoutes key={date.id} date={date} {...props} />
          ))}
      </div>
  );
};

export default FavoriteRouteView;
