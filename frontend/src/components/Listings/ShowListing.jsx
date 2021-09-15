import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';

import { getAListing } from '../../actions/listing';
import './ShowListing.css';

function ShowListing({ getAListing, listing: { listing, loading }, match }) {
  useEffect(() => {
    getAListing(match.params.id);
  }, [getAListing, match.params.id]);

  // console.log(listing);

  return (
    <div>
      {listing ? (
        <div>
          <div className='listing__carousel'>
            {/* <Carousel>
          {listing.data.data.images.map(
            // eslint-disable-next-line jsx-a11y/alt-text
            (image) => (
              <Carousel.Item>
                <img width='100%' src={`/uploads/${image}`} />
              </Carousel.Item>
            )
          )}
        </Carousel> */}
          </div>

          <div className='listing__features'>
            <div className='column feature_part1'>
              <p>Rent: {listing.data.data.monthlyRent}</p>
              <p>Residence Type: {listing.data.data.typeOfResidence}</p>
              <p>Furnished: {listing.data.data.isFurnished}</p>
              <p>Laundry: {listing.data.data.laundry}</p>
            </div>
            <div className='column feature_part2'>
              <p>Gender Preference: {listing.data.data.genderPreference}</p>
              <p>Parking: {listing.data.data.reservedParking}</p>
              <p>Move In Date: {listing.data.data.moveInDate}</p>
              <p>Roommates: {listing.data.data.roommates}</p>
              <p>Utility Included: {listing.data.data.utilityIncluded}</p>
            </div>
          </div>

          <p className='listing__description'>{listing.data.data.listingDescription}</p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  listing: state.listing
});
export default connect(mapStateToProps, { getAListing })(ShowListing);
