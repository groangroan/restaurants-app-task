import axios from 'axios';
import {useEffect, useState} from 'react';
import Restaurant from './components/Restaurant';
import Categories from './components/Categories';
import './RestaurantList.scss';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [offset, setOffset] = useState(0);

  const loadRestaurants = () => {
    axios
      .get(
        'https://radiant-tundra-32683.herokuapp.com/https://api.yelp.com/v3/businesses/search?',
        {
          headers: {
            Authorization:
              'Bearer K9Q8Nr4-xtYiZoiL3Lrij_HAVgmNvzU_BZl-9kSM0_MhiS6pqzQuCfQJLlb35MQkkuwywcj4fALbtli-UNtNM8QpqIbBEcEYpqruF6lFbDPFJrzxfMuDphUztFPqYnYx',
          },
          params: {
            limit: 15,
            offset: offset,
            location: 'San Jose, CA 95127',
            term: 'restaurants',
          },
        }
      )
      .then((res) => {
        setRestaurants((arr) => [...arr, ...res.data.businesses]);
        setFilteredRestaurants((arr) => [...arr, ...res.data.businesses]);
        setCategories(
          new Set(
            res.data.businesses.reduce(
              (arr, current) => [...arr, ...current.categories],
              []
            )
          )
        );
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadRestaurants();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (el) => {
      if (
        window.innerHeight + el.target.documentElement.scrollTop + 1 >=
        el.target.documentElement.scrollHeight
      ) {
        const newOffset = offset + 15;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, [offset]);

  useEffect(() => {
    if (!activeCategory) {
      setFilteredRestaurants(restaurants);
      return;
    }
    const filteredRes = restaurants.filter((res) => {
      const categoryStr = res.categories.map((category) => {
        return category.alias;
      });
      return categoryStr.indexOf(activeCategory) > -1;
    });
    setFilteredRestaurants(filteredRes);
  }, [activeCategory]);

  return (
    <>
      <div className="reset-filters">
        <button onClick={() => setActiveCategory('')}>Reset filters</button>
      </div>
      <div className="category-nav">
        {Array.from(categories)?.map((category, index) => (
          <Categories
            clickHandler={() => setActiveCategory(category.alias)}
            category={category}
            key={index}
          />
        ))}
      </div>
      <div className="restaurant-list">
        {filteredRestaurants?.map((restaurant, index) => (
          <Restaurant
            openUrl={(url) => {
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            restaurant={restaurant}
            key={index}
          />
        ))}
      </div>
      <div className="loading"></div>
    </>
  );
};

export {RestaurantsList};
