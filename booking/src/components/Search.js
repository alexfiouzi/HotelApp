
import React, { useState, useEffect } from 'react';
import Hotel from './Hotel';

function Search() {
  const URL = "https://api.jsonbin.io/b/5f23fb32250d377b5dc78cab";

  const [hotels, setHotels] = React.useState([]);
  const [filteredHotels, setFilteredHotels] = React.useState([]); 
  const [price, setPrice] = useState(1500);
  const [propertyType, setPropertyType] = useState("All");
  const [guestRating, setGuestRating] = useState("All");
  const [location, setLocation] = useState("All");
  const [sortHotel, setSortHotel] = useState("Our Recommendations");

  React.useEffect(function () {
    fetch(URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        setHotels(data[1].entries);
        setFilteredHotels(data[1].entries);
      })
  }, []);

  const rates = [0, 1, 2, 3, 4, 5];

  const sorts = ["Car Park", "Sauna", "Pool", "Wifi", "Balcony"];

  const ratings = [
    {
      name: "8.5-10 Excellent",
      value: "Excellent",
    },
    {
      name: "7 – 8.5 Very Good",
      value: "Very Good",
    },
    {
      name: "6 – 7 Good",
      value: "Good",
    },
    {
      name: "2 – 6 Fair",
      value: "Fair",
    },
    {
      name: "0-2 Okay",
      value: "Okay",
    },
  ];
  const cities=["Paris","Toulouz","Marseille"];

  let updatedHotels;
  const handleFilters = (price, propertyType, guestRating, location, sortHotel) => {
    updatedHotels = hotels.filter((hotel) => {
      if (propertyType !== "All") {
        if (hotel.rating !== Number(propertyType)) {
          return false;
        }
      }

      if (guestRating !== "All") {
        if (hotel.ratings.text.indexOf(guestRating) === -1) {
          console.log(guestRating);
          return false;
        }
      }

      if (location !== "All") {
        if (hotel.city.indexOf(location) === -1) {
          return false;
        }
      }
      if (sortHotel !== "Our Recommendations") {
        let hotelF = [];
        hotel.filters.map(f => {
          console.log(f);
          console.log(f.name);
          console.log(sortHotel);
          hotelF.push(f.name);
        });
        if (hotelF.indexOf(sortHotel) === -1) {
          return false;
        }
      }
      return hotel.price <= price;
    });
    setFilteredHotels(updatedHotels);
    
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    console.log(form.elements.keyword);
    const keyword = form.elements.keyword.value.toLowerCase();
    console.log(keyword);
    const updatedHotels = hotels.filter((hotel) => {
      return hotel.city.toLowerCase().indexOf(keyword) > -1 || hotel.hotelName.toLowerCase().indexOf(keyword) > -1;

    });
    setFilteredHotels(updatedHotels);

  };

  return (
    <div className="container-fluid">
      <div className="bg-filter">
        <form className="form-inline d-flex  justify-content-center" onSubmit={handleSubmit}>
          <i id="favicon" className="fal fa-search" aria-hidden="true" />

          <input
            className="form-control  w-100"
            type="text" name="keyword" id="keyword" aria-label="Search" list="cities"

            aria-label="Search"
          />
          <datalist id="cities">
            {
              cities.map((city,index) => {
                return (
                  
                    <option key={index} value={city}></option>
                  
                )

              })
            }

          </datalist>

          <button id="button">Search</button>
        </form>

        <div className="form-inline row" id="date">
          <div className="col-4">
            Check in
            <input type="date" max="2021-12-31" min="2020-08-30" className="form-control w-100" />
          </div>
          <div className="col-4 ">
            Check out
          <input type="date" max="2021-12-31" min="2020-08-30" className="form-control w-100" placeholder="Check in" />
          </div>
          <div id="roomtype" className="dropdown col-4">

            <button className="btn btn-light dropdown-toggle w-100 " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-users"></i> Family Rooms

             </button>
            <div className="dropdown-menu" arialabelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#"><i className="fas fa-user"></i> Single</a>
              <a className="dropdown-item" href="#"><i className="fad fa-user-friends"></i> Double</a>
            </div>
          </div>
        </div>

        <div className="row d-flex ">
          <div className="slidecontainer d-flex slid flex-column col-4">

            <form>
              <div className="form-group">
                <label htmlFor="price" className="text-light">Price  ${price}</label>
                <input type="range" className="form-control-range" id="price" min="0" max="1500" onChange={(event) => {
                  setPrice(event.target.value);
                  const nPrice = event.target.value
                  handleFilters(nPrice, propertyType, guestRating, location, sortHotel)
                }} />
              </div>
            </form>

          </div>
          <div className=" d-flex justify-content-between slid  col-4">

            <div className="form-group col-md-4 ">
              <label htmlFor="inputState " className="text-light" >Property Type</label>
              <select id="inputState" className="form-control color border-0" onChange={(event => {
                setPropertyType(event.target.value);
                const propertyType = event.target.value;
                handleFilters(price, propertyType, guestRating, location, sortHotel)
              })} >
                <option className="select" value="All" defaultValue>All</option>
                {

                  rates.map((rate,index) => {

                    return (
                      <option key={index} className="text-white" value={rate} >{rate} stars</option>
                    )
                  })
                }

              </select>
            </div>

            <div className="slid"></div>
            <div className="form-group col-md-4">
              <label htmlFor="inputState" className="text-light">Guest Rating</label>
              <select id="inputState" className="form-control color border-0" onChange={(event => {
                setGuestRating(event.target.value);
                const guestRating = event.target.value;
                console.log(guestRating);
                handleFilters(price, propertyType, guestRating, location, sortHotel)
              })} >
                <option defaultValue>All</option>
                {

                  ratings.map((rating,index) => {

                    return (
                      <option key={index} className="text-white" value={rating.value}>{rating.name}</option>
                    )
                  })
                }

              </select>
            </div>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputState" className="text-light">Hotel Locations</label>
            <select id="inputState" className="form-control color border-0" onChange={(event => {
              setLocation(event.target.value);
              const location = event.target.value;
              handleFilters(price, propertyType, guestRating, location, sortHotel)
            })} >
              <option defaultValue>All</option>
              {

                cities.map((city,index) => {

                  return (
                    <option key={index} className="text-white ">{city}</option>
                  )
                })
              }

            </select>
          </div>

        </div>

        <div id="map" className="row bg-light h-75 d-flex flex-row justify-content-between">
          <div className="col-6"
            id="map-container"
            className="z-depth-1-half map-container"
            style={{ height: 0 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgr!4v1554987763683!5m2!1sen!2sgr"
              frameBorder={0}
              style={{ border: 0 }}
              height="100px"
              allowFullScreen
            />

          </div>
          <div id="drop" className="dropdown col-6">
            <div>
              <div id="sort">Sort by</div>
              <i className="fal fa-info-circle" id="information"></i>

            </div>
            <div id="rec" className="form-group col-md-4 d-flex justify-content-end">

              <select id="inputState" className="form-control" onChange={(event => {
                setSortHotel(event.target.value);
                const sortHotel = event.target.value;
                console.log(sortHotel);
                handleFilters(price, propertyType, guestRating, location, sortHotel)
              })} >
                <option defaultValue>Our Recommendations</option>
                {

                  sorts.map((sort,index) => {

                    return (
                      <option key={index} value={sort}>{sort}</option>
                    )
                  })
                }

              </select>

            </div>
          </div>
        </div>
      </div>
      {
        filteredHotels.map((hotel,index) => {
          return (
            <div key={index}>
              <Hotel  city={hotel.city} rating={hotel.rating} hotelName={hotel.hotelName} thumbnail={hotel.thumbnail} price={hotel.price} ratingNumber={hotel.ratings.no} ratingText={hotel.ratings.text} />

            </div>

          )
        })
      }
    </div>
  );
}

export default Search;