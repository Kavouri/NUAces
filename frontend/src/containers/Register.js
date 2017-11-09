import React from 'react';
import request from '../lib/requestWrapper';
import _ from 'lodash';

import Name from './registration/Name';
import { Birthday, MONTHS } from './registration/Birthday';
import Email from './registration/Email';
import Password from './registration/Password';
import ConfirmPassword from './registration/ConfirmPassword';
import Error from './registration/Error';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      month: 'January',
      day: '',
      year: '',
      email: '',
      password: '',
      passwordConfirm: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  validateForm() {
    let error = '';
    _.forEachRight(this.state, (value, key) => {
      if (key !== 'error' && !this.state[key]) {
        error = `${key.split(/(?=[A-Z])/).map(word => _.upperFirst(word)).join(' ')} field is required`;
      }
    });

    if (!error) {
      if (this.state.day.concat(this.state.year).match(/[a-z]/i)) {
        error = 'DD-YYYY contains alphabetic characters.';
      }
      if (this.state.day.length > 2 || this.state.year.length !== 4) {
        error = 'DD-YYYY has an invalid number of characters.';
      }
      if (this.state.password !== this.state.passwordConfirm) {
        error = 'Passwords don\'t match';
      }
      if (this.state.email.indexOf('@') < 0) {
        error = 'Email is not valid.';
      }
    }

    if (error) {
      this.setState({
        error
      });
    }
    return !error;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      const registrationForm = {
        name: `${this.state.firstName} ${this.state.lastName}`,
        dob: `${this.state.year}-${MONTHS[this.state.month]}-${this.state.day}`,
        email: this.state.email,
        password: this.state.password
      };

      request('/user', 'POST', registrationForm)
        .then((res) => {
          if (res.status == 200) {
            this.props.history.push('/');
          } else {
            this.setState({ error: res.body });
          }
        })
        .catch((error) => {
          this.setState({ error: error.error });
        });
    }
  }

  render() {
    return (
      <div className="registration">
      <form className="registration-form" onSubmit={this.handleSubmit}>
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
        <button className="inner-registration register-button" size="3" type="submit">Register</button>
        {this.state.error && <Error error={this.state.error}/>}
      </form>
    </div>
    );
  }
}
