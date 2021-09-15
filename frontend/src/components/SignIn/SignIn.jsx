import React, { useState } from 'react';

import { Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import CreateAccount from '../CreateAccount/CreateAccount';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import './Sign.css';
import { login } from '../../actions/auth';

function SignIn(props) {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.login(email, password);
    // const user = {
    //   email,
    //   password
    // };
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };

    //   const body = JSON.stringify(user);

    //   const res = await axios.post('api/v1/users/login', body, config);
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err.response.data);
    // }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signin'>
      {forgotPassword ? (
        <ForgetPassword />
      ) : createAccount ? (
        <CreateAccount />
      ) : (
        <Segment style={{ width: '40%', marginLeft: '25%', marginTop: '5%' }}>
          <div className='sigin_welcome'>
            <h4>Welcome to Summerly</h4>
          </div>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Input label='Enter your email address' placeholder='email address' name='email' onChange={(e) => handleChange(e)} />
            <Form.Input label='Enter your password' placeholder='password' name='password' onChange={(e) => handleChange(e)} />
            <Form.Button content='Log in' />
          </Form>

          {/* <Link to='/forgotpassword'>
            <h5 className='signin_forgotpassword' onClick={() => setForgotPassword(true)}>
              Forgot Password
            </h5>
          </Link> */}

          <Link to='/signup'>
            <h6 className='signin_createaccount' onClick={() => setCreateAccount(true)}>
              Not yet register? Create Account
            </h6>
          </Link>
        </Segment>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(SignIn);
