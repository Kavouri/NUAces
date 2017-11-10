import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { UnwrappedLogin, mapDispatchToProps } from '../../containers/Login';
import { mockFunction, restoreAllMocks } from '../../lib/testingUtils';
import { successfulLogin } from '../../redux/actions/actions';
import * as request from '../../lib/requestWrapper';

let instance;
let mockState;
let requestStub;
beforeEach(() => {
  instance = new UnwrappedLogin({ successfulLogin: jest.fn()});
  mockFunction(instance, 'setState');
  requestStub = mockFunction(request, 'request', () => {
    return Promise.resolve({ status: 200 });
  });
  mockState = { email: 'bob@husky.neu.edu', password: 'password' };
  instance.state = mockState;
});

describe('Login', () => {
    describe('handleEmail', () => {
      it('sets the state accordingly', () => {
        instance.handleEmail({ target: { value: 'carroll.t' }});
        expect(instance.setState).toHaveBeenCalled;
        expect(instance.setState).toHaveBeenCalledWith({ email: 'carroll.t'});
      });
    });
    describe('handlePassword', () => {
      it('sets the state accordingly', () => {
        instance.handlePassword({ target: { value: 'password'}});
        expect(instance.setState).toHaveBeenCalled;
        expect(instance.setState).toHaveBeenCalledWith({ password: 'password'});
      });
    });
    describe('validateForm', () => {
      it('returns true with a validated form', () => {
        expect(instance.validateForm()).toEqual(true);
        expect(instance.setState).toNotHaveBeenCalled;
      });
      it('sets error for missing email', () => {
        instance.state.email = '';
        expect(instance.validateForm()).toEqual(false);
        expect(instance.setState).toHaveBeenCalled;
        expect(instance.setState).toHaveBeenCalledWith({ error: 'Please enter your email' });
      });
      it('sets error for invalid email', () => {
        instance.state.email = 'carroll.t';
        expect(instance.validateForm()).toEqual(false);
        expect(instance.setState).toHaveBeenCalled;
        expect(instance.setState).toHaveBeenCalledWith({ error: 'Email is not valid' });
      });
      it('sets error for missing password', () => {
        instance.state.password = '';
        expect(instance.validateForm()).toEqual(false);
        expect(instance.setState).toHaveBeenCalled;
        expect(instance.setState).toHaveBeenCalledWith({ error: 'Please enter your password' });
      });
    });
    describe('handleSubmit', () => {
      beforeEach(() => {
        mockFunction(instance, 'validateForm', () => {
          return true;
        });
      });
      it('does nothing if the form is not validated', () => {
        mockFunction(instance, 'validateForm', () => {
            return false;
          });
          instance.handleSubmit({ preventDefault: jest.fn() });
          expect(requestStub).toNotHaveBeenCalled;
      });
      it('sends the login request otherwise', () => {
        instance.handleSubmit({ preventDefault: jest.fn() });
        expect(requestStub).toHaveBeenCalled;
        expect(requestStub).toHaveBeenCalledWith('/login', 'POST', { email: 'bob@husky.neu.edu', password: 'password' });
        expect(instance.props.successfulLogin).toHaveBeenCalled;
      });
    });
    describe('matchDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const trigger = mapDispatchToProps(mockDispatch).successfulLogin({ name: 'Tighe' });
      expect(mockDispatch).toHaveBeenCalled;
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'SUCCESSFUL_LOGIN', user: { name: 'Tighe' }});
    });
    it('matches a snapshot if no activity has occurred', () => {
        const tree = renderer.create(<MemoryRouter><UnwrappedLogin /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('matches a snapshot if an empty form was submitted', () => {
        const tree = renderer.create(<MemoryRouter><UnwrappedLogin /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
