import React, {useState} from 'react';
import './Restaurant.scss';
import {Rating} from 'react-simple-star-rating';

const Restaurant = ({restaurant, openUrl}) => {
  return (
    <>
      <div className="restaurant-card" onClick={() => openUrl(restaurant.url)}>
        <div className="restaurant-img">
          <img src={restaurant.image_url} alt="A photo of {restaurant.name}" />
        </div>
        <div className="restaurant-name">{restaurant.name}</div>
        <Rating
          className="restaurant-rating"
          initialValue={restaurant.rating}
          readonly
          allowHalfIcon
        />
        <hr />
        <div className="restaurant-price">{restaurant.price}</div>

        <a href={restaurant.url} target="_blank">
          <span>VIEW</span>
        </a>
      </div>
    </>
  );
};

export default Restaurant;
