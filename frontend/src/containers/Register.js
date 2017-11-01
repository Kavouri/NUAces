import React from 'react';
import request from 'request-promise';

import Name from './registration/Name';
import {Birthday, MONTHS} from './registration/Birthday';
import Email from './registration/Email';
import Password from './registration/Password';
import ConfirmPassword from './registration/ConfirmPassword';
import Error from './registration/Error';

export default class Register extends React.Component {
  state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      month: 'January',
      day: '',
      year: '',  
      error: ''
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name] : event.target.value});
  }

  validateForm() {
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        if (key === 'error') {
          continue;
        }

        if (!this.state[key]) {
          throw 'Form isn\'t filled in.'
        }
      }
    }

    if (this.state.day.concat(this.state.year).match(/[a-z]/i)) {
      throw 'DD-YYYY contains alphabetic characters.';
    }
    if (this.state.day.length > 2 || this.state.year.length !== 4) {
      throw 'DD-YYYY has an invalid number of characters.';
    }
    if (this.state.password !== this.state.passwordConfirm) {
      throw 'Passwords don\'t match';
    }
    if (this.state.email.indexOf('@') < 0) {
      throw 'Email is not valid.';
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let formError = '';
    this.setState({error: ''});

    try {
      this.validateForm();
      
      let registrationForm = {
        name: this.state.firstName + " " + this.state.lastName,
        dob: `${this.state.year}-${MONTHS[this.state.month]}-${this.state.day}`,
        email: this.state.email,
        password: this.state.password
      };

      const options = {
        url: 'http://localhost:3001/user',
        form: registrationForm
      };
    
      request['post'](options)
        .then((res) => {
          //TODO
          console.log(res);
        })
        .error((err) => {
          console.log(err);
        });
    } catch (e) {
      formError = e;
    }

    this.setState({error: formError});    
  }

  render() {
    return (
    <div class="registration">
      <form class="registration-form" onSubmit={this.handleSubmit}>
        <label>Name</label>
        <Name handleChange={this.handleChange} firstName={this.state.firstName} lastName={this.state.lastName}/>
        <label>Birthday</label>
        <Birthday handleChange={this.handleChange} month={this.state.month} day={this.state.day} year={this.state.year}/>
        <label>Email</label>
        <Email handleChange={this.handleChange} email={this.state.email}/>
        <label>Password</label>
        <Password handleChange={this.handleChange} password={this.state.password}/>
        <label>Confirm Password</label>
        <ConfirmPassword handleChange={this.handleChange} passwordConfirm={this.state.passwordConfirm}/>
        <button class="inner-registration register-button" size="3" type="submit">Register</button>
        {this.state.error && <Error error={this.state.error}/>}
      </form>
    </div>
    );
  }
}

