import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './ListingItem.css';
import { Segment } from 'semantic-ui-react';
import moment from 'moment';

function ListingItem({ listing }) {
  // const [state, setState] = useState();

  // const handleClick = (event) => {
  //   event.preventDefault();

  //   setState(window.click(localStorage.setItem('id', JSON.stringify(listing._id))));
  // };

  return (
    <div className='listingItem'>
      <Link to={`/listings/${listing._id}`}>
        <Segment className='listingItem__segment'>
          <img src={`/uploads/${listing.imageCover}`} className='listing__image' />

          <div className='listingItem__information'>
            <p className='listing__title'>{listing.title}</p>
            <div>
              <span className='listingItem__city'>{listing.city}</span>|
              <span className='listingItem__date'>{moment(listing.postedAt).format('MM/DD/YYYY')}</span>
            </div>

            <p className='listingItem__description'>{listing.listingDescription}</p>
          </div>

          <p className='listingItem__rent'>${listing.monthlyRent}</p>
        </Segment>
      </Link>
    </div>
  );
}

export default ListingItem;
