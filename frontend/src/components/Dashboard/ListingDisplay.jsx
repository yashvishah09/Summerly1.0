import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';

import { deleteListing } from '../../actions/listing';
import '../Listings/ListingItem.css'

function ListingDisplay({ listing, deleteListing }) {
  const handleDeleteListing = (id) => {
    deleteListing(id);
    window.location.reload();
  };
  return (
    <div>
      <Segment className='listingItem__segment'>
        <img src={`/uploads/${listing.imageCover}`} className='listingItem__image' />

        <div className='listingItem__information'>
          <span className='listingItem__title'>{listing.title}</span>
          <div>
            <span className='listingItem__city'>{listing.city}</span>|
            <span className='listingItem__date'>{moment(listing.postedAt).format('MM/DD/YYYY')}</span>
          </div>

          <p className='listingItem__description'>{listing.listingDescription}</p>
        </div>

        <p className='listingItem__rent'>${listing.monthlyRent}</p>

        <Link to={`/updatelistings/${listing._id}`}>
          <Icon className='dashboard__edit' size='large' name='pencil' />
        </Link>

        <Icon name='trash' onClick={(e) => handleDeleteListing(listing._id)} />
      </Segment>
    </div>
  );
}

export default connect(null, { deleteListing })(ListingDisplay);
