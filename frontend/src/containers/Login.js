import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import request from '../lib/requestWrapper';
import { successfulLogin } from '../redux/actions/actions';
import Error from './registration/Error';
import Register from './Register';

class UnwrappedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  validateForm() {
    const { email, password } = this.state;
    let error = '';
    if (!email) {
      error = 'Please enter your email';
    } else if (this.state.email.indexOf('@') < 0) {
      error = 'Email is not valid';
    } else if (!password) {
      error = 'Please enter your password';
    }
    if (error) {
      this.setState({ error });
    }
    return !error;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      const loginForm = {
        email: this.state.email,
        password: this.state.password
      };

      let baseUrl = process.env.REACT_APP_BASE_URL + "/login";
      const options = {
        url: baseUrl,
        form: loginForm
      };

      console.log(request);
      request('/login', 'POST', loginForm)
        .then((res) => {
          if (res.status === 200) {
            this.props.successfulLogin(res);
            this.props.history.push('/');
          }
        })
        .catch((error) => {
          this.setState({ error: error.error });
        });
    }
  }

  render() {
      return <div className="container-fluid">
          <h1 className="text-center">Login</h1>
          <form>
              <div className="row Form-Margin">
                  <div className="col-xs-6 col-xs-offset-3">
                      <input
                          placeholder="Email"
                          name="email"
                          type="text"
                          className="form-control text-center"
                          value={this.state.email}
                          onChange={this.handleEmail}
                      />
                  </div>
              </div>
              <div className="row Form-Margin">
                  <div className="col-xs-6 col-xs-offset-3">
                      <input
                          placeholder="Password"
                          name="password"
                          type="password"
                          className="form-control text-center"
                          value={this.state.password}
                          onChange={this.handlePassword}
                      />
                  </div>
              </div>
              <div className="row Form-Margin">
                  <div className="col-xs-6 col-xs-offset-3">
                      <button className="btn btn-block btn-primary"
                        type="submit" onClick={this.handleSubmit}>
                          Login
                      </button>
                  </div>
              </div>
              <div className = "row Form-Margin">
                  <div className="col-xs-6 col-xs-offset-3">
                      <Link to="/register">
                          <button className="btn btn-block btn-success">
                              Register
                          </button>
                      </Link>
                  </div>
              </div>
              <div className="row Form-Margin">
                  <div className="col-xs-6 col-xs-offset-3">
                      <h2> {this.state.error
                        && <Error error={this.state.error}/>}</h2>
                  </div>
              </div>
          </form>
          <Route path='/register' component={Register} />
      </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    successfulLogin: (resp) => { dispatch(successfulLogin(resp)) }
  };
};

export { UnwrappedLogin };

export default connect(() => {return {}}, mapDispatchToProps)(UnwrappedLogin);
