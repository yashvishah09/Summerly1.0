/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { getAListing, updateListing } from '../../actions/listing';
import { Icon } from 'semantic-ui-react';

import './Listing.css';

function EditListing({ getAListing, listing: { listing, loading }, match, updateListing, history }) {
  const [typeOfResidence, setTypeOfResidence] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [utilityIncluded, setUtilityIncluded] = useState('');
  const [roommates, setRoommates] = useState('');
  const [laundry, setLaundry] = useState('');
  const [reservedParking, setReservedParking] = useState('');
  const [isFurnished, setIsFurnished] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [listingDescription, setListingDescription] = useState('');
  const [title, setTitle] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [imageCover, setImageCover] = useState({
    image: undefined,
    previewImage: undefined
  });
  const [images, setImages] = useState({
    imageList: [],
    previewImage: []
  });

  // console.log(listing);

  useEffect(() => {
    getAListing(match.params.id);

    // eslint-disable-next-line no-lone-blocks
    
       {listing && listing.data && listing.data.data && 
        setTypeOfResidence(loading || !listing.data.data.typeOfResidence ? '' : listing.data.data.typeOfResidence);
    setState(loading || !listing.data.data.state ? '' : listing.data.data.state);
    setCity(loading || !listing.data.data.city ? '' : listing.data.data.city);
    setMonthlyRent(loading || !listing.data.data.monthlyRent ? '' : listing.data.data.monthlyRent);
    setZipCode(loading || !listing.data.data.zipCode ? '' : listing.data.data.zipCode);
    setStreet(loading || !listing.data.data.street ? '' : listing.data.data.street);
    setUtilityIncluded(loading || !listing.data.data.utilityIncluded ? '' : listing.data.data.utilityIncluded);
    setRoommates(loading || !listing.data.data.roommates ? '' : listing.data.data.roommates);
    setLaundry(loading || !listing.data.data.laundry ? '' : listing.data.data.laundry);
    setReservedParking(loading || !listing.data.data.reservedParking ? '' : listing.data.data.reservedParking);
    setIsFurnished(loading || !listing.data.data.isFurnished ? '' : listing.data.data.isFurnished);
    setMoveInDate(loading || !listing.data.data.monthlyRent ? '' : listing.data.data.monthlyRent);
    setListingDescription(loading || !listing.data.data.listingDescription ? '' : listing.data.data.listingDescription);
    setTitle(loading || !listing.data.data.title ? '' : listing.data.data.title);
    setGenderPreference(loading || !listing.data.data.genderPreference ? '' : listing.data.data.genderPreference);
    setImages(loading || !listing.data.data.images ? '' : listing.data.data.images);}
    setImageCover({ image: loading || !listing.data.data.imageCover ? '' : listing.data.data.imageCover });}
  , [getAListing, match.params.id]);

  const handleImage = (event) => {
    setImageCover({ image: event.target.files[0], previewImage: URL.createObjectURL(event.target.files[0]) });
  };

  const handleImages = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setImages({
      imageList: [...event.target.files],

      previewImage: images
    });
  };

  // console.log(match.params.id);

  const clearImage = () => {
    setImageCover({ image: undefined, previewImage: undefined });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('typeOfResidence', typeOfResidence);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('zipCode', zipCode);
    formData.append('state', state);
    formData.append('monthlyRent', monthlyRent);
    formData.append('utilityIncluded', utilityIncluded);
    formData.append('laundry', laundry);
    formData.append('genderPreference', genderPreference);
    formData.append('moveInDate', moveInDate);
    formData.append('listingDescription', listingDescription);
    formData.append('isFurnished', isFurnished);
    formData.append('reservedParking', reservedParking);
    formData.append('roommates', roommates);
    formData.append('title', title);
    formData.append('imageCover', imageCover.image.name);

    images.imageList.forEach((image) => formData.append('images', image.name));

    updateListing(formData, match.params.id, history);
  };

  return (
    <div className='listing'>
      <Segment style={{margin: '2rem' , marginLeft:'12rem', boxShadow: '10px 10px 5px grey', width:'70%', height:'220vh'}}>

        <Header className='listing__header'>Help us collect some basic information about your listing....</Header>


        <Form.Field  className='listing__residence listing__select'  label='What type of residence is your listing?' control='select' name='typeOfResidence' value={typeOfResidence} onChange={(e) => setTypeOfResidence(e.target.value)}>
        <option value='House'>House</option>
        <option value='Appartment'>Appartment</option>
        </Form.Field>
   
        

        <div className='listing__address'>
          <p>Address:</p>
          <div className='listing__address__input'>
            <Form.Input
              name='street'
              value={street}
              id='listing__street'
              placeholder='Street/Address Line'
              onChange={(e) => setStreet(e.target.value)}
            />
            <div className='listing__zipCityDiv'>
            <Form.Input name='zipCode' value={zipCode} id='listing__zip' placeholder='Zip Code' onChange={(e) => setZipCode(e.target.value)} />
            <Form.Input name='city' value={city} id='listing__city' placeholder='City' onChange={(e) => setCity(e.target.value)} />
            </div>
            <Form.Input name='state' value={state} id='listing__state' placeholder='State' onChange={(e) => setState(e.target.value)} />
          </div>
        </div>

        <div className='listin__rent'>
          <p>What is your monthly rent?</p>
          <Form.Input
            name='monthlyRent'
            value={monthlyRent}
            id='rent_field'
            placeholder='$...'
            onChange={(e) => setMonthlyRent(e.target.value)}
          />
        </div>
        <div className='listing__checkbox'>
          <p>Are utilities included in monthly rent?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input
                type='radio'
                id='listing__checkbox1_input'
                checked={utilityIncluded === 'Yes'}
                name='utilityIncluded'
                value='Yes'
                onChange={(e) => setUtilityIncluded(e.target.value)}
              />
            
            <label>
              {' '}
              No
              </label>
              <input
                type='radio'
                id='listing__checkbox1_input'
                checked={utilityIncluded === 'No'}
                name='utilityIncluded'
                value='No'
                onChange={(e) => setUtilityIncluded(e.target.value)}
              />
           
          </div>
        </div>

        <div className='listing__checkbox'>
          <p>Is your room your shared?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input id='listing__checkbox1_input' type='radio' checked={roommates === 'Yes'} name='roommates' value='Yes' onChange={(e) => setRoommates(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input id='listing__checkbox1_input' type='radio' checked={roommates === 'No'} name='roommates' value='No' onChange={(e) => setRoommates(e.target.value)} />
            
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Is your room furnished?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input id='listing__checkbox1_input' type='radio' checked={isFurnished === 'Yes'} name='isFurnished' value='Yes' onChange={(e) => setIsFurnished(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input id='listing__checkbox1_input' type='radio' checked={isFurnished === 'No'} name='isFurnished' value='No' onChange={(e) => setIsFurnished(e.target.value)} />
            
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Is there in-site laundry?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input  id='listing__checkbox1_input' type='radio' checked={laundry === 'Yes'} name='laundry' value='Yes' onChange={(e) => setLaundry(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input id='listing__checkbox1_input' type='radio' checked={laundry === 'No'} name='laundry' value='No' onChange={(e) => setLaundry(e.target.value)} />
            
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Does your residence have resrved parking?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input
                type='radio'
                id='listing__checkbox1_input'
                checked={reservedParking === 'Yes'}
                name='reservedParking'
                value='Yes'
                onChange={(e) => setReservedParking(e.target.value)}
              />
           
            <label>
              {' '}
              No
              </label>
              <input
                type='radio'
                id='listing__checkbox1_input'
                checked={reservedParking === 'No'}
                name='reservedParking'
                value='No'
                onChange={(e) => setReservedParking(e.target.value)}
              />
            
          </div>
        </div>

        <div className='listing__select'>
          <p>Do you have a sub-letter gender preference?</p>
          <select name='genderPreference' value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='None'>None</option>
          </select>
        </div>

        <div className='listing__moveIn'>
          <p>When do you want to rent?</p>
          <Form.Input name='moveInDate' value={moveInDate} placeholder='MM/DD/YYYY' onChange={(e) => setMoveInDate(e.target.value)} />
        </div>
        <div className='listing__description'>
          <p>Place description.</p>
          <Form.TextArea style={{width:'30rem', height:'10rem'}} name='listingDescription' value={listingDescription} onChange={(e) => setListingDescription(e.target.value)} />
        </div>

        <div className='listing__title'>
          <p>By what title your listing needs to be displayed?</p>
          <Form.Input name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className='listing__imageCover'>
          <p>Choose a picture of your listing for your display</p>
          <input type='file' style={{ color: 'transparent', width: '6rem' }} filename='imageCover' onChange={(e) => handleImage(e)} />
          {imageCover.previewImage && (
            <div>
              <img src={imageCover.previewImage} />
              <Icon name='close' onClick={clearImage} />
            </div>
          )}
        </div>

        <div className='listing__images'>
          <p>Upload images of your listing</p>
          <input type='file' filename='images' style={{ color: 'transparent' }} multiple onChange={(e) => handleImages(e)} />
          <span>{images.imageList && images.imageList.map((image) => <span>{image.name}</span>)}</span>
          {images.previewImage &&
            images.previewImage.map((image) => (
              <div>
                <img src={image} />
                <Icon name='close' />
              </div>
            ))}
        </div>
        
        <Button type='submit' floated='right' className='listing1_button' content='Update' onClick={(e) => handleSubmit(e)} />
        </Segment>
      </div>
  
  );
}

const mapStateToProps = (state) => ({
  listing: state.listing
});

export default connect(mapStateToProps, { getAListing, updateListing })(withRouter(EditListing));
