import React, { useState } from 'react';

import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './Listing.css';
import { createListing } from '../../actions/listing';

function AddListing({ createListing, auth }) {
  const [typeOfResidence, setTypeOfResidence] = useState('House');
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
  const [imageCover, setImageCover] = useState('');
  const [images, setImages] = useState([]);

  const handleImage = (event) => {
    setImageCover(event.target.files[0]);
    // console.log(imageCover.name);
  };

  const handleImages = (event) => {
    setImages([...images, ...event.target.files]);
    // console.log(images.map((image) => image.name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('typeOfResidence', typeOfResidence);
    data.append('street', street);
    data.append('city', city);
    data.append('zipCode', zipCode);
    data.append('state', state);
    data.append('monthlyRent', monthlyRent);
    data.append('utilityIncluded', utilityIncluded);
    data.append('laundry', laundry);
    data.append('genderPreference', genderPreference);
    data.append('moveInDate', moveInDate);
    data.append('listingDescription', listingDescription);
    data.append('isFurnished', isFurnished);
    data.append('reservedParking', reservedParking);
    data.append('roommates', roommates);
    data.append('title', title);
    data.append('imageCover', imageCover.name);
    data.append('lister', auth.user._id);

    images.forEach((image) => data.append('images', image.name));

    createListing(data);

    
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

        <div className='listing__rent'>
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
          <div className='listing__checkbox1' style={{marginLeft:'0'}}>
            <label>
              {' '}
              Yes
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='utilityIncluded' value='Yes' onChange={(e) => setUtilityIncluded(e.target.value)} />
         
            <label>
              {' '}
              No
              </label>

              <input type='radio'  id='listing__checkbox1_input' name='utilityIncluded' value='No' onChange={(e) => setUtilityIncluded(e.target.value)} />
            
          </div>
        </div>

        <div className='listing__checkbox'>
          <p>Is your room your shared?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='roommates' value='Yes' onChange={(e) => setRoommates(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='roommates' value='No' onChange={(e) => setRoommates(e.target.value)} />
            
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Is your room furnished?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='isFurnished' value='Yes' onChange={(e) => setIsFurnished(e.target.value)} />
            
            <label>
              {' '}
              No

              </label>
              <input type='radio'  id='listing__checkbox1_input' name='isFurnished' value='No' onChange={(e) => setIsFurnished(e.target.value)} />
           
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Is there in-site laundry?</p>
          <div className='listing__checkbox1'>
            <label>
              {' '}
              Yes
              </label>
              <input type='radio'  id='listing__checkbox1_input'  name='laundry' value='Yes' onChange={(e) => setLaundry(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='laundry' value='No' onChange={(e) => setLaundry(e.target.value)} />
           
          </div>
        </div>
        <div className='listing__checkbox'>
          <p>Does your residence have resrved parking?</p>
          <div className='listing__checkbox1' style={{marginLeft:'0'}}>
            <label>
              {' '}
              Yes
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='reservedParking' value='Yes' onChange={(e) => setReservedParking(e.target.value)} />
            
            <label>
              {' '}
              No
              </label>
              <input type='radio'  id='listing__checkbox1_input' name='reservedParking' value='No' onChange={(e) => setReservedParking(e.target.value)} />
            
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
          <Form.TextArea style={{width:'30rem', height:'10rem'}} name='listingDescription' value={listingDescription} onChange={(e) => setListingDescription(e.target.value)} placeholder='Specify more about the place you are willing to rent.'/>
        </div>

        <div className='listing__title'> 
          <p>By what title your listing needs to be displayed?</p>
          <Form.Input style={{width:'20rem'}} placeholder='1 BHK Room sharing' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className='listing__imageCover'>
          <p>Choose a picture of your listing for your display</p>
          <input type='file' name='imageCover' onChange={handleImage} />
        </div>

        <div className='listing__images'>
          <p>Upload images of your listing</p>
          <input type='file' name='images' multiple onChange={handleImages} />
        </div>
        <Button type='submit' floated='right' className='listing__button' content='Submit' onClick={(e) => handleSubmit(e)} />
      </Segment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createListing })(AddListing);
