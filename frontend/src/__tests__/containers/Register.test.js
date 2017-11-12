import Register from '../../containers/Register';
import React from 'react';
import renderer from 'react-test-renderer';
import { mockFunction, restoreAllMocks } from '../../lib/testingUtils';
import * as request from '../../lib/requestWrapper';

let r;
let requestStub;
beforeEach(() => {
  r = new Register();
  mockFunction(r, 'setState');
  requestStub = mockFunction(request, 'request', () => { return Promise.resolve({ status: 200 }) });
});

afterEach(() => {
  restoreAllMocks();
});

describe('Register', () => {
  describe('handleChange', () => {
    it('sets the state to the entered value', () => {
      r.handleChange({ target: { name: 'name', value: 'value' }});
      expect(r.setState).toBeCalledOnce;
      expect(r.setState).toBeCalledWith({ name: 'value'})
    })
  })
  describe('validateForm', () => {
    it('validates that a form is filled in', () => {
      const state = {
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


      r.state = state;

      expect(r.validateForm()).toEqual(false);
      expect(r.setState).toBeCalledOnce;
      expect(r.setState).toBeCalledWith({ error: 'First Name field is required'});
    });

  it('validates that a form is filled in completely', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '1943',
        error: ''
    };


    r.state = state;

    expect(r.validateForm()).toEqual(true);
    expect(r.setState).toNotHaveBeenCalled;
  });

  it('validates that the password form matches', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'huntertwo',
        month: 'January',
        day: '20',
        year: '1943',
        error: ''
    };

    r.state = state;

    expect(r.validateForm()).toEqual(false);
    expect(r.setState).toHaveBeenCalled;
    expect(r.setState).toHaveBeenCalledWith({ error: 'Passwords don\'t match'});
  });

  it('validates that the email form is rational', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.auatbingo.com!!!!BINGO!!!!husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '1943',
        error: ''
    };

    r.state = state;

    expect(r.validateForm()).toEqual(false);
    expect(r.setState).toHaveBeenCalled;
    expect(r.setState).toHaveBeenCalledWith({ error: 'Email is not valid.'});
  });

  it('validates that the date form is stricly numeric', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: 'ha',
        year: 'nineteenfourtythree',
        error: ''
    };

    r.state = state;

    expect(r.validateForm()).toEqual(false);
    expect(r.setState).toHaveBeenCalledOnce;
    expect(r.setState).toHaveBeenCalledWith({ error: 'DD-YYYY contains alphabetic characters.'});
  });

  it('validates that the date form has proper character count', () => {
    const state = {
        firstName: 'Austin',
        lastName: 'McKenna',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2',
        passwordConfirm: 'hunter2',
        month: 'January',
        day: '20',
        year: '20177',
        error: ''
    };

    r.state = state;

    expect(r.validateForm()).toEqual(false);
    expect(r.setState).toHaveBeenCalled;
    expect(r.setState).toHaveBeenCalledWith({ error: 'DD-YYYY has an invalid number of characters.'})
    });
  });

  describe('handleSubmit', () => {
    it('does nothing if forms arent valdidated', () => {
      r.handleSubmit({ preventDefault: () => {}});
      expect(requestStub).toNotHaveBeenCalled;
    });
    it('sends a request if the forms are validated with form data', () => {
      const state = {
          firstName: 'Austin',
          lastName: 'McKenna',
          email: 'mckenna.au@husky.neu.edu',
          password: 'hunter2',
          passwordConfirm: 'hunter2',
          month: 'January',
          day: '20',
          year: '1943',
          error: ''
      };

      r.state = state;
      const registrationForm = {
        name: 'Austin McKenna',
        dob: '1943-01-20',
        email: 'mckenna.au@husky.neu.edu',
        password: 'hunter2'
      };

      r.handleSubmit({ preventDefault: jest.fn() });
      expect(requestStub).toBeCalled;
      expect(requestStub).toBeCalledWith('/user', 'POST', registrationForm);
    });
    it('sets the state to an error if the response code is not 200', () => {
      requestStub = mockFunction(request, 'request', () => { return Promise.resolve({ status: 204, body: 'error' }) });
      mockFunction(r, 'validateForm', () => true);
      r.handleSubmit({ preventDefault: jest.fn() });
      expect(r.setState).toHaveBeenCalled;
    });
    it('catches errors', () => {
      requestStub = mockFunction(request, 'request', () => { return Promise.reject({ error: 'error'}) });
      r.handleSubmit({ preventDefault: jest.fn() });
      expect(r.setState).toHaveBeenCalled;
    });
  });

  it('matches a Register snapshot', () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('doesnt actually make a request', () => {
    r.handleSubmit({ preventDefault: () => {}});
  });

});
